const clones = [];
const lifespan = 20000; // 20 seconds 
const planeSize = 400;
const moveSpeed = 3;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  stroke(255);
  fill(0, 50);
  background(0);
}

function draw() {
  rotateWithMouse();
  for (let i = clones.length - 1; i >= 0; i--) {
    const clone = clones[i];
    const age = millis() - clone.time;
    if (age > lifespan) {
      clones.splice(i, 1);
    } else {
      push();
      translate(clone.x, clone.y, clone.z);
      rotateZ(clone.rotation);
      plane(planeSize, planeSize);
      pop();

      clone.z += clone.direction;
      clone.rotation += 1;
    }
  }
}

function rotateWithMouse() {
  rotateY(map(mouseX, 0, width, -360, 360));
  rotateX(map(mouseY, 0, height, -360, 360));
}

function mouseWheel(event) {
  let direction;

  if (event.delta > 0) {
    direction = 3;
  } else {
    direction = -3;
  }

  clones.push({
    x: 0,
    y: 0,
    z: 0,
    direction: direction,
    rotation: 0,
    time: millis()
  });
}