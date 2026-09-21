#!/bin/sh
# usage: tools/fetch_batch.sh BATCH_INDEX 'SIGNED_MP3_URL'
# Downloads one recorded batch and splits it into audio/voice/*.m4a.
set -e
cd "$(dirname "$0")/.."
f=$(printf 'tools/raw/batch-%02d.mp3' "$1")
curl -sf -o "$f" "$2"
python3 tools/split_audio.py "$1"
