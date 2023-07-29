let time = [minutes, seconds, milliseconds] = [0,0,0];
let tim = null;

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(300,300);
    canvas.center();
    background('white');
    canvas.mouseReleased(classifyCanvas);
}
function clearCanvas() {
    background('white');
    document.getElementById("timer").innerHTML ="Timer: " + 0 + ":" + 0 +":"+ 0;
    clearInterval(tim);
    document.getElementById("score").innerHTML ="Score: " + 0;
}
function draw() {
    stroke(0);
    strokeWeight(10);
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
        watchStart();
    }
}
function stopwatch() {
    milliseconds++
    if (milliseconds == 100){
        seconds++   
        milliseconds = 0;
        document.getElementById("timer").innerHTML ="Timer: " + minutes + ":" + seconds +":"+ milliseconds;
    }
    if (seconds == 60) {
        minutes++
        seconds = 0;
        document.getElementById("timer").innerHTML ="Timer: " + minutes + ":" + seconds +":"+ milliseconds;
    }
    document.getElementById("timer").innerHTML ="Timer: " + minutes + ":" + seconds +":"+ milliseconds;
}
function watchStart() {
    if (tim > 0) {
        clearInterval(tim);
    }
    tim = setInterval(stopwatch,1);
}
function classifyCanvas() {
    watchStop();
    classifier.classify(canvas, gotResults);
}
function watchStop() {
    clearInterval(tim);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results)
    document.getElementById("score").innerHTML ="Score: " + Math.round(results[0].confidence * 100);
}