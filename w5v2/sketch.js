function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  for (let i = 0; i < 25; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(0.5, 2.5);
    let r = random(100, 255);
    let g = random(50, 150);

    drawRandomInterestigNeonGlyphs(x, y, size, r, g);
  }
}

function drawRandomInterestigNeonGlyphs(posX, posY, s, r, g) {
  push();
  translate(posX, posY);
  scale(s);
  rotate(random(360));

  noStroke();
  fill(r, g, 200, 50);
  circle(0, 0, 100);

  noFill();
  stroke(r, g, 255, 200);
  strokeWeight(2);
  rect(0, 0, 70, 70);

  stroke(255, 100);
  strokeWeight(1);
  triangle(0, -60, -50, 40, 50, 40);

  pop();
}