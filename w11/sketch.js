let faceapi;
let video;
let detections;

// assets
let maskImage;
let reactionSound;
let gifElement;

// settings
const GIF_DURATION = 1500;
let showEffect = false;
let modelLoaded = false;

const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
};

function setup() {
    createCanvas(windowWidth, windowHeight);

    // setup video capture
    video = createCapture(VIDEO);
    video.hide();

    // setup faceapi
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);

    // load static assets
    maskImage = loadImage('mask.png');

    // load sound file
    reactionSound = loadSound('sound.ogg',
        () => console.log("sound loaded"),
        () => console.error("sound failed to load")
    );

    // setup html gif
    // creates a standard html <img> tag for the gif
    gifElement = createImg('skeleton-run.gif', 'reaction');

    // applies css to make the gif cover the screen and sit on top
    gifElement.position(0, 0);
    gifElement.style('width', '100%');
    gifElement.style('height', '100%');
    gifElement.style('object-fit', 'cover'); // behaves like background-size: cover
    gifElement.style('z-index', '100'); // ensures it sits on top of the canvas
    gifElement.style('pointer-events', 'none'); // lets clicks pass through

    // hides the element initially
    gifElement.hide();

    textAlign(CENTER, CENTER);
    textSize(30);
}

function draw() {
    background(255);

    // draw video background (fit cover)
    // checks which dimension needs to scale more to fill the screen
    if (video.width > 0 && video.height > 0) {
        let scaleF = max(width / video.width, height / video.height);

        // calculates new size
        let w = video.width * scaleF;
        let h = video.height * scaleF;

        // calculates offsets to center the video
        let x = (width - w) / 2;
        let y = (height - h) / 2;

        image(video, x, y, w, h);

        // draw mask (only if active and model is ready)
        // the gif is not drawn here; it is a separate html layer
        if (modelLoaded && showEffect && detections && detections.length > 0) {
            push();
            translate(x, y);
            scale(scaleF);
            drawLandmarks(detections);
            pop();
        }
    } else {
        fill(0);
        text("waiting for camera...", width / 2, height / 2);
    }
}

function keyPressed() {
    // 32 is spacebar
    if (keyCode === 32) {
        userStartAudio(); // required by browsers to allow audio playback

        // activate face mask
        showEffect = true;

        // play sound
        if (reactionSound && reactionSound.isLoaded()) {
            reactionSound.play();
        }

        // play html gif
        // resets the gif source to restart the animation
        gifElement.elt.src = 'skeleton-run.gif';
        gifElement.show();

        // stops gif after specified duration
        setTimeout(() => {
            gifElement.hide();
        }, GIF_DURATION);
    }
}

// faceapi logic starts from here

function modelReady() {
    console.log("model ready");
    modelLoaded = true;
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
    // gets the exact center coordinate of each eye
    let leftCenter = getCentrePoint(leftEye);
    let rightCenter = getCentrePoint(rightEye);

    // finds the midpoint between the eyes, will be the center for the png
    let midX = (leftCenter.x + rightCenter.x) / 2;
    let midY = (leftCenter.y + rightCenter.y) / 2;

    // calculates distance between eyes for scaling
    let d = dist(leftCenter.x, leftCenter.y, rightCenter.x, rightCenter.y);

    // calculates angle for rotation
    let angle = atan2(rightCenter.y - leftCenter.y, rightCenter.x - leftCenter.x);

    push();
    translate(midX, midY);
    rotate(angle);
    imageMode(CENTER);

    // calculates mask dimensions relative to eye distance
    let displayWidth = d * 3.0;
    let scaleFactor = displayWidth / maskImage.width;
    let displayHeight = maskImage.height * scaleFactor;

    image(maskImage, 0, 0, displayWidth, displayHeight);
    pop();
}

function getCentrePoint(feature) {
    let sumX = 0;
    let sumY = 0;
    // loops through every dot of the eye outline
    for (let i = 0; i < feature.length; i += 1) {
        sumX += feature[i]._x;
        sumY += feature[i]._y;
    }
    // divides sum by the number of points to get the average
    return createVector(sumX / feature.length, sumY / feature.length);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}