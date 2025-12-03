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
    drawHyeroglyph(
      
    );
  }
}

function drawHyeroglyph() {
  
}