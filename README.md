# Feed Value Calculator

A lightweight, single-page web app that prices a corn-roughage blend (e.g. corn silage or
earlage) on a **dry-matter** and **as-fed** basis and compares it back to corn. Built to run
on a phone and install to the iPhone home screen. No build step, no dependencies, no tracking.

## Live site

After you enable GitHub Pages (steps below), the app will be at:

```
https://<your-username>.github.io/feed-value-calculator/
```

## Use it on your iPhone

1. Open the live URL above in **Safari**.
2. Tap the **Share** button, then **Add to Home Screen**.
3. Launch it from the home-screen icon - it opens full screen like an app and works offline.

## Deploy to GitHub Pages

1. Create a new GitHub repository named **`feed-value-calculator`** (public).
2. Upload **all of these files**, keeping the folder structure intact
   (the `icons/` folder must stay a folder). You can drag-and-drop them into the repo's
   "Add file -> Upload files" page, or push with git.
3. Go to **Settings -> Pages**.
4. Under **Build and deployment**, set **Source = Deploy from a branch**, **Branch = `main`**,
   folder **`/ (root)`**, then **Save**.
5. Wait ~1 minute, then open the URL shown on that Pages settings screen.

## File structure

```
feed-value-calculator/
├── index.html        # the app (HTML + CSS + JS, all inline)
├── manifest.json     # web-app manifest (name, icons, colors)
├── sw.js             # service worker (offline support)
├── favicon.ico       # browser tab icon
├── README.md
├── LICENSE
├── .gitignore
└── icons/
    ├── icon.svg                  # scalable master
    ├── icon-1024.png             # store / master raster
    ├── icon-512.png              # web app
    ├── icon-192.png              # web app
    ├── apple-touch-icon.png      # iOS home screen (180×180)
    ├── apple-touch-icon-180.png
    ├── apple-touch-icon-167.png
    ├── apple-touch-icon-152.png
    ├── apple-touch-icon-120.png
    ├── favicon-32.png
    └── favicon-16.png
```

## Updating later

Edit `index.html` and re-upload it. The service worker serves HTML **network-first**, so a
refresh while online always pulls your latest version. If you ever change the icons and want to
force every device to refresh its cache, bump the `CACHE` value in `sw.js` (e.g. `fvc-v1` ->
`fvc-v2`).

If the home-screen icon ever shows a letter instead of the artwork: delete the home-screen
shortcut, fully close Safari, reopen the site, and re-add it (iOS caches old icons aggressively).

## Notes & disclaimer

Value is determined based simply on the dry matter of corn and roughage, which is replaced by the
feedstuff in question. Actual costs may be greater or less than the calculated value, and should be
considered. Outputs are only as good as inputs. The user assumes all risks.

## License

[MIT](LICENSE) © Wes W. Gentry
