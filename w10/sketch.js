let p1 = 0;
let p2 = 0;
let s = 0;
let points = 1000;
let freq1 = 10;
let freq2 = 20;

let song, fft;

function preload() {
    song = loadSound('sanctuary1.mp3');
    userStartAudio();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    stroke(255);
    fft = new p5.FFT();
    song.loop();
}

function draw() {
    let spectrum = fft.analyze();
    let waveform = fft.waveform();

    let bass = fft.getEnergy("bass");
    let lowMid = fft.getEnergy("lowMid");
    let mid = fft.getEnergy("mid");
    let highMid = fft.getEnergy("highMid");
    let treble = fft.getEnergy("treble");

    background(0, 20);
    translate(width / 2, height / 2);

    p1 += mid * 0.001;
    freq1 = 10 + mid * 0.005;
    freq2 = 20 + mid * 0.01 + 50;
    s = map(sin(p1), -1, 1, 50, 200);

    stroke(255);
    beginShape();
    for (let i = 0; i <= points; i++) {
        let theta = map(i, 0, points, 0, TWO_PI);
        let r = 200 + (sin(theta * freq1 + p1) * s + cos(theta * freq2) * 50)* 0.5;
        let x = r * cos(theta);
        let y = r * sin(theta);
        vertex(x, y);
    }
    endShape(CLOSE);

    p2 += bass * 0.001;
    freq1 = 10 + bass * 0.0005;
    freq2 = 20 + bass * 0.001 + 50;
    s = map(sin(p2), -1, 1, 50, 200);

    stroke(255, 100, 150);
    beginShape();
    for (let i = 0; i <= points; i++) {
        let theta = map(i, 0, points, 0, TWO_PI);
        let r = 200 + (sin(theta * freq1 + p2) * s + cos(theta * freq2) * 50) * 0.5;
        let x = r * cos(theta);
        let y = r * sin(theta);
        vertex(x, y);
    }
    endShape(CLOSE);
}