// Find the number: "Find four." — choose the tray that holds that many.
// A wrong choice isn't marked wrong; the app simply counts that tray aloud,
// so the beads themselves show the difference (Montessori control of error).
(function (App) {
  const { W, h, rand, shuffle, tray, autoCount, numcard, topbar, dots, nextButton, finish } = App.ui;
  const ROUNDS = 5;

  App.screens.find = function (root, ctx) {
    const progress = dots(ROUNDS);
    const main = h('main', { class: 'stage' });
    root.append(topbar('Find the number', progress.el), main);

    let round = 0;
    let last = 0;

    function play() {
      if (!ctx.alive()) return;
      progress.set(round);
      if (round === ROUNDS) {
        return finish(main, () => { round = 0; play(); });
      }

      let target;
      do { target = rand(1, 10); } while (target === last);
      last = target;
      const others = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((i) => i !== target)).slice(0, 2);
      const nums = shuffle([target, ...others]);

      const caption = h('div', { class: 'caption', 'aria-live': 'polite' });
      const choices = h('div', { class: 'choices' });
      const nextSlot = h('div', { class: 'nextslot' });
      let busy = false;

      nums.forEach((k) => {
        const t = tray(k, 'span');
        t.el.setAttribute('role', 'button');
        t.el.setAttribute('tabindex', '0');
        t.el.setAttribute('aria-label', 'a tray of beads');

        const pick = async () => {
          if (busy) return;
          busy = true;
          const ok = await autoCount(t.beads, caption, ctx.alive);
          if (!ok) return;
          if (k === target) {
            t.el.classList.add('right');
            await App.speech.say(`Yes. This is ${W[k]}.`);
            if (!ctx.alive()) return;
            round++;
            progress.set(round);
            nextSlot.replaceChildren(nextButton(play));
          } else {
            t.el.classList.add('tried');
            await App.speech.say(`This is ${W[k]}. Let's find ${W[target]}.`);
            caption.textContent = '';
            busy = false;
          }
        };
        t.el.onclick = pick;
        t.el.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); }
        };
        choices.append(t.el);
      });

      main.replaceChildren(numcard(target), caption, choices, nextSlot);
      App.speech.say(`Find ${W[target]}.`);
    }

    play();
  };
})(window.App);
