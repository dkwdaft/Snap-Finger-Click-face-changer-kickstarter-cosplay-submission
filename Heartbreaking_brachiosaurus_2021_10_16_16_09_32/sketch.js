let outputWidth;
let outputHeight;
let faceTracker;
let videoInput;
let imgWickFace;

function preload()
{
    imgWickFace = loadImage("assets/wick.png");
}

function setup()
{
    const maxWidth = Math.min(windowWidth , windowHeight);
    pixelDensity(1)
    outputWidth = maxWidth;
    outputHeight = maxWidth * 0.75;


    createCanvas(outputWidth, outputHeight);

    // WebCam capture
    videoInput = createCapture(VIDEO);
    videoInput.size(outputWidth, outputHeight);
    videoInput.hide();

    // tracker
    faceTracker = new clm.tracker();
    faceTracker.imit();
    faceTracker.start(videoInput.elt);

}

function draw()
{
    image(videoInput, 0, 0, outputWidth, outputHeight);
    drawWickFace();
}

function drawWickFace()
{

    const positions = faceTracker.getCurrentPosition();
    if (positions !== false)
    {
        push();
        const wx = Math.abs(positions[13] [0] - positions[1] [0])  * 1.2 // the width is given by the face width, based on the geometry. 
        const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2;// The height is given by the distance from nose to chin, times 2
        translate(-wx/2, -wy/2)
        image(imgWickFace, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
        pop();
    }

}

function windowResized()
{
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputWidth = maxWidth;
    outputHeight = maxWidth * 0.75;
    resizeCanvas(outputWidth, outputHeight);
}