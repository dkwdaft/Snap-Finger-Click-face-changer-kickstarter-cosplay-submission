let outputWidth;
let outputHeight;

let faceTracker; // Face Tracking
let videoInput;

let imgWickFace;

let imgWickMask

let imgPixelSaliMask;

let selected = -1;

/*
 * **p5.js** library automatically executes the `preload()` function. Basically, it is used to load external files. In our case, we'll use it to load the images for our filters and assign them to separate variables for later use.
*/
function preload() 
{
	// Wick Face  Filter asset
	imgWickFace = loadImage("assets/wick.png");

	// Wick  Mask Filter asset
	imgWickMask = loadImage("assets/Wick_Mask.png");

	//  Pixel Sali Mask Filter asset
	imgPixelSaliMask = loadImage("assets/sali.PNG");
}
/**
 * In p5.js, `setup()` function is executed at the beginning of our program, but after the `preload()` function.
*/
function setup()
{
	const maxWidth = Math.min(windowWidth, windowHeight);
	pixelDensity(1);
	outputWidth = maxWidth;
	outputHeight = maxWidth * 0.75; // 4:3

	createCanvas(outputWidth,outputHeight);

	// webcam capture
	videoInput = createCapture(VIDEO)
    videoInput.size(outputWidth, outputHeight);
	videoInput.hide();

	// select filter
	const sel = createSelect();
	const selectList = ['Wick Van Dank Face','Wick Van Dank Mask (experimental)','Sali Mask'];
	sel.option('Select Filter', -1);
	for (let i = 0; i < selectList.length; i++)
	{
		sel.option(selectList[i], i);
	}
	sel.changed(applyFilter);

	// tracker
	faceTracker = new clm.tracker();
	faceTracker.init();
	faceTracker.start(videoInput.elt);
}

// callback function
function applyFilter()
{
	selected = this.selected(); // change filter type
}

/*
 * In p5.js, draw() function is executed after setup(). This function runs inside a loop until the program is stopped.
*/
function draw()
{
	image(videoInput, 0, 0, outputWidth, outputHeight); // render video from webcam

	// apply filter based on choice
	switch(selected)
	{
		case '-1': break;
		case '0': drawWickFace(); break;
		case '1': drawWickMask(); break;
		case '2': drawSaliMask(); break;
	}
}

// Wick Face Filter
function drawWickFace()
{
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false)
	{
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
		const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
		translate(-wx/2, -wy/2);
		image(imgWickFace, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
		pop();
	}
}

function drawWickMask()
{
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false)
	{
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
		const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
		translate(-wx/2, -wy/2);
		image(imgWickMask, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
		pop();
	}
}

//  Pixel Sali Mask Filter
function drawSaliMask()
{
	const positions = faceTracker.getCurrentPosition();
	if (positions !== false)
	{
		push();
		const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
		const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
		translate(-wx/2, -wy/2);
		image(imgPixelSaliMask, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
		pop();
	}
}

function windowResized()
{
	const maxWidth = Math.min(windowWidth, windowHeight);
	pixelDensity(1);
	outputWidth = maxWidth;
	outerHeight = maxWidth * 0.75; // 4:3
	resizeCanvas(outerWidth, outerHeight);
}