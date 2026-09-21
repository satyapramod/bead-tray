// Lists every line the app speaks, so each can be recorded once.
// usage: node tools/voice-lines.js  -> writes tools/voice-lines.json
// Keep in sync with the App.speech.say(...) calls in js/.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['js/data/india-map.js', 'js/data/animals.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx);
}
const App = ctx.window.App;
const W = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

const lines = [];
const add = (text, group) => { if (!lines.some((l) => l.text === text)) lines.push({ text, group }); };

// Counting words (said on every bead touch) and the finish line.
for (let n = 1; n <= 10; n++) add(W[n], 'numbers');
add('You did it. Well done.', 'core');
add('One, two, three, four, five.', 'core');

// Learn
add('Touch the bead and count.', 'core');
add('Touch each bead and count.', 'core');
for (let n = 1; n <= 10; n++) add(`${W[n]}. This is ${W[n]}.`, 'learn');

// Find (a wrong pick plays "This is two." then "Let's find four.")
for (let n = 1; n <= 10; n++) {
  add(`Find ${W[n]}.`, 'find');
  add(`Yes. This is ${W[n]}.`, 'find');
  add(`This is ${W[n]}.`, 'find');
  add(`Let's find ${W[n]}.`, 'find');
}

// Add
['Count this bead.', 'Count these beads.', 'Now count this bead.', 'Now count these beads.',
  'Put them all in the bowl, and count them all.'].forEach((t) => add(t, 'core'));
for (let a = 1; a <= 5; a++) for (let b = 1; b <= 5; b++) add(`${W[a]} and ${W[b]} make ${W[a + b]}.`, 'add');

// Take away
['Count the beads.', 'How many are left? Count it.', 'How many are left? Count them.'].forEach((t) => add(t, 'core'));
for (let k = 1; k <= 5; k++) add(`Take away ${W[k]}. Put ${k === 1 ? 'it' : 'them'} on the plate.`, 'core');
for (let n = 2; n <= 10; n++) {
  for (let k = 1; k <= Math.min(n - 1, 5); k++) add(`${W[n]} take away ${W[k]} leaves ${W[n - k]}.`, 'take');
}

// Animals
for (const id of Object.keys(App.stateAnimals)) add(App.indiaMap.locations.find((l) => l.id === id).name, 'states');
for (const a of Object.values(App.animals)) add(`${a.name}. ${a.fact}`, 'animals');

// A stable file name per line.
const slug = (t) => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
for (const l of lines) {
  l.id = slug(l.text);
  // What the voice reads: sentence case, "&" spoken as "and".
  l.spoken = cap(l.text.replace(/&/g, 'and'));
}
const ids = new Set();
for (const l of lines) { if (ids.has(l.id)) throw new Error('duplicate id ' + l.id); ids.add(l.id); }

fs.writeFileSync(path.join(__dirname, 'voice-lines.json'), JSON.stringify(lines, null, 1));
const chars = lines.reduce((s, l) => s + l.spoken.length, 0);
const by = {};
lines.forEach((l) => { by[l.group] = (by[l.group] || 0) + 1; });
console.log(lines.length, 'lines,', chars, 'characters', by);
