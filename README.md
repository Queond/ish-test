# ish-test

Quincy Childs's iSH development repository.

## TensorFlow learning lab

A browser demo learns a numeric pattern from five examples, shows training progress, and predicts an output for a new input. The computation uses TensorFlow.js 4.22.0 with the CPU browser backend.

### Run on your iPhone

In iSH:

```sh
cd /mnt/ish-repos/ish-test-tools
git pull --ff-only
apk add python3
python3 -m http.server 8080 --bind 127.0.0.1 --directory demos/tensorflow
```

Keep iSH running, switch to Safari or Vivaldi, and open **http://127.0.0.1:8080**. If iOS suspends iSH, return to iSH to resume the server and reload the browser. Stop the server with Ctrl+C.

Tap **Train model**, then enter an input and tap **Predict**. For input 0.75, the expected output is approximately 2.5. Inputs outside -1 to 1 extrapolate beyond the training data.

Internet access is needed to fetch the pinned TensorFlow.js library from jsDelivr. No Python TensorFlow package or native tfjs-node binding is installed in iSH. Python only serves the webpage; the browser trains the model.

## About the version and older material

Checked October 11, 2026: the TensorFlow.js GitHub latest-release endpoint lists **4.22.0**, published October 21, 2024. This is nearly two years old; a release's age does not alone establish that it is incompatible. The Python TensorFlow package has its own version numbering and installation requirements.

- [TensorFlow.js release](https://github.com/tensorflow/tfjs/releases/tag/tfjs-v4.22.0)
- [Official browser setup](https://www.tensorflow.org/js/tutorials/setup)
- [Python TensorFlow installation](https://www.tensorflow.org/install/pip)

## Other tools

- [Apps and tools](docs/apps-and-tools.md)
- [iSH setup script](scripts/setup-ish-tools.sh)

Use the dedicated checkout at /mnt/ish-repos/ish-test-tools. Keep credentials and generated dependencies out of commits.
