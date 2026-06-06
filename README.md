# Feed Value Calculator

A lightweight, single-page web app that prices a corn-roughage blend (e.g. corn silage or
earlage) on a **dry-matter** and **as-fed** basis and compares it back to corn. Built to run on a
phone and install to the iPhone home screen. No build step, no dependencies, no tracking.

## Live site

```
https://<your-username>.github.io/feed-value-calculator/
```

## Use it on your iPhone

1. Open the live URL in **Safari**.
2. Tap **Share -> Add to Home Screen**.
3. Launch it from the home-screen icon. It opens full screen and works offline.

## Deploy to GitHub Pages

1. Create a public repo (any name; `feed-value-calculator` matches this README).
2. Upload **the contents of this folder** (so `index.html` and `apple-touch-icon.png` sit at the
   **top level** of the repo, with `icons/` as a sub-folder). Do **not** nest everything inside
   another folder.
3. **Settings -> Pages**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`, Save.
4. Wait ~1 minute and open the URL Pages shows you.

## Home-screen icon shows a letter ("F") instead of the artwork?

iOS is strict about the home-screen icon and caches aggressively. Work through these:

1. **Confirm the icon is actually live.** In Safari, open
   `https://<your-username>.github.io/feed-value-calculator/apple-touch-icon.png`
   directly. You should see the green calculator icon. If you get a 404, the files were uploaded
   into the wrong place (everything must be at the repo root, not inside a nested folder).
2. **Clear the cached fallback.** Once iOS has shown the letter it remembers it. To reset:
   - Delete the home-screen shortcut (press and hold -> Remove Bookmark).
   - **Settings -> Safari -> Clear History and Website Data** (or Settings -> Safari -> Advanced ->
     Website Data -> swipe to delete just this site).
   - Fully close Safari (swipe it away in the app switcher).
3. **Re-add it.** Reopen the live URL in Safari, let it fully load, then Share -> Add to Home Screen.

The icons in this repo are intentionally **opaque PNGs with no transparency, placed at the site
root** (`apple-touch-icon.png` and `apple-touch-icon-precomposed.png`) - this is what iOS needs for
the home screen. The favicon can look right in the tab even when the home-screen icon is wrong, so
the tab is not a reliable test; use step 1 above.

## File structure

```
feed-value-calculator/
├── index.html
├── apple-touch-icon.png            # iOS home screen (180×180, opaque, root level)
├── apple-touch-icon-precomposed.png
├── favicon.ico
├── manifest.json
├── sw.js
├── README.md
├── LICENSE
├── .gitignore
└── icons/
    ├── icon.svg
    ├── icon-1024.png
    ├── icon-512.png
    ├── icon-192.png
    ├── favicon-32.png
    └── favicon-16.png
```

## Updating later

Edit `index.html` and re-upload. The service worker serves HTML network-first, so a refresh while
online always shows your latest version. If you change icons and want every device to refresh,
bump `CACHE` in `sw.js` (e.g. `fvc-v2` -> `fvc-v3`).

## Notes & disclaimer

Value is determined based simply on the dry matter of corn and roughage, which is replaced by the
feedstuff in question. Actual costs may be greater or less than the calculated value, and should be
considered. Outputs are only as good as inputs. The user assumes all risks.

## License

[MIT](LICENSE) © Wes W. Gentry
