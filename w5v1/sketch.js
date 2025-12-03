function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  let numPetals = 12;
  let flowerX = width / 2;
  let flowerY = height / 2;
  let petalColor = color(255, 100, 150, 200);
  let centerColor = color(255, 220, 0);   
  translate(flowerX, flowerY);
  let angleStep = 360 / numPetals;
  if (mouseIsPressed) {
    drawFlower(
      random(6, 24), // number of petals
      random(-width, width), // x coordinate of flower
      random(-height, height), // y coordinate of flower
      color(random(255), random(255), random(255), 200), // petal color
      color(random(255), random(255), random(255)), // center color
      random(60, 140) // petal size
    );
  }
}

function drawFlower(numPetals, flowerX, flowerY, petalColor, centerColor, petalSize) {
  translate(flowerX, flowerY);
  let angleStep = 360 / numPetals;

  fill(petalColor);
  for (let i = 0; i < numPetals; i++) {
    drawPetal();
    rotate(angleStep);
  }

  function drawPetal() {
    ellipse(45, 0, petalSize, petalSize / 2);
  }

  fill(centerColor);
  circle(0, 0, petalSize / 2);
}