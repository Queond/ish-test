'use strict';
const byId = id => document.getElementById(id);
let model;
let trained = false;
const trainButton = byId('train');
const predictButton = byId('predict');
const status = byId('status');
const points = [-1, -0.5, 0, 0.5, 1];

function predictValue(x) {
  return tf.tidy(() => model.predict(tf.tensor2d([x], [1, 1])).dataSync()[0]);
}

function drawPlot() {
  const ctx = byId('plot').getContext('2d');
  if (!ctx) return;
  const px = x => 60 + (x + 1.5) / 3 * 550;
  const py = y => 290 - (y + 2) / 6 * 250;
  ctx.clearRect(0, 0, 640, 340);
  ctx.strokeStyle = '#b3c1d6';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(60, 30); ctx.lineTo(60, 290); ctx.lineTo(610, 290); ctx.stroke();
  ctx.fillStyle = '#52647d'; ctx.font = '16px system-ui';
  for (const x of [-1, 0, 1]) ctx.fillText(String(x), px(x) - 5, 315);
  for (const y of [-1, 1, 3]) ctx.fillText(String(y), 28, py(y) + 5);
  ctx.fillText('Input x', 535, 336); ctx.fillText('Output y', 65, 20);
  if (trained) {
    ctx.strokeStyle = '#167d56'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(px(-1.5), py(predictValue(-1.5)));
    ctx.lineTo(px(1.5), py(predictValue(1.5))); ctx.stroke();
  }
  ctx.fillStyle = '#235cc0';
  for (const x of points) { ctx.beginPath(); ctx.arc(px(x), py(2 * x + 1), 7, 0, Math.PI * 2); ctx.fill(); }
}

function showPrediction() {
  const raw = byId('input').value.trim();
  const x = Number(raw);
  if (raw === '' || !Number.isFinite(x) || x < -5 || x > 5) {
    byId('result').textContent = 'Enter −5 to 5';
    byId('comparison').textContent = 'Use a valid number before predicting.';
    return;
  }
  const prediction = predictValue(x);
  byId('result').textContent = 'Prediction: ' + prediction.toFixed(4);
  byId('comparison').textContent = 'Example formula: ' + (2 * x + 1).toFixed(4) +
    ' · Absolute error: ' + Math.abs(prediction - (2 * x + 1)).toFixed(6) +
    (Math.abs(x) > 1 ? ' · This input is outside the training range.' : '');
}

trainButton.addEventListener('click', async () => {
  trainButton.disabled = true; predictButton.disabled = true;
  byId('progress').value = 0;
  const xs = tf.tensor2d(points, [5, 1]);
  const ys = tf.tensor2d(points.map(x => 2 * x + 1), [5, 1]);
  try {
    await model.fit(xs, ys, {
      epochs: 160, batchSize: 5, shuffle: false, yieldEvery: 'epoch',
      callbacks: { onEpochEnd: async (epoch, logs) => {
        byId('progress').value = epoch + 1;
        if (epoch % 10 === 0 || epoch === 159)
          status.textContent = 'Pass ' + (epoch + 1) + '/160 · Loss: ' + logs.loss.toFixed(8);
      }}
    });
    trained = true;
    status.textContent = 'Training complete. Try predicting with a new input.';
    predictButton.disabled = false;
    trainButton.textContent = 'Train another 160 passes';
    drawPlot(); showPrediction();
  } catch (error) {
    status.textContent = 'Training failed: ' + error.message;
    predictButton.disabled = !trained;
  } finally {
    xs.dispose(); ys.dispose(); trainButton.disabled = false;
  }
});
predictButton.addEventListener('click', showPrediction);

window.addEventListener('DOMContentLoaded', async () => {
  drawPlot();
  if (typeof tf === 'undefined') {
    status.textContent = 'Could not load TensorFlow.js. Check your connection and reload this page.';
    return;
  }
  try {
    await tf.setBackend('cpu'); await tf.ready();
    model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1], kernelInitializer: 'zeros', biasInitializer: 'zeros'}));
    model.compile({optimizer: tf.train.sgd(0.1), loss: 'meanSquaredError'});
    byId('version').textContent = 'TensorFlow.js ' + tf.version.tfjs + ' · CPU browser backend';
    status.textContent = 'Ready. Tap Train model to learn from the examples.';
    trainButton.disabled = false;
  } catch (error) {
    status.textContent = 'Initialization failed: ' + error.message;
  }
});
