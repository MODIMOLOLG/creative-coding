function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
}

const distance = 100;
const numWaves = 10;
const fillColor = [0, 150, 255];
const backgroundColor = [255];
const xStep = 60;
const waveSpeed = 1.5;
const waveAmplitude = 100;
const firstShapeBaseY1 = 200;
const firstShapeBaseY2 = -200;
const secondShapeBaseY1 = 0;
const secondShapeBaseY2 = 0;

function draw() {
  background(backgroundColor);
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