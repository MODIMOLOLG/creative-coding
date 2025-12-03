let p = 0;
let s = 0;
let points = 1000;
let freq1 = 10;
let freq2 = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
}

function draw() {
  background(0, 20);
  translate(width / 2, height / 2);

  p += 0.02;
  freq1 += (mouseX - width / 2) * 0.0001;
  freq2 += (mouseY - height / 2) * 0.0001;
  s = map(sin(p), -1, 1, 50, 200);

  beginShape();
  for (let i = 0; i <= points; i++) {
    let theta = map(i, 0, points, 0, TWO_PI);
    let r = 200 + sin(theta * freq1 + p) * s + cos(theta * freq2) * 50;
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
}