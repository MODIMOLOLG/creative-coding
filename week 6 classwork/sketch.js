function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
}

let r = 100;
let g = 150;
let b = 200;

function draw() {
  let x = width / 2 + sin(frameCount * 1) * 100;
  let y = height / 2 + cos(frameCount * 0.45) * 100;
  fill(r, g, b);
  r = sin(frameCount) * 127 + 128;
  ellipse(x, y, 5);
}