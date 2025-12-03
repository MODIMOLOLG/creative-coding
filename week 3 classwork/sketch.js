let clones = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let size = 300;
let velocity = 0;

function draw() {
  background(10, 10, 50);
  circle(windowWidth/2, windowHeight/2, size);
  let gradient = drawingContext.createLinearGradient(20, 20, width - 20, height - 20);
  gradient.addColorStop(0, color(mouseX, mouseY, 0));
  gradient.addColorStop(1, color(0, 0, 255));
  drawingContext.fillStyle = gradient;

  if (mouseIsPressed) {
    velocity += 0.1;
  }
  else if (size > 300) {
    velocity -= 0.1;
  }
  if (size <300) {
    velocity = velocity * -0.6;
    size = 300;
  }
  size += velocity*3;
}
