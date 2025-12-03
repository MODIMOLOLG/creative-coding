let p = 0;
let s = 0;
let points = 1000;
let freq1 = 7;
let freq2 = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
}

function draw() {
  background(0);
  p += 0.02;
  translate(width / 2, height / 2);
  let r1 = width / 2 - s;

  beginShape();
  for (let i = 0; i <= points; i++) {
    let angle = TWO_PI / points * i;
    let x = cos(angle * p) * r1 - cos(angle * freq2 + p) * s;
    let y = sin(angle * freq1) * r1 + sin(angle * freq2 + p) * s;
    vertex(x, y);
  }
  endShape();

  s = cos(p) * (width / 2);
}