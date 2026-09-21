# Bead Tray

A calm, Montessori-style web app that teaches a young child counting (1–10),
adding and taking away with golden beads. It uses no frameworks, needs no build
step and works in any modern browser on a laptop or phone.

## Run it

- **Quickest:** double-click `index.html`.
- **With offline support / install to home screen:** serve the folder over http, e.g.
  `python3 -m http.server 8000`, then open http://localhost:8000.
  On a phone on the same Wi-Fi, use your computer's IP address instead of `localhost`,
  or host the folder on GitHub Pages / Netlify.

## Activities

| Activity | What she does |
|---|---|
| Counting | Touches each bead once; hears and sees each number word; then meets the numeral and word ("3 · three"). |
| Find the number | "Find four." Picks the tray with that many beads. A wrong pick is just counted aloud, never marked wrong. |
| Adding | Counts two trays, moves every bead into the bowl counting them all, then sees `3 + 2 = 5` · "three and two make five". |
| Taking away | Counts the beads, takes some away onto the plate, counts what's left, then sees `5 − 2 = 3` · "five take away two leaves three". |

**Parent corner:** press and hold the gear on the home screen for 2 seconds. From there
you can choose the voice and speaking speed, turn on reduce motion, and see or reset progress.

## Files

- `js/ui.js` holds the shared beads, trays and counting/moving interactions
- `js/speech.js` handles the browser's text-to-speech
- `js/activities/*.js` has one file per activity
- `js/app.js` contains the router, home screen and parent corner
- `sw.js` is the offline cache. Bump `CACHE` when you change files.
