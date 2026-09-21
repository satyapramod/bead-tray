// Adding = putting together.
// 1. Count the first tray.  2. Count the second tray.
// 3. Move every bead into the bowl, counting them all.
// 4. Only then see it written: 3 + 2 = 5, "three and two make five".
(function (App) {
  const { W, h, rand, wait, tray, tapToCount, tapToMove, numlabel, equation, topbar, dots, nextButton, finish } = App.ui;
  const ROUNDS = 5;

  App.screens.add = function (root, ctx) {
    const progress = dots(ROUNDS);
    const main = h('main', { class: 'stage' });
    root.append(topbar('Adding · putting together', progress.el), main);

    let round = 0;

    function play() {
      if (!ctx.alive()) return;
      progress.set(round);
      if (round === ROUNDS) {
        return finish(main, () => { round = 0; play(); });
      }

      const a = rand(1, 5);
      const b = rand(1, 5);
      const sum = a + b;
      const alive = ctx.alive;

      const A = tray(a);
      const B = tray(b);
      const labelA = h('div', { class: 'label' });
      const labelB = h('div', { class: 'label' });
      const bowl = h('div', { class: 'bowl', style: { '--cols': 5 }, 'aria-label': 'bowl' });
      const caption = h('div', { class: 'caption', 'aria-live': 'polite' });
      const eq = h('div', { class: 'eqslot' });
      const nextSlot = h('div', { class: 'nextslot' });

      main.replaceChildren(
        caption,
        h('div', { class: 'row' },
          h('div', { class: 'col' }, A.el, labelA),
          h('div', { class: 'op' }, '+'),
          h('div', { class: 'col' }, B.el, labelB)),
        bowl,
        eq,
        nextSlot
      );

      (async () => {
        A.el.classList.add('active');
        App.speech.say(a === 1 ? 'Count this bead.' : 'Count these beads.');
        await tapToCount(A.beads, caption, alive);
        if (!alive()) return;
        A.el.classList.remove('active');
        await wait(500);
        caption.textContent = '';
        labelA.replaceChildren(numlabel(a));
        await App.speech.say(W[a]);
        if (!alive()) return;

        B.el.classList.add('active');
        App.speech.say(b === 1 ? 'Now count this bead.' : 'Now count these beads.');
        await tapToCount(B.beads, caption, alive);
        if (!alive()) return;
        B.el.classList.remove('active');
        await wait(500);
        caption.textContent = '';
        labelB.replaceChildren(numlabel(b));
        await App.speech.say(W[b]);
        if (!alive()) return;

        bowl.classList.add('active');
        App.speech.say('Put them all in the bowl, and count them all.');
        await tapToMove([...A.beads, ...B.beads], bowl, caption, alive);
        if (!alive()) return;
        bowl.classList.remove('active');
        await wait(700);
        if (!alive()) return;

        caption.textContent = '';
        const words = `${W[a]} and ${W[b]} make ${W[sum]}`;
        eq.replaceChildren(...equation([a, '+', b, '=', sum], words));
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
