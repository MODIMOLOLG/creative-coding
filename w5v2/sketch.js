function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(30, 30, 50, 50);
  translate(width / 2, height / 2); 
  let t = frameCount * 0.02;

  let waveValue = sin(t);
  let currentSize = map(waveValue, -1, 1, 100, 250);
  let currentRotation = map(waveValue, -1, 1, -PI / 8, PI / 8);

  rotate(currentRotation);

  fill(100, 200, 255, 100);
  ellipse(-30, 0, currentSize, currentSize * 0.9);

  fill(150, 255, 200, 100);
  ellipse(30, 0, currentSize * 0.9, currentSize);

}