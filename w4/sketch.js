function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  noStroke();
}

let squareindex = 0;
function draw() {
  for (let y = 0; y < height; y += 10) {
    for (let x = 0; x < width; x += 10) {
      fill((squareindex * mouseX) % 255, 100, 150);
      rect(x, y, 80, 80);
      squareindex++;
    }
  }
}