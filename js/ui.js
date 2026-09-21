// Shared building blocks: DOM helper, beads, trays, counting interactions.
(function (App) {
  const W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

  const icon = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg>',
    replay: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5"/></svg>',
    speaker: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>',
    gear: '<svg class="gear" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  };

  function h(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'style') for (const [p, val] of Object.entries(v)) e.style.setProperty(p, val);
        else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : v);
      }
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      e.append(kid.nodeType ? kid : document.createTextNode(kid));
    }
    return e;
  }

  const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function reducedMotion() {
    return App.settings.get().reduceMotion ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ---------- Beads ----------

  // Interactive beads are buttons; decorative ones (inside a tappable tray) are spans.
  function bead(tag = 'button') {
    const b = h(tag, { class: 'bead' }, h('span', { class: 'bead-num' }));
    if (tag === 'button') { b.type = 'button'; b.setAttribute('aria-label', 'bead'); }
    return b;
  }

  function markCounted(b, n) {
    b.classList.add('counted');
    b.querySelector('.bead-num').textContent = n;
    b.classList.remove('pop');
    void b.offsetWidth; // restart the animation
    b.classList.add('pop');
  }

  function clearCount(b) {
    b.classList.remove('counted', 'pop');
    b.querySelector('.bead-num').textContent = '';
  }

  // A wooden tray holding n beads, up to five per row (so quantities are easy to see).
  function tray(n, tag) {
    const beads = [];
    for (let i = 0; i < n; i++) beads.push(bead(tag));
    const el = h('div', { class: 'tray', style: { '--cols': Math.min(Math.max(n, 1), 5) } }, beads);
    return { el, beads };
  }

  // Move a bead into another container with a gentle glide, leaving a faint
  // outline where it was so the child can see something was taken.
  function move(b, dest) {
    const first = b.getBoundingClientRect();
    b.replaceWith(h('span', { class: 'bead ghost', 'aria-hidden': 'true' }));
    dest.append(b);
    if (reducedMotion() || !b.animate) return Promise.resolve();
    const last = b.getBoundingClientRect();
    const anim = b.animate(
      [{ transform: `translate(${first.left - last.left}px, ${first.top - last.top}px)` }, { transform: 'none' }],
      { duration: 480, easing: 'cubic-bezier(.25,.8,.3,1)' }
    );
    return anim.finished.catch(() => {});
  }

  function sayCount(n, caption) {
    if (caption) caption.textContent = W[n];
    App.speech.say(W[n]);
  }

  // The child touches each bead once; each touch says the next number and
  // shows its word. Resolves when every bead has been counted.
  function tapToCount(beads, caption, alive) {
    return new Promise((resolve) => {
      let n = 0;
      beads.forEach((b) => {
        clearCount(b);
        b.classList.add('tap');
        b.onclick = () => {
          if (!alive() || b.classList.contains('counted')) return;
          n++;
          b.classList.remove('tap');
          markCounted(b, n);
          sayCount(n, caption);
          if (n === beads.length) {
            beads.forEach((x) => { x.onclick = null; });
            resolve();
          }
        };
      });
    });
  }

  // Each touch moves a bead into `dest` and counts it. Resolves after `limit` beads.
  function tapToMove(beads, dest, caption, alive, limit = beads.length) {
    return new Promise((resolve) => {
      let n = 0;
      beads.forEach((b) => {
        clearCount(b);
        b.classList.add('tap');
        b.onclick = () => {
          if (!alive() || n >= limit) return;
          n++;
          b.onclick = null;
          b.classList.remove('tap');
          clearCount(b);
          move(b, dest);
          markCounted(b, n);
          sayCount(n, caption);
          if (n === limit) {
            beads.forEach((x) => { x.onclick = null; x.classList.remove('tap'); });
            resolve();
          }
        };
      });
    });
  }

  // The app counts the beads aloud itself (used to show a group's size).
  async function autoCount(beads, caption, alive) {
    beads.forEach(clearCount);
    for (let i = 0; i < beads.length; i++) {
      if (!alive()) return false;
      markCounted(beads[i], i + 1);
      caption.textContent = W[i + 1];
      await Promise.all([App.speech.say(W[i + 1]), wait(550)]);
    }
    return alive();
  }

  // ---------- Pieces ----------

  function numcard(n) {
    return h('button', {
      class: 'numcard',
      type: 'button',
      'aria-label': `${n}, ${W[n]}. Hear it again.`,
      onclick: () => App.speech.say(W[n]),
    }, h('div', { class: 'numeral' }, String(n)), h('div', { class: 'word' }, W[n]));
  }

  function numlabel(n, word = W[n]) {
    return h('div', { class: 'reveal' }, h('div', { class: 'n' }, String(n)), h('div', { class: 'w' }, word));
  }

  function equation(parts, words) {
    return [
      h('div', { class: 'equation reveal' },
        parts.map((p) => h('span', { class: typeof p === 'number' ? 'n' : 'op' }, String(p)))),
      h('div', { class: 'eqwords reveal' }, words),
    ];
  }

  function topbar(title, right) {
    return h('header', { class: 'topbar' },
      h('button', {
        class: 'iconbtn', type: 'button', 'aria-label': 'Home', html: icon.home,
        onclick: () => { location.hash = ''; },
      }),
      h('div', { class: 'title' }, title),
      right || null);
  }

  function dots(total) {
    const items = [];
    for (let i = 0; i < total; i++) items.push(h('span', { class: 'dot' }));
    return {
      el: h('div', { class: 'dots', 'aria-hidden': 'true' }, items),
      set(done) { items.forEach((d, i) => d.classList.toggle('on', i < done)); },
    };
  }

  function nextButton(onClick, label = 'Next') {
    return h('button', {
      class: 'next invite', type: 'button', 'aria-label': label, html: icon.right,
      onclick: onClick,
    });
  }

  // Calm end-of-session screen. No scores, no stars.
  function finish(main, again) {
    const beads = [];
    for (let i = 0; i < 10; i++) beads.push(bead('span'));
    main.replaceChildren(h('div', { class: 'done reveal' },
      h('div', { class: 'bowl' }, beads),
      h('div', { class: 'caption' }, 'You did it'),
      h('div', { class: 'controls' },
        h('button', {
          class: 'iconbtn', type: 'button', 'aria-label': 'Home', html: icon.home,
          onclick: () => { location.hash = ''; },
        }),
        h('button', {
          class: 'next invite', type: 'button', 'aria-label': 'Again', html: icon.replay,
          onclick: again,
        }))));
    App.speech.say('You did it. Well done.');
  }

  App.screens = App.screens || {};
  App.ui = {
    W, icon, h, rand, wait, shuffle,
    bead, tray, move, markCounted, clearCount,
    tapToCount, tapToMove, autoCount,
    numcard, numlabel, equation, topbar, dots, nextButton, finish,
  };
})(window.App = window.App || {});
