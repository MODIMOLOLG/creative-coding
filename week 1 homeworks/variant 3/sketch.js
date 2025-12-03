const clones = [];
const lifespan = 20000; // 20 seconds
const planeSize = 400;
const moveSpeed = 1;
const creationInterval = 20;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  stroke(255, 0, 0);
  noFill();
  background(0);
}

function draw() {
  rotateWithMouse();

  if (frameCount % creationInterval === 0) {
    clones.push({
      x: 0,
      y: 0,
      z: 0,
      direction: moveSpeed,
      rotation: 0,
      time: millis()
    });

    clones.push({
      x: 0,
      y: 0,
      z: 0,
      direction: -moveSpeed,
      rotation: 0,
      time: millis()
    });
  }

  for (let i = clones.length - 1; i >= 0; i--) {
    const clone = clones[i];
    const age = millis() - clone.time;
    if (age > lifespan) {
      clones.splice(i, 1);
    } else {
      push();
      translate(clone.x, clone.y, clone.z);
      rotateZ(clone.rotation);
      triangle(-planeSize / 2, planeSize / 2, 0, -planeSize / 2, planeSize / 2, planeSize / 2);
      pop();

      clone.z += clone.direction;
      clone.rotation += 3;
    }
  }
}

function rotateWithMouse() {
  rotateY(map(mouseX, 0, width, -360, 360));
  rotateX(map(mouseY, 0, height, -360, 360));
}

function mouseClicked() {
  background(0);
}