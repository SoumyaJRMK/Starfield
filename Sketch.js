// Disables friendly errors system (FES)
p5.disableFriendlyErrors = true;

// Global constants
const canvasSize = 700; // The size of our beautiful canvas
const totalStars = 6; // The number of stars twinkling in our sky
const defaultStarSpeed = 40; // The default speed of our stars

let stars = []; // An array to hold all our twinkling stars
let speedSlider; // A slider to control the speed of the stars

// Setup function: Initializes the canvas and stars
function setup() {
  createCanvas(canvasSize, canvasSize); // Creating our canvas

  // Creating a slider to control star speed
  speedSlider = createSlider(1, defaultStarSpeed, defaultStarSpeed / 2, 0); // Slider settings
  speedSlider.position(10, 10); // Positioning the slider
  speedSlider.size(canvasSize - 25); // Adjusting its size to fit the canvas

  // Creating stars and adding them to our array
  for (let i = 0; i < canvasSize * totalStars; i++) {
    stars.push(new Star()); // Creating a new star and adding it to our twinkling array
  }
}

// Draw function: Renders the stars and updates their positions
function draw() {
  drawSkyGradient(); // Creating a beautiful night sky gradient
  translate(width / 2, height / 2); // Translating the origin to the center of the canvas

  // Updating and displaying each twinkling star
  for (let i = 0; i < (canvasSize * totalStars); i++) {
    stars[i].update(); // Updating the position of the star
    stars[i].display(); // Displaying the star on the canvas
  }
}

// Star class: Represents a star in the animation
class Star {
  constructor() {
    // Initializing the star's position and other properties
    this.xPos = random(-width, width); // Random X position within the canvas
    this.yPos = random(-height, height); // Random Y position within the canvas
    this.zPos = random(canvasSize); // Random Z position within the canvas
    this.prevXPos = this.xPos; // Previous X position for smooth motion
    this.prevYPos = this.yPos; // Previous Y position for smooth motion
    this.prevZPos = this.zPos; // Previous Z position for smooth motion
    this.brightness = random(150, 250); // Random brightness for our twinkling star
    this.twinkleSpeed = random(0.001, 0.01); // Random twinkling speed
  }

  // Update method: Moves the star and resets its position if it goes out of bounds
  update() {
    this.xPos += random(-0.5, 0.5); // Adding a bit of randomness to X position
    this.yPos += random(-0.5, 0.5); // Adding a bit of randomness to Y position
    this.zPos -= speedSlider.value(); // Adjusting Z position based on slider value

    // Resetting the star's position if it goes out of bounds
    if (this.zPos < 1) {
      this.zPos = canvasSize; // Bringing the star back to the forefront
      this.xPos = random(-width, width); // Randomizing X position
      this.yPos = random(-height, height); // Randomizing Y position
      this.prevXPos = this.xPos; // Updating previous X position
      this.prevYPos = this.yPos; // Updating previous Y position
      this.prevZPos = this.zPos; // Updating previous Z position
      this.brightness = random(50, 150); // Randomizing brightness for a fresh twinkle
      this.twinkleSpeed = random(0.001, 0.01); // Randomizing twinkling speed
    }
  }

  // Display method: Draws the star on the canvas
  display() {
    this.twinkle(); // Adding some twinkling effect to our star

    // Mapping the star's 3D position to 2D screen coordinates
    let screenX = map(this.xPos / this.zPos, 0, 1, 0, width);
    let screenY = map(this.yPos / this.zPos, 0, 1, 0, height);
    let starGlow = map(this.zPos, 0, canvasSize, 2, 0); // Calculating the star's glow based on distance

    // Drawing the line representing the star on the canvas
    stroke(this.brightness); // Setting the stroke brightness
    strokeWeight(starGlow); // Setting the stroke weight for a glowing effect
    line(this.prevXPos, this.prevYPos, screenX, screenY); // Drawing the line from previous to current position
    
    // Updating the previous position for smooth motion
    this.prevXPos = screenX;
    this.prevYPos = screenY;
  }

  // Twinkle method: Adds twinkling effect to the stars
  twinkle() {
    this.brightness += random(-this.twinkleSpeed, this.twinkleSpeed); // Simulating twinkling effect
    this.brightness = constrain(this.brightness, 150, 250); // Constraining brightness within a range
  }
}

// Draw a gradient background for the sky
function drawSkyGradient() {
  noFill(); // No filling for gradient
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1); // Mapping the gradient color
    let gradientColor = lerpColor(color(0, 0, 20), color(0, 0, 0), inter); // Linearly interpolating between two colors
    stroke(gradientColor); // Setting stroke color
    line(0, i, width, i); // Drawing a line to create gradient effect
  }
}
