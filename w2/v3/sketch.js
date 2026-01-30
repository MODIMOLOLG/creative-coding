let clones = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  let gradient = drawingContext.createLinearGradient(20, 20, width - 20, height - 20);
  gradient.addColorStop(0, "cyan");
  gradient.addColorStop(1, "magenta");
  drawingContext.fillStyle = gradient;
  rect(0, 0, width, height);
  
  fill(255, 200, 100);
  drawingContext.fillStyle = "rgb(30, 30, 40, 0.8)";
  circle(windowWidth / 2, windowHeight / 2, 300 + sin(millis() / 50) * ((((windowWidth / 2) - mouseX)) + (((windowHeight / 2) - mouseY))) * 0.005);
  
  if (!this.lastCloneTime || millis() - this.lastCloneTime > 1000) {
    clones.push({x: windowWidth/2, y: windowHeight/2, r: 100});
    this.lastCloneTime = millis();
  }

  for (let i = 0; i < clones.length; i++) {
    clones[i].x += sin(millis() / 1000 + i)*(((windowWidth/2) - mouseX) * 0.01)*2;
    clones[i].r += cos(millis() / 1000 + i)*((((windowWidth/2) - mouseX)) + (((windowHeight/2) - mouseY)))*0.002;
    clones[i].y += cos(millis() / 1000 + i)*(((windowHeight/2) - mouseY) * 0.01)*2;
    circle(clones[i].x, clones[i].y, clones[i].r);
  }
}
