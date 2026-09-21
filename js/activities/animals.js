// Animals of India: touch a state on the map to meet its best-known animals,
// most popular first. Or browse every animal, most widespread first.
(function (App) {
  const { h, icon } = App.ui;

  const stateName = (id) => App.indiaMap.locations.find((l) => l.id === id).name;

  // Which states each animal appears in (in map order).
  function statesFor(animalId) {
    return Object.keys(App.stateAnimals).filter((s) => App.stateAnimals[s].animals.includes(animalId));
  }

  function photo(id, cls = 'photo') {
    const a = App.animals[id];
    const img = h('img', { class: cls, src: a.photo, alt: a.name, loading: 'lazy', crossorigin: 'anonymous', draggable: 'false' });
    img.onerror = () => img.replaceWith(h('div', { class: cls + ' photo-missing', 'aria-label': a.name }, a.name[0]));
    return img;
  }

  function sayAnimal(id) {
    const a = App.animals[id];
    App.speech.say(`${a.name}. ${a.fact}`);
  }

  App.screens.animals = function (root, ctx) {
    let tab = App.store.get('animalsTab', 'map');
    let selected = App.store.get('animalsState', null);
    if (selected && !App.stateAnimals[selected]) selected = null;

    const tabMap = h('button', { type: 'button', class: 'tab' }, 'By state');
    const tabAll = h('button', { type: 'button', class: 'tab' }, 'All animals');
    const view = h('div', { class: 'animals-view' });
    const overlay = h('div', { class: 'overlay', hidden: true });

    root.append(
      App.ui.topbar('Animals of India'),
      h('div', { class: 'tabs', role: 'tablist' }, tabMap, tabAll),
      view,
      overlay
    );

    tabMap.onclick = () => show('map');
    tabAll.onclick = () => show('all');

    function show(t) {
      tab = t;
      App.store.set('animalsTab', t);
      tabMap.classList.toggle('on', t === 'map');
      tabAll.classList.toggle('on', t === 'all');
      tabMap.setAttribute('aria-selected', t === 'map');
      tabAll.setAttribute('aria-selected', t === 'all');
      view.replaceChildren(t === 'map' ? mapView() : allView());
    }

    // ---------- By state ----------

    function mapView() {
      const NS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', App.indiaMap.viewBox);
      svg.setAttribute('class', 'india');
      svg.setAttribute('role', 'group');
      svg.setAttribute('aria-label', 'Map of India');

      const paths = {};
      for (const loc of App.indiaMap.locations) {
        const p = document.createElementNS(NS, 'path');
        p.setAttribute('d', loc.path);
        const has = !!App.stateAnimals[loc.id];
        p.setAttribute('class', 'state' + (has ? '' : ' none'));
        if (has) {
          p.setAttribute('tabindex', '0');
          p.setAttribute('role', 'button');
          p.setAttribute('aria-label', stateName(loc.id));
          p.addEventListener('click', () => select(loc.id, true));
          p.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(loc.id, true); }
          });
        }
        paths[loc.id] = p;
        svg.append(p);
      }

      // Small states are hard to touch on the map, so they are also listed by name.
      const chips = h('div', { class: 'chips', 'aria-label': 'States' },
        Object.keys(App.stateAnimals)
          .sort((a, b) => stateName(a).localeCompare(stateName(b)))
          .map((id) => h('button', { type: 'button', class: 'chip', 'data-id': id, onclick: () => select(id, true) }, stateName(id))));

      const panel = h('section', { class: 'state-panel', 'aria-live': 'polite' });

      function select(id, spoken) {
        selected = id;
        App.store.set('animalsState', id);
        Object.entries(paths).forEach(([k, p]) => p.classList.toggle('on', k === id));
        chips.querySelectorAll('.chip').forEach((c) => c.classList.toggle('on', c.dataset.id === id));

        const s = App.stateAnimals[id];
        panel.replaceChildren(
          h('h2', { class: 'state-name' },
            stateName(id),
            h('button', {
              class: 'iconbtn small', type: 'button', 'aria-label': 'Say it', html: icon.speaker,
              onclick: () => App.speech.say(stateName(id)),
            })),
          h('ol', { class: 'animal-list' }, s.animals.map((aid) =>
            h('li', {},
              h('button', { type: 'button', class: 'animal-card', onclick: () => open(aid) },
                photo(aid),
                h('span', { class: 'animal-name' }, App.animals[aid].name),
                s.official.includes(aid) ? h('span', { class: 'badge' }, 'State animal') : null))))
        );
        if (spoken) {
          App.speech.say(stateName(id));
          // On a phone the list sits below the map; bring it into view.
          if (window.matchMedia('(max-width: 760px)').matches) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      if (selected) select(selected, false);
      else panel.append(h('p', { class: 'hint' }, 'Touch a state on the map.'));

      return h('div', { class: 'atlas' }, h('div', { class: 'map-wrap' }, svg), panel, chips);
    }

    // ---------- All animals ----------

    function allView() {
      // Most widespread first: the animals popular in the most states.
      const ids = Object.keys(App.animals)
        .map((id) => [id, statesFor(id).length])
        .sort((a, b) => b[1] - a[1] || App.animals[a[0]].name.localeCompare(App.animals[b[0]].name));

      return h('div', { class: 'animal-grid' }, ids.map(([id, n]) =>
        h('button', { type: 'button', class: 'animal-card', onclick: () => open(id) },
          photo(id),
          h('span', { class: 'animal-name' }, App.animals[id].name),
          h('span', { class: 'where' }, n === 1 ? stateName(statesFor(id)[0]) : `${n} states`))));
    }

    // ---------- One animal ----------

    function open(id) {
      const a = App.animals[id];
      const close = () => {
        overlay.hidden = true;
        overlay.replaceChildren();
        App.speech.stop();
        document.removeEventListener('keydown', onKey);
      };
      const onKey = (e) => { if (e.key === 'Escape') close(); };

      overlay.replaceChildren(h('div', { class: 'sheet reveal', role: 'dialog', 'aria-label': a.name },
        h('button', { class: 'iconbtn close', type: 'button', 'aria-label': 'Close', html: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>', onclick: close }),
        photo(id, 'photo big'),
        h('div', { class: 'sheet-body' },
          h('h2', {}, a.name,
            h('button', {
              class: 'iconbtn small', type: 'button', 'aria-label': 'Hear it again', html: icon.speaker,
              onclick: () => sayAnimal(id),
            })),
          h('p', { class: 'fact' }, a.fact),
          h('div', { class: 'found' },
            h('span', {}, 'Found in'),
            statesFor(id).map((s) => h('button', {
              type: 'button', class: 'chip',
              onclick: () => { close(); selected = s; show('map'); App.speech.say(stateName(s)); },
            }, stateName(s)))),
          h('a', { class: 'credit', href: a.wiki, target: '_blank', rel: 'noopener' }, 'Photo: Wikipedia'))));
      overlay.onclick = (e) => { if (e.target === overlay) close(); };
      overlay.hidden = false;
      document.addEventListener('keydown', onKey);
      sayAnimal(id);
    }

    show(tab);
  };

  App.animalPhoto = photo;
})(window.App);
