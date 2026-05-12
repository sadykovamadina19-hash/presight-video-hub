# Presight Video Hub

A self-contained, offline video browser for tradeshow kiosks and internal use. Runs from a folder — no installer, no internet connection, no subscription.

---

## How to run it

1. Copy the entire `presight-video-hub` folder to the kiosk machine (USB drive, network share, or cloud sync).
2. Double-click `index.html`.
3. It opens in the default browser. That's it.

Works on macOS and Windows. Tested in Chrome, Edge, Firefox, and Safari.

---

## How to add or update videos

The **only file you edit** is `content.js`. Open it in any text editor — TextEdit on Mac, Notepad on Windows, or VS Code if you have it.

Inside `content.js` everything is heavily commented. The structure has four sections:

- **`hero`** — the featured video on the Videos page (always the same one)
- **`categories`** — the six category buttons (Public Services, Smart Cities, etc.) and the videos inside each
- **`products`** — the product icon row at the bottom, with the videos for each product
- **`demos`** — the cards on the Demos page

### To add a new video to a category

1. Drop your `.mp4` file into the `/videos` folder.
2. Drop your thumbnail image (`.jpg` or `.png`) into the `/thumbnails` folder.
3. Open `content.js`. Find the category you want (look for the `id:` line, e.g. `id: "public-services"`).
4. Inside that category's `videos` list, copy one of the existing entries and paste it. Edit the `title`, `file_en`, `file_ar`, and `thumbnail` to match your new file.
5. Save the file. Refresh the browser.

### To remove a video

Delete its entry (the entire block from `{` to `},`) inside the relevant `videos` list.

### To swap a video

Replace the file in `/videos` with a new one of the same name — no `content.js` edit needed. Or update the `file_en` / `file_ar` paths to point to the new filename.

### To change the hero video

Edit the `hero` block at the top of `content.js`. Change the `title`, `file_en`, `file_ar`, and `thumbnail` to your new video.

### To add or rename a category

Copy one of the existing category blocks in `content.js` and paste it. Change the `id` (lowercase letters and hyphens only — no spaces), `label`, and `description`. The button row will pick it up automatically.

### To add an Arabic version of a video

Drop the Arabic version into `/videos`, then update the `file_ar` path in `content.js` to point to it. The EN/AR toggle in the player will switch between them automatically.

If a video has no Arabic version, set `file_ar: ""` (empty string) and the toggle will fall back to English.

---

## Common mistakes

- **Forgetting a comma.** Every entry except the last in a list needs a comma after it. If the page goes blank after editing, this is usually why.
- **Curly quotes vs straight quotes.** Use straight quotes (`"`) — some editors auto-convert. In TextEdit on Mac, go to Edit → Substitutions and turn off Smart Quotes before editing.
- **Renaming a file but not updating `content.js`.** Filenames must match exactly, including capitalization.

If something breaks after editing, you can always restore from the backup copy. **Make a backup before any big change.**

---

## Replacing the placeholder product icons

Each product in the row at the bottom of the Videos page uses a placeholder icon right now. To replace them with real icons:

1. Save each product icon as an SVG (preferred) or PNG (32×32 pixels minimum).
2. Drop them into `/assets/product-icons/`, naming each one to match the product entry in `content.js` — e.g. `intellicity.svg`, `lifesaver.svg`.
3. The icons load automatically. No `content.js` edit needed.

---

## Folder structure (for reference)

```
presight-video-hub/
├── index.html              ← double-click to run (or use a launcher below)
├── launch-mac.command      ← double-click on Mac for fullscreen kiosk mode
├── launch-windows.bat      ← double-click on Windows for fullscreen kiosk mode
├── content.js              ← THE file you edit
├── README.md               ← this file
├── css/style.css           ← visual styling (Presight design system)
├── js/app.js               ← app behavior — don't edit unless you know JS
├── assets/
│   ├── logo.svg            ← Presight wordmark
│   └── product-icons/      ← drop product icons here
├── videos/                 ← drop video files here
└── thumbnails/             ← drop thumbnail images here
```

---

## Running in fullscreen / kiosk mode

You have **three options**, in increasing order of how locked-down they are:

### Option 1 — Press F11 (or Cmd+Ctrl+F on Mac Safari)

The fastest. Open `index.html` in any browser, press F11, done. Press F11 again or Esc to exit. Visitors *can* press Esc, so this is fine for internal use but not ideal for an unattended tradeshow kiosk.

### Option 2 — In-app auto-fullscreen (already on by default)

On the first click anywhere in the hub, the browser automatically enters fullscreen mode. No setup. Visitors can still press Esc to exit, same as F11.

To **disable** this (e.g. while you're developing or testing), open `content.js` and change `autoFullscreen: true` to `autoFullscreen: false` at the top.

### Option 3 — Kiosk launchers (recommended for tradeshows)

The most locked-down option. The folder includes two launcher scripts:

- **`launch-mac.command`** — for Mac kiosks
- **`launch-windows.bat`** — for Windows kiosks

Double-click the right one. It opens Chrome (or Edge as a fallback) in true kiosk mode — no browser chrome, no Esc-to-exit, no right-click menus, no first-run prompts. The cleanest visitor experience.

To **exit kiosk mode**: press `Cmd+Q` on Mac, `Alt+F4` on Windows.

**Mac first-run setup.** macOS treats downloaded `.command` files as untrusted. Open Terminal, navigate to this folder, and run:

```bash
chmod +x launch-mac.command
xattr -d com.apple.quarantine launch-mac.command
```

After that, double-clicking the file works normally.

**What if Chrome / Edge isn't installed?** The launcher falls back to opening the file in your default browser (without kiosk mode), so it still works — you just get F11-fullscreen instead.

---

## Deploying to a tradeshow kiosk

1. Copy the whole `presight-video-hub` folder to the kiosk machine (USB drive, network share, or directly onto the hard drive).
2. Use **Option 3** above for the cleanest experience: double-click `launch-mac.command` or `launch-windows.bat`.
3. **Optional extra hardening:** for very public kiosks where you don't want visitors closing or alt-tabbing away, use the OS's kiosk mode. macOS has Guided Access; Windows has Assigned Access. These prevent the user from leaving the browser entirely.

---

## Fonts

The brand fonts are bundled inside `/assets/fonts/` and loaded automatically — the hub renders correctly on any Mac or Windows machine without installing anything.

| Family | Weights bundled | Used for |
|---|---|---|
| Helvetica Neue | Light (300), Regular (400), Medium (500), Bold (700) | All body text, navigation, tagline |
| Helvetica Neue Condensed | Bold (700) | The "INTELLIGENCE. APPLIED." declarative headline and other display lines |
| IBM Plex Mono | Regular (400), Medium (500) | "CATEGORIES" / "PRODUCTS" labels and any technical text |

A note on licensing: Helvetica Neue is a commercial typeface from Monotype/Linotype. Embedding it locally for an internal kiosk is generally fine under most licenses; redistributing the kiosk folder externally (e.g., to a partner) without confirming your license terms is not. IBM Plex Mono is free under the SIL Open Font License — the `IBMPlexMono-OFL.txt` file in `/assets/fonts/` includes the full license text.

To swap a weight, drop the replacement `.ttf` or `.otf` into `/assets/fonts/` and update the matching `@font-face` block at the top of `css/style.css`.

---

## What's next

This is the working skeleton (Step 1). Next steps:

- **Step 2 — Visual pass** to match the Figma exactly (proportions, type sizing, motif placement, the gradient stamp on "APPLIED.").
- **Step 3 — Player polish** to match the deck aesthetic for the fullscreen view.
- **Step 4 — Documentation pass** if anything in this README isn't clear.

Open `index.html` and click around — see if the structure and behavior feel right. Then we'll move on.
