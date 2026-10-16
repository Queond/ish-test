# Base44 Dev Environment

## Project overview

Static TensorFlow.js learning-lab demo (`demos/tensorflow/index.html` + `app.js`).
No backend, no build step, no package manager. TensorFlow.js 4.22.0 is loaded
from jsDelivr in the browser.

## Running in the sandbox

`docker compose -f docker-compose.base44.yml up -d` serves `demos/tensorflow/`
via nginx:alpine on host port 3000.

## Verification

- `curl http://localhost:3000/` returns the HTML page.
- In the preview: "Train model" button enables after TensorFlow.js loads,
  then "Predict" produces a result for input 0.75 (~2.5).

## No secrets required

The app has no external credentials. TensorFlow.js is fetched from a public CDN.
