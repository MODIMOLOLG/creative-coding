let clones = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let Yposition = 300;
let velocity = 0;
let size = 300; 

function draw() {
  background(10, 10, 50);
  square(windowWidth/2 - size/2, Yposition, size);
  let gradient = drawingContext.createLinearGradient(20, 20, width - 20, height - 20);
  square(windowWidth/2 - size/2, (windowHeight/2)+170, size);
  gradient.addColorStop(0, color(mouseX, mouseY, 0));
  gradient.addColorStop(1, color(0, 0, 255));
  drawingContext.fillStyle = gradient;

  if (mouseIsPressed) {
    velocity += 0.1;
  }
  else if (Yposition < 300) {
    velocity -= 0.1;
  }
  if (Yposition > 300) {
    velocity = velocity * -0.6;
    Yposition = 300;
  }
  Yposition += -velocity * 3;
}
