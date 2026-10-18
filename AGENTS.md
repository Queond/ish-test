# Base44 Dev Environment

This is a static-site repository (Quincy Childs's iSH dev repo). The "app" is a
TensorFlow.js browser demo at `demos/tensorflow/` — a single `index.html` + `app.js`
served as static files. There is no build step, no package.json, and no SPA router.

## Why it "failed to start" originally

The repo had no Base44 dev environment — no `docker-compose.base44.yml` and no
`.base44/environment.json` — so there was nothing serving on port 3000. The fix
was to add a compose service that serves the static demo directory.

## Running the preview

```sh
docker compose -f docker-compose.base44.yml up -d
```

Serves `demos/tensorflow/` on host port 3000 via `python3 -m http.server`. Static
files need no live-reload dev server; edits appear on the next page refresh, and
`reload_preview` forces a full refresh of the preview iframe.

## Verifying it works

- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` → `200`
- The page title is "Quincy's TensorFlow Learning Lab".
- The demo loads TensorFlow.js 4.22.0 from the jsDelivr CDN in the browser, so
  the preview browser needs internet access (it has it). The server only serves
  static HTML/JS.
- Core interaction: the **Train model** button is disabled until tf.js loads,
  then enabled; clicking it runs 160 epochs; after training, **Predict** for
  input `0.75` returns ~`2.5000` (the learned y = 2x + 1 relationship).

## Notes

- The preview tooling's SPA `navigate` helper does not apply here (no router);
  inspect the page directly or use `preview_screenshot` with the `/` path.
- No secrets are required. No external-service credentials are used.
