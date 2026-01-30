let nSlider;
let scaleSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  noFill();
  stroke(255);
  strokeWeight(2);
}

let n = 5;
let a = 100;

function draw() {
  background(20);
  translate(width / 2, height / 2);
  beginShape();
  for (let theta = 0.01; theta < TWO_PI * n; theta += 0.05) {

    // no division by zero when theta is near 0
    let denominator = sin(theta / 2);
    if (abs(denominator) < 0.001) continue;

    let r = 2 * a * (sin(n * theta / 2) / denominator);

    // polar to cartesian conversion happens here
    let x = r * cos(theta);
    let y = r * sin(theta);

    vertex(x, y);
  }
  endShape();
  n = n + 0.001;
  a = a + 0.05;
}