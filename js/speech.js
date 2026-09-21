// Browser text-to-speech (Web Speech API). Every prompt in the app is spoken,
// so the child never needs to read.
(function (App) {
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;

  // Clear, gentle voices found on common systems, in order of preference.
  const PREFERRED = [
    'Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny',
    'Karen', 'Moira', 'Tessa', 'Google UK English Female', 'Serena', 'Daniel',
  ];

  let voices = [];
  const listeners = [];

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices().filter((v) => /^en/i.test(v.lang));
    listeners.forEach((fn) => fn(voices));
  }

  if (synth) {
    loadVoices();
    synth.onvoiceschanged = loadVoices;
  }

  function currentVoice() {
    const uri = App.settings.get().voiceURI;
    let v = uri && voices.find((x) => x.voiceURI === uri);
    if (v) return v;
    for (const name of PREFERRED) {
      v = voices.find((x) => x.name.startsWith(name));
      if (v) return v;
    }
    return voices.find((x) => x.default) || voices[0] || null;
  }

  // Speak text. Resolves when finished (or after a safety timeout, since
  // some browsers never fire `end`). By default interrupts anything playing.
  function say(text, { interrupt = true } = {}) {
    if (!synth) return Promise.resolve();
    if (interrupt) synth.cancel();
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(text);
      const v = currentVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'en-US'; }
      u.rate = App.settings.get().rate;
      u.pitch = 1.05;

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve();
      };
      const timer = setTimeout(finish, 1500 + (text.length * 110) / u.rate);
      u.onend = finish;
      u.onerror = finish;
      synth.speak(u);
    });
  }

  function stop() {
    if (synth) synth.cancel();
  }

  App.speech = {
    say,
    stop,
    supported: !!synth,
    voices: () => voices,
    currentVoice,
    onVoices: (fn) => listeners.push(fn),
  };
})(window.App = window.App || {});
