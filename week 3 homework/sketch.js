const palette = [
  [108, 212, 255],
  [139, 128, 249],
  [207, 191, 247],
  [207, 177, 183],
  [131, 133, 140],
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);
  rectMode(CENTER); 
  noLoop();
  noStroke();
}

function mouseWheel(event) {
  draw();
}

function draw() {
  let gridSize = 50;
  for (let x = gridSize / 2; x < width; x += gridSize) {
    for (let y = gridSize / 2; y < height; y += gridSize) {
      let r = random(1);
      fill(random(palette));
      let size = random(gridSize * 0.5, gridSize * 1.2);

      if (r < 0.3) {
        push();
        translate(x, y);
        rotate(random(TWO_PI));
        rect(0, 0, size, size);
        pop();

      } else if (r < 0.6) {
        circle(x, y, size);

      } else if (r < 0.8) {
        noFill();
        strokeWeight(random(2, 5));
        let startAngle = random(TWO_PI);
        let endAngle = startAngle + random(PI, TWO_PI);
        arc(x, y, size, size, startAngle, endAngle);

      }
    }
  }
}