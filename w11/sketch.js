let faceapi;
let video;
let detections;

// all assets
let maskImage;
let reactionSound;
let reactionGif;

// state flags
let showEffect = false;
let playGif = false; 

const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

function preload() {
    maskImage = loadImage('mask.png');
    reactionGif = loadImage('skeleton-run.gif');
    reactionSound = loadSound('sound.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    video = createCapture(VIDEO);
    video.hide();

    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
}

function draw() {
    background(255);

    if (video.width > 0 && video.height > 0) {
        // calculate scaling to cover the screen
        let scaleF = max(width / video.width, height / video.height);
        let w = video.width * scaleF;
        let h = video.height * scaleF;
        let x = (width - w) / 2;
        let y = (height - h) / 2;

        image(video, x, y, w, h);

        if (playGif) {
            // using the same math as the video to make the GIF "cover" the screen
            // GIF has different dimensions, we calculate its own scale
            let gifScale = max(width / reactionGif.width, height / reactionGif.height);
            let gw = reactionGif.width * gifScale;
            let gh = reactionGif.height * gifScale;
            let gx = (width - gw) / 2;
            let gy = (height - gh) / 2;

            image(reactionGif, gx, gy, gw, gh);

            // check if the current frame is the last frame so it can stop playing (only needs to play once)
            if (reactionGif.getCurrentFrame() === reactionGif.numFrames() - 1) {
                reactionGif.pause();
                playGif = false;
            }
        }

        // drawing the mask only after the spacebar is pressed
        if (showEffect && detections && detections.length > 0) {
            push();
            translate(x, y);
            scale(scaleF);
            drawLandmarks(detections);
            pop();
        }
    }
}

function keyPressed() {
    // 32 is the keycode for Spacebar
    if (keyCode === 32) {
        // activate the mask
        showEffect = true;

        // reset and play the GIF
        playGif = true;
        reactionGif.setFrame(0); // Restart gif from beginning
        reactionGif.play();

        // play sound
        if (reactionSound.isLoaded()) {
            reactionSound.play();
        }
    }
}

// --- FaceAPI Boilerplate ---

function modelReady() {
    console.log("ready!");
    faceapi.detect(gotResults);
}

function gotResults(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    detections = result;
    faceapi.detect(gotResults);
}

function drawLandmarks(detections) {
    for (let i = 0; i < detections.length; i += 1) {
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        drawFaceMask(leftEye, rightEye);
    }
}

function drawFaceMask(leftEye, rightEye) {
    let leftCenter = getCentrePoint(leftEye);
    let rightCenter = getCentrePoint(rightEye);

    let midX = (leftCenter.x + rightCenter.x) / 2;
    let midY = (leftCenter.y + rightCenter.y) / 2;
    let d = dist(leftCenter.x, leftCenter.y, rightCenter.x, rightCenter.y);
    let angle = atan2(rightCenter.y - leftCenter.y, rightCenter.x - leftCenter.x);

    push();
    translate(midX, midY);
    rotate(angle);
    imageMode(CENTER);

    let displayWidth = d * 3.0;
    let scaleFactor = displayWidth / maskImage.width;
    let displayHeight = maskImage.height * scaleFactor;

    image(maskImage, 0, 0, displayWidth, displayHeight);
    pop();
}

function getCentrePoint(feature) {
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < feature.length; i += 1) {
        sumX += feature[i]._x;
        sumY += feature[i]._y;
    }
    return createVector(sumX / feature.length, sumY / feature.length);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}