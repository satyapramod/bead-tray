#!/usr/bin/env python3
"""Split one recorded batch into one clip per line.

usage: split_audio.py BATCH_INDEX

Reads tools/raw/batch-XX.mp3 and the line ids from tools/voice-batches.json
and writes audio/voice/<id>.m4a.

Lines are recorded with <break> pauses between them, but a line like
"Yes. This is one." can have a pause inside it that is nearly as long. So the
cut points are chosen together: among all silences, pick the N-1 that are long
AND make every clip's length fit its text length. Clips whose length still looks
wrong for their text are reported, and nothing is written for a batch that fails.
"""
import array, json, math, os, subprocess, sys, tempfile, wave

here = os.path.dirname(os.path.abspath(__file__))
idx = int(sys.argv[1])
batch = json.load(open(os.path.join(here, 'voice-batches.json')))[idx]
lines = {l['id']: l for l in json.load(open(os.path.join(here, 'voice-lines.json')))}
ids = batch['ids']
texts = [lines[i]['spoken'] for i in ids]
n = len(ids)
src = os.path.join(here, 'raw', f'batch-{idx:02d}.mp3')
outdir = os.path.join(here, '..', 'audio', 'voice')

tmp = tempfile.mkdtemp()
wav = os.path.join(tmp, 'a.wav')
subprocess.run(['afconvert', '-f', 'WAVE', '-d', 'LEI16@22050', '-c', '1', src, wav], check=True)
w = wave.open(wav)
rate = w.getframerate()
pcm = array.array('h', w.readframes(w.getnframes()))

STEP = 0.02  # seconds per analysis window
win = int(rate * STEP)
levels = [max(abs(x) for x in pcm[i:i + win]) for i in range(0, len(pcm), win)]
quiet = max(levels) * 0.03
loud = [lv >= quiet for lv in levels]
first = loud.index(True)
last = len(loud) - 1 - loud[::-1].index(True)

# Candidate gaps: silent runs of at least 200 ms between speech.
gaps, start = [], None
for i in range(first, last + 1):
    if not loud[i] and start is None:
        start = i
    elif loud[i] and start is not None:
        if (i - start) * STEP >= 0.2:
            gaps.append((start, i))
        start = None
m = len(gaps)
if m < n - 1:
    sys.exit(f'# FAIL batch {idx}: only {m} pauses for {n} lines')

# Expected speaking time per character, from the whole batch.
speech = (last - first + 1) * STEP - sum((b - a) * STEP for a, b in gaps) * 0.5
per_char = speech / sum(len(t) for t in texts)
expect = [max(0.35, len(t) * per_char) for t in texts]


def clip_cost(k, a, b):
    d = max((b - a) * STEP, 0.05)
    return 6.0 * math.log(d / expect[k]) ** 2


def gap_reward(g):
    return math.log((gaps[g][1] - gaps[g][0]) * STEP / 0.2)


def solve():
    # DP over (line k ends at gap g). Start/end of speech act as fixed bounds.
    INF = float('inf')
    best = [[INF] * m for _ in range(n - 1)]
    back = [[-1] * m for _ in range(n - 1)]
    for g in range(m):
        best[0][g] = clip_cost(0, first, gaps[g][0]) - gap_reward(g)
    for k in range(1, n - 1):
        for g in range(k, m):
            for p in range(k - 1, g):
                if best[k - 1][p] == INF:
                    continue
                c = best[k - 1][p] + clip_cost(k, gaps[p][1], gaps[g][0]) - gap_reward(g)
                if c < best[k][g]:
                    best[k][g], back[k][g] = c, p
    if n == 1:
        cuts = []
    else:
        total = [(best[n - 2][g] + clip_cost(n - 1, gaps[g][1], last + 1), g) for g in range(m) if best[n - 2][g] < INF]
        _, g = min(total)
        cuts = [g]
        for k in range(n - 2, 0, -1):
            g = back[k][g]
            cuts.append(g)
        cuts.reverse()
    return cuts


def clip_lengths(cuts):
    edges = [first] + [x for g in cuts for x in gaps[g]] + [last + 1]
    return [(edges[2 * k + 1] - edges[2 * k]) * STEP for k in range(n)]


# Two passes: the first guesses speaking speed from the whole batch, the second
# re-estimates it from the clips it found and solves again.
cuts = solve()
per_char = sum(clip_lengths(cuts)) / sum(len(t) for t in texts)
expect = [max(0.3, len(t) * per_char) for t in texts]
cuts = solve()

bounds, prev = [], first
for g in cuts:
    bounds.append((prev, gaps[g][0]))
    prev = gaps[g][1]
bounds.append((prev, last + 1))

report, bad = [], 0
for k, (a, b) in enumerate(bounds):
    secs = (b - a) * STEP
    ratio = secs / expect[k]
    flag = '' if 0.45 <= ratio <= 2.3 else '  <-- CHECK'
    bad += bool(flag)
    report.append(f'{secs:5.2f}s  x{ratio:4.2f}  {texts[k][:60]}{flag}')
print(f'# batch {idx}: {n} lines, {m} pauses, cut pauses >= '
      f'{min([(gaps[g][1] - gaps[g][0]) * STEP for g in cuts] or [0]) * 1000:.0f} ms')
print('\n'.join(report))
if bad:
    sys.exit(f'# FAIL batch {idx}: {bad} clip(s) do not fit their text; nothing written')

pad = 6  # keep 120 ms of air either side (soft sounds like "th" start quietly)
for k, (a, b) in enumerate(bounds):
    a = max(0, a - pad) * win
    b = min(len(levels), b + pad) * win
    seg = os.path.join(tmp, f'{k}.wav')
    o = wave.open(seg, 'wb'); o.setnchannels(1); o.setsampwidth(2); o.setframerate(rate)
    o.writeframes(pcm[a:b].tobytes()); o.close()
    subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', '-b', '48000', seg,
                    os.path.join(outdir, ids[k] + '.m4a')], check=True)
print(f'# wrote {n} clips')
