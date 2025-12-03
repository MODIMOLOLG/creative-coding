function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
}

const distance = 100;
const numWaves = 10;
const fillColor = [255, 100, 150];
const backgroundColor = 0;
const xStep = 100;
const waveSpeed = 2;
const waveAmplitude = 100;
const firstShapeBaseY1 = 0;
const firstShapeBaseY2 = -100;
const secondShapeBaseY1 = -100;
const secondShapeBaseY2 = 100;

function draw() {
  background(0);

  for (let i = 0; i < numWaves; i++) {
    fill(fillColor);
    beginShape();
    for (let x = 0; x <= width; x += xStep) {
      let y = sin(x + frameCount * waveSpeed) * waveAmplitude;
      vertex(x, y);
    }
    vertex(width, firstShapeBaseY1);
    vertex(0, firstShapeBaseY2);
    endShape(CLOSE);

    translate(0, distance);
    fill(fillColor);
    beginShape();
    for (let x = 0; x <= width; x += xStep) {
      let y = sin(x + frameCount * waveSpeed) * waveAmplitude;
      vertex(x, y);
    }
    vertex(width, secondShapeBaseY1);
    vertex(0, secondShapeBaseY2);
    endShape(CLOSE);

    translate(0, distance);
  }
}