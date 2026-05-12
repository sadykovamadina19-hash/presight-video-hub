@echo off
REM =============================================================================
REM Presight Video Hub — Windows kiosk launcher
REM =============================================================================
REM Double-click this file to launch the hub in fullscreen kiosk mode.
REM Tries Google Chrome first, then Microsoft Edge, then falls back to opening
REM the file in your default browser.
REM
REM TO EXIT KIOSK MODE: press Alt+F4.
REM =============================================================================

REM Switch to the folder this script lives in
cd /d "%~dp0"

REM Compose the file URL for the local index.html
set "URL=file:///%CD:\=/%/index.html"

REM Kiosk-friendly browser flags
set "FLAGS=--kiosk --no-first-run --no-default-browser-check --disable-pinch --disable-features=Translate --disable-session-crashed-bubble --noerrdialogs --start-fullscreen"

REM Try Chrome (64-bit), then Chrome (32-bit), then Edge, then default browser
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" %FLAGS% "%URL%"
  goto :end
)
if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" %FLAGS% "%URL%"
  goto :end
)
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" %FLAGS% "%URL%"
  goto :end
)
if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
  start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" %FLAGS% "%URL%"
  goto :end
)

REM Last resort: open in default browser. Press F11 for fullscreen.
start "" "%CD%\index.html"

:end
