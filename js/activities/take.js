// Taking away.
// 1. Count all the beads.  2. "Take away two" — move two onto the plate.
// 3. Count what is left.   4. See it written: 5 − 2 = 3, "five take away two leaves three".
(function (App) {
  const { W, h, rand, wait, tray, clearCount, tapToCount, tapToMove, numlabel, equation, topbar, dots, nextButton, finish } = App.ui;
  const ROUNDS = 5;

  App.screens.take = function (root, ctx) {
    const progress = dots(ROUNDS);
    const main = h('main', { class: 'stage' });
    root.append(topbar('Taking away', progress.el), main);

    let round = 0;

    function play() {
      if (!ctx.alive()) return;
      progress.set(round);
      if (round === ROUNDS) {
        return finish(main, () => { round = 0; play(); });
      }

      const n = rand(2, 10);
      const k = rand(1, Math.min(n - 1, 5));
      const left = n - k;
      const alive = ctx.alive;

      const T = tray(n);
      const trayLabel = h('div', { class: 'label' });
      const plate = h('div', { class: 'plate', style: { '--cols': 5 }, 'aria-label': 'plate' });
      const plateLabel = h('div', { class: 'label' });
      const caption = h('div', { class: 'caption', 'aria-live': 'polite' });
      const eq = h('div', { class: 'eqslot' });
      const nextSlot = h('div', { class: 'nextslot' });

      main.replaceChildren(
        caption,
        h('div', { class: 'row' },
          h('div', { class: 'col' }, T.el, trayLabel),
          h('div', { class: 'col' }, plate, plateLabel)),
        eq,
        nextSlot
      );

      (async () => {
        // 1. How many are there?
        T.el.classList.add('active');
        App.speech.say('Count the beads.');
        await tapToCount(T.beads, caption, alive);
        if (!alive()) return;
        await wait(500);
        caption.textContent = '';
        trayLabel.replaceChildren(numlabel(n));
        await App.speech.say(W[n]);
        if (!alive()) return;

        // 2. Take some away.
        T.beads.forEach(clearCount);
        T.el.classList.remove('active');
        plate.classList.add('active');
        plateLabel.replaceChildren(numlabel(k, `take away ${W[k]}`));
        App.speech.say(`Take away ${W[k]}. Put ${k === 1 ? 'it' : 'them'} on the plate.`);
        await tapToMove(T.beads, plate, caption, alive, k);
        if (!alive()) return;
        plate.classList.remove('active');
        await wait(700);
        if (!alive()) return;

        // 3. Count what is left.
        caption.textContent = '';
        const remaining = T.beads.filter((b) => b.parentNode === T.el);
        T.el.classList.add('active');
        App.speech.say(left === 1 ? 'How many are left? Count it.' : 'How many are left? Count them.');
        await tapToCount(remaining, caption, alive);
        if (!alive()) return;
        T.el.classList.remove('active');
        await wait(700);
        if (!alive()) return;

        // 4. Write it down.
        caption.textContent = '';
        const words = `${W[n]} take away ${W[k]} leaves ${W[left]}`;
        eq.replaceChildren(...equation([n, '−', k, '=', left], words));
        await App.speech.say(words + '.');
        if (!alive()) return;
        round++;
        progress.set(round);
        nextSlot.replaceChildren(nextButton(play));
      })();
    }

    play();
  };
})(window.App);
