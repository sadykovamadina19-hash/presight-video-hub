#!/bin/bash
# =============================================================================
# Presight Video Hub — Mac kiosk launcher
# =============================================================================
# Double-click this file to launch the hub in fullscreen kiosk mode.
# Tries Google Chrome first, then Microsoft Edge, then falls back to opening
# the file in your default browser (no kiosk mode).
#
# FIRST-TIME SETUP on Mac:
#   This file needs to be marked as executable. Open Terminal in this folder
#   and run:
#       chmod +x launch-mac.command
#   If macOS blocks the file ("from an unidentified developer"), also run:
#       xattr -d com.apple.quarantine launch-mac.command
#
# TO EXIT KIOSK MODE: press Cmd+Q.
# =============================================================================

# Resolve the directory this script lives in, regardless of where it's run from.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
URL="file://$DIR/index.html"

# Kiosk-friendly Chrome flags — no first-run dialogs, no translate popups,
# no session-restore prompts, etc.
FLAGS=(
  --kiosk
  --no-first-run
  --no-default-browser-check
  --disable-pinch
  --disable-features=Translate
  --disable-session-crashed-bubble
  --noerrdialogs
  --start-fullscreen
)

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
EDGE="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"

if [ -x "$CHROME" ]; then
  "$CHROME" "${FLAGS[@]}" "$URL" >/dev/null 2>&1 &
elif [ -x "$EDGE" ]; then
  "$EDGE" "${FLAGS[@]}" "$URL" >/dev/null 2>&1 &
else
  # No Chrome or Edge — open in default browser. Press F11 for fullscreen.
  open "$URL"
fi
