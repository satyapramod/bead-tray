// Everything the app says goes through App.speech.say(text).
// It plays Linda's recorded clip for that line when there is one
// (audio/voice/*.m4a, listed in js/data/voice-clips.js), and otherwise
// falls back to the browser's own text-to-speech voice.
(function (App) {
  const synth = 'speechSynthesis' in window ? window.speechSynthesis : null;

  // ---------- Recorded clips ----------

  const audio = new Audio();
  audio.preload = 'auto';
  const blobUrls = new Map();

  function clipPath(text) {
    const id = App.voiceClips && App.voiceClips[text.trim()];
    return id ? `audio/voice/${id}.m4a` : null;
  }

  // A line with a clip plays as one piece; otherwise try it sentence by sentence
  // ("This is two. Let's find four." is recorded as two clips).
  function clipPieces(text) {
    if (!useRecorded()) return null;
    if (clipPath(text)) return [text];
    const parts = (text.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim());
    return parts.length > 1 && parts.every(clipPath) ? parts : null;
  }

  // Load clips as blobs (through the offline cache). Media range requests don't
  // mix well with service-worker caches, blobs do. On file:// fetch fails, so use the path.
  function clipUrl(path) {
    if (!blobUrls.has(path)) {
      const p = fetch(path)
        .then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); })
        .then((b) => URL.createObjectURL(b))
        .catch(() => path);
      blobUrls.set(path, p);
    }
    return blobUrls.get(path);
  }

  // iOS only lets audio play after a touch. Playing silence on the first touch
  // unlocks this element for the rest of the visit.
  const SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  function unlock() {
    if (!audio.src) { audio.src = SILENT; audio.play().catch(() => {}); }
    window.removeEventListener('pointerdown', unlock, true);
  }
  window.addEventListener('pointerdown', unlock, true);

  let playing = 0; // bumps on every new line so older ones stop quietly

  function playClip(path, token) {
    return clipUrl(path).then((url) => new Promise((resolve, reject) => {
      if (token !== playing) return resolve();
      const done = () => { cleanup(); resolve(); };
      const fail = () => { cleanup(); reject(new Error('clip failed')); };
      const cleanup = () => {
        audio.removeEventListener('ended', done);
        audio.removeEventListener('pause', done);
        audio.removeEventListener('error', fail);
      };
      audio.addEventListener('ended', done);
      audio.addEventListener('pause', done);
      audio.addEventListener('error', fail);
      audio.src = url;
      audio.play().catch(fail);
    }));
  }

  // ---------- Browser voice (fallback) ----------

  // Clear, gentle voices found on common systems, best first. "Natural",
  // "Premium" and "Enhanced" voices sound far more human when a device has them.
  const PREFERRED = [
    /natural/i, /premium/i, /enhanced/i,
    /^Samantha/, /^Google US English/, /^Microsoft Aria/, /^Microsoft Jenny/,
    /^Karen/, /^Moira/, /^Tessa/, /^Google UK English Female/, /^Serena/, /^Daniel/,
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
    for (const re of PREFERRED) {
      v = voices.find((x) => re.test(x.name));
      if (v) return v;
    }
    return voices.find((x) => x.default) || voices[0] || null;
  }

  function synthSay(text) {
    if (!synth) return Promise.resolve();
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
      // Some browsers never fire `end`.
      const timer = setTimeout(finish, 1500 + (text.length * 110) / u.rate);
      u.onend = finish;
      u.onerror = finish;
      synth.speak(u);
    });
  }

  // ---------- Public ----------

  const useRecorded = () => App.settings.get().recordedVoice !== false;

  // Speak text. Resolves when finished. By default interrupts anything playing.
  async function say(text, { interrupt = true } = {}) {
    if (interrupt) stop();
    const token = ++playing;
    const pieces = clipPieces(text);
    if (pieces) {
      try {
        for (const p of pieces) {
          if (token !== playing) return;
          await playClip(clipPath(p), token);
        }
        return;
      } catch (e) {
        if (token !== playing) return;
        // Fall through to the browser voice.
      }
    }
    await synthSay(text);
  }

  function stop() {
    playing++;
    if (!audio.paused) audio.pause();
    if (synth) synth.cancel();
  }

  // Warm up the counting words so the first taps answer instantly.
  function preload() {
    ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
      .map(clipPath).filter(Boolean).forEach(clipUrl);
  }

  App.speech = {
    say,
    stop,
    preload,
    supported: !!synth || !!App.voiceClips,
    voices: () => voices,
    currentVoice,
    onVoices: (fn) => listeners.push(fn),
  };
})(window.App = window.App || {});
