function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  textAlign(CENTER, CENTER);
  textSize(100);
  rectMode(CENTER);
}

let px = 0;
let py = 0;

function draw() {
  px = lerp(px, mouseX, 0.1);
  py = lerp(py, mouseY, 0.1);

  // scene 1, "dark"
  background(30);
  fill(255, 50);
  noStroke();
  for (let i = 0; i < width; i += 100) {
    for (let j = 0; j < height; j += 100) {
      square(sin(frameCount * 0.03 + i) * 10 + i, sin(frameCount * 0.03 + j) * 10 + j, sin(frameCount * 0.03 + i) * 10 + 50);
    }
  }
  fill(255);
  text("DARK", width / 2, height / 2);
  
  drawingContext.save(); 
  drawingContext.beginPath(); 
  drawingContext.arc(px, py, 150, 0, TWO_PI); 
  drawingContext.clip();

  // scene 2, "light"
  background(255, 255, 200);
  fill(255, 255, 0);
  fill(100, 0, 0);
  for (let i = 0; i < width; i += 100) {
    for (let j = 0; j < height; j += 100) {
      circle(i, j, 80);
      fill(255, 255, 0, sin(frameCount * 0.06 + i + j) * 100 + 50);
    }
  }
  fill(0);
  text("LIGHT", width / 2, height / 2);

  drawingContext.restore();
}