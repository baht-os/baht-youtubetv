# BAHT YouTube TV

Fork of [marcosrg9/YouTubeTV](https://github.com/marcosrg9/YouTubeTV) v3.0.1 (MIT, © Marcos Rodríguez Yélamo)
for BAHT TV OS. The upstream history is kept; BAHT changes live on the `baht` branch so upstream releases can be
merged. The MIT license and the original credits stay unchanged.

## Changes against v3.0.1

| Area | Upstream | BAHT |
|---|---|---|
| Electron | castlabs 37.10.3+wvcus (out of support) | official Electron 44.8.0 – no Widevine in phase 1 |
| Page isolation | `nodeIntegration: true`, `contextIsolation: false`, `plugins: true` | no Node, context isolation, sandbox; `preload.ts` exposes one call (`ytv.restored()`) |
| Navigation | any URL | only https YouTube / Google sign-in (`renderers/main/allowed.ts`), pop-ups denied, permissions limited to fullscreen/media |
| Shortcuts | `globalShortcut` (grabs Ctrl+S/F/D/A from every program) | `before-input-event`, only while the window has the focus; DevTools only in development |
| Updates | own update check against GitHub | removed – BAHT ships signed updates of the app with the system |
| Casting (DIAL) | `peer-dial` 0.0.8 + Express, CORS `*`, listening on the LAN | removed in phase 1: peer-dial is unmaintained and pulls in Express 3 / ejs / node-uuid with known vulnerabilities (`npm audit --omit=dev`: 19, 2 critical). Returns as a small own implementation |
| BAHT mode | – | `--baht`: fullscreen kiosk window, no settings window, no frame |

`npm audit --omit=dev`: 0 vulnerabilities (the remaining findings are in build tools).

## Build

```
npm ci
npm test              # TypeScript + navigation lock tests
npm run build:baht    # Linux x64 folder build in dist/ (electron-builder --dir)
```

BAHT starts it as `baht-youtubetv --baht --class=baht-youtubetv` (WM_CLASS for `baht-input` context routing).

## Not done yet

- Packaging into the BAHT ISO (Void: libraries, GPU, PipeWire) and the YouTube tile switch from Firefox.
- Remote control check on a TV (Back on the start page, voice/search keys).
- Casting: own DIAL server (LAN only, validated launch data, on/off in BAHT Settings).
- Widevine (protected content) – later phase, castlabs EVS path documented in `castlabs.md`.
