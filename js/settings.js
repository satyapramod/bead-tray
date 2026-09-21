// Settings and small persistent state. localStorage can be unavailable
// (private mode, blocked storage), so every access is guarded.
(function (App) {
  const KEY = 'beadtray.settings.v1';
  const defaults = { recordedVoice: true, voiceURI: '', rate: 0.8, reduceMotion: false };
  const s = Object.assign({}, defaults);

  try {
    Object.assign(s, JSON.parse(localStorage.getItem(KEY) || '{}'));
  } catch (e) { /* use defaults */ }

  App.settings = {
    get: () => s,
    set(patch) {
      Object.assign(s, patch);
      try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
      if (App.applySettings) App.applySettings();
    },
  };

  App.store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem('beadtray.' + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem('beadtray.' + key, JSON.stringify(value)); } catch (e) { /* ignore */ }
    },
    remove(key) {
      try { localStorage.removeItem('beadtray.' + key); } catch (e) { /* ignore */ }
    },
  };
})(window.App = window.App || {});
