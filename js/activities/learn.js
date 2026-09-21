// Learn numbers 1–10: touch each bead and count it aloud, then meet the
// numeral and its word ("3 · three"). Quantity first, then the name.
(function (App) {
  const { W, h, icon, wait, bead, tapToCount, numcard, topbar } = App.ui;

  App.screens.learn = function (root, ctx) {
    const learned = new Set(App.store.get('learned', []));

    const slot = h('div', { class: 'numslot' });
    const caption = h('div', { class: 'caption', 'aria-live': 'polite' });
    const mat = h('div', { class: 'mat' });
    const prev = h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Previous number', html: icon.left });
    const again = h('button', { class: 'iconbtn', type: 'button', 'aria-label': 'Count again', html: icon.replay });
    const next = h('button', { class: 'next', type: 'button', 'aria-label': 'Next number', html: icon.right });

    const line = h('nav', { class: 'numberline', 'aria-label': 'Choose a number' });
    const lineBtns = [];
    for (let i = 1; i <= 10; i++) {
      const b = h('button', { type: 'button', 'aria-label': W[i] }, String(i));
      b.onclick = () => show(i);
      lineBtns[i] = b;
      line.append(b);
    }

    root.append(
      topbar('Learn numbers · one to ten'),
      h('main', { class: 'stage' }, slot, caption, mat, h('div', { class: 'controls' }, prev, again, next)),
      line
    );

    let n = App.store.get('learnAt', 1);
    if (!(n >= 1 && n <= 10)) n = 1;
    let showId = 0;

    prev.onclick = () => show(n > 1 ? n - 1 : 10);
    next.onclick = () => show(n < 10 ? n + 1 : 1);
    again.onclick = () => show(n);

    async function show(k) {
      const id = ++showId;
      const alive = () => ctx.alive() && id === showId;
      n = k;
      App.store.set('learnAt', n);

      lineBtns.forEach((b, i) => {
        b.classList.toggle('current', i === n);
        b.classList.toggle('learned', learned.has(i));
      });
      next.classList.remove('invite');
      slot.replaceChildren(h('div', { class: 'numcard placeholder', 'aria-hidden': 'true' }));
      caption.textContent = '';

      const beads = [];
      for (let i = 0; i < n; i++) beads.push(bead());
      mat.replaceChildren(...beads);

      App.speech.say(n === 1 ? 'Touch the bead and count.' : 'Touch each bead and count.');
      await tapToCount(beads, caption, alive);
      if (!alive()) return;
      await wait(700);
      if (!alive()) return;

      // Reveal: this many is called "n".
      const card = numcard(n);
      card.classList.add('reveal');
      slot.replaceChildren(card);
      caption.textContent = '';
      await App.speech.say(`${W[n]}. This is ${W[n]}.`);

      learned.add(n);
      App.store.set('learned', [...learned]);
      lineBtns[n].classList.add('learned');
      if (alive()) next.classList.add('invite');
    }

    show(n);
  };
})(window.App);
