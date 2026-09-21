// Router, home screen and the parent corner.
(function (App) {
  const { h, icon, bead, topbar } = App.ui;

  App.applySettings = function () {
    document.documentElement.classList.toggle('reduce-motion', !!App.settings.get().reduceMotion);
  };

  // ---------- Home ----------

  function beads(n) {
    const out = [];
    for (let i = 0; i < n; i++) out.push(bead('span'));
    return h('span', { class: 'beads' }, out);
  }

  const ACTIVITIES = [
    { id: 'learn', name: 'Counting', art: () => [beads(3), h('span', {}, '3')] },
    { id: 'find', name: 'Find the number', art: () => [h('span', {}, '2'), beads(2)] },
    { id: 'add', name: 'Adding', art: () => [beads(2), h('span', { class: 'op' }, '+'), beads(1)] },
    { id: 'take', name: 'Taking away', art: () => [beads(3), h('span', { class: 'op' }, '−'), beads(1)] },
  ];

  function home(root) {
    root.append(
      h('header', { class: 'home-head' }, h('h1', {}, 'Bead Tray'), parentGate()),
      h('main', { class: 'cards' }, ACTIVITIES.map((a) =>
        h('button', {
          class: 'card', type: 'button', 'aria-label': a.name,
          onclick: () => { location.hash = '#' + a.id; },
        }, h('span', { class: 'art', 'aria-hidden': 'true' }, a.art()), h('span', { class: 'name' }, a.name))))
    );
  }

  // Press and hold for two seconds — easy for a parent, unlikely for a four-year-old.
  function parentGate() {
    const gate = h('button', {
      class: 'gate', type: 'button', 'aria-label': 'Parent corner: press and hold',
      html: icon.gear + '<svg class="ring" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21"/></svg>',
    });
    let timer = null;
    const cancel = () => { clearTimeout(timer); gate.classList.remove('holding'); };
    gate.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      gate.classList.add('holding');
      timer = setTimeout(() => { cancel(); location.hash = '#parent'; }, 2000);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => gate.addEventListener(ev, cancel));
    gate.addEventListener('contextmenu', (e) => e.preventDefault());
    return gate;
  }

  // ---------- Parent corner ----------

  function parent(root, ctx) {
    const s = App.settings.get();

    const voiceSelect = h('select', { id: 'voice' });
    function fillVoices() {
      if (!ctx.alive()) return;
      const current = App.speech.currentVoice();
      const list = App.speech.voices();
      voiceSelect.replaceChildren(
        list.length ? null : h('option', { value: '' }, 'Default voice'),
        list.map((v) => h('option', { value: v.voiceURI, selected: current && v.voiceURI === current.voiceURI }, `${v.name} (${v.lang})`))
      );
    }
    fillVoices();
    App.speech.onVoices(fillVoices);
    voiceSelect.onchange = () => {
      App.settings.set({ voiceURI: voiceSelect.value });
      App.speech.say('One, two, three.');
    };

    const rateOut = h('span', {}, s.rate.toFixed(2));
    const rate = h('input', { id: 'rate', type: 'range', min: '0.6', max: '1.1', step: '0.05', value: String(s.rate) });
    rate.oninput = () => { rateOut.textContent = Number(rate.value).toFixed(2); };
    rate.onchange = () => {
      App.settings.set({ rate: Number(rate.value) });
      App.speech.say('One, two, three.');
    };

    const motion = h('input', { id: 'motion', type: 'checkbox', checked: s.reduceMotion });
    motion.onchange = () => App.settings.set({ reduceMotion: motion.checked });

    const learned = App.store.get('learned', []);
    const learnedText = h('p', {}, learned.length
      ? `Numbers counted in "Counting": ${learned.sort((a, b) => a - b).join(', ')}.`
      : 'No numbers counted yet.');

    root.append(
      topbar('Parent corner'),
      h('main', { class: 'parent' },
        App.speech.supported ? null : h('p', {}, 'This browser cannot speak. Try Chrome, Safari or Edge.'),
        h('div', { class: 'field' }, h('label', { for: 'voice' }, 'Voice'), voiceSelect),
        h('div', { class: 'field' }, h('label', { for: 'rate' }, 'Speaking speed: ', rateOut), rate),
        h('label', { class: 'check' }, motion, 'Reduce motion'),
        h('button', { class: 'btn', type: 'button', onclick: () => App.speech.say('One, two, three, four, five.') }, 'Test the voice'),

        h('h2', {}, 'Progress'),
        learnedText,
        h('button', {
          class: 'btn', type: 'button',
          onclick: () => {
            App.store.remove('learned');
            App.store.remove('learnAt');
            learnedText.textContent = 'No numbers counted yet.';
          },
        }, 'Reset progress'),

        h('h2', {}, 'How to use it'),
        h('ul', {},
          h('li', {}, 'Start with Counting. Sit beside her and count out loud together; she touches each bead once.'),
          h('li', {}, 'Move to Find the number once she knows most numbers from one to ten.'),
          h('li', {}, 'Then Adding (putting together) and Taking away. Each session is five short turns.'),
          h('li', {}, 'Nothing is ever marked wrong. When she picks the wrong tray, the app counts it aloud so she can see the difference herself.'),
          h('li', {}, 'Keep sessions short and stop while it is still fun. Real beads, buttons or pebbles on the table are the best follow-up.')),
        h('p', { class: 'note' }, 'Everything stays on this device. No accounts, no ads, no tracking.'))
    );
  }

  // ---------- Router ----------

  const routes = {
    '': home,
    learn: App.screens.learn,
    find: App.screens.find,
    add: App.screens.add,
    take: App.screens.take,
    parent,
  };

  let token = 0;
  function route() {
    const name = location.hash.replace(/^#\/?/, '');
    const render = routes[name] || home;
    const mine = ++token;
    App.speech.stop();
    const root = document.getElementById('app');
    root.replaceChildren();
    root.className = 'screen-' + (name || 'home');
    render(root, { alive: () => mine === token });
    window.scrollTo(0, 0);
  }

  App.applySettings();
  window.addEventListener('hashchange', route);
  route();

  // Offline support when served over http(s) (not when opened as a file).
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

})(window.App);
