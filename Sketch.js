// (｡♥‿♥｡) Ready to twinkle like a star in the night sky? Let's dive into the code together!

// Disables friendly errors system (FES)
p5.disableFriendlyErrors = true;

// Global constants
const canvasSize = 700; // The size of our beautiful canvas
const totalStars = 6; // The number of stars twinkling in our sky
const defaultStarSpeed = 60; // The default speed of our stars

let stars = []; // An array to hold all our twinkling stars
let speedSlider; // A slider to control the speed of the stars

// Setup function: Initializes the canvas and stars
function setup() {
  createCanvas(canvasSize, canvasSize); // Creating our canvas, yay!

  // Creating a slider to control star speed
  speedSlider = createSlider(1, defaultStarSpeed, defaultStarSpeed / 5, 0); // Slider settings
  speedSlider.position(10, 10); // Positioning the slider
  speedSlider.size(canvasSize - 25); // Adjusting its size to fit the canvas

  // Let's create some stars and add them to our array
  for (let i = 0; i < canvasSize * totalStars; i++) {
    stars.push(new Star()); // Creating a new star and adding it to our twinkling array
  }
}

// Draw function: Renders the stars and updates their positions
function draw() {
  setGradient(0, 0, width, height, color(0, 0, 20), color(0, 0, 0)); // Creating a beautiful night sky gradient
  translate(width / 2, height / 2); // Translating the origin to the center of the canvas

  // Updating and displaying each twinkling star
  for (let i = 0; i < canvasSize * totalStars; i++) {
    stars[i].update(); // Updating the position of the star
    stars[i].display(); // Displaying the star on the canvas
  }
}

// Star class: Represents a star in the animation
class Star {
  constructor() {
    // Initializing the star's position and other properties
    this.x = random(-width, width); // Random X position within the canvas
    this.y = random(-height, height); // Random Y position within the canvas
    this.z = random(canvasSize); // Random Z position within the canvas
    this.prevX = this.x; // Previous X position for smooth motion
    this.prevY = this.y; // Previous Y position for smooth motion
    this.prevZ = this.z; // Previous Z position for smooth motion
    this.starBrightness = random(150, 250); // Random brightness for our twinkling star
  }

  // Update method: Moves the star and resets its position if it goes out of bounds
  update() {
    this.x += random(-0.5, 0.5); // Adding a bit of randomness to X position
    this.y += random(-0.5, 0.5); // Adding a bit of randomness to Y position
    this.z -= speedSlider.value(); // Adjusting Z position based on slider value

    // Resetting the star's position if it goes out of bounds
    if (this.z < 1) {
      this.z = canvasSize; // Bringing the star back to the forefront
      this.x = random(-width, width); // Randomizing X position
      this.y = random(-height, height); // Randomizing Y position
      this.prevX = this.x; // Updating previous X position
      this.prevY = this.y; // Updating previous Y position
      this.prevZ = this.z; // Updating previous Z position
      this.starBrightness = random(50, 150); // Randomizing brightness for a fresh twinkle
    }
  }

  // Display method: Draws the star on the canvas
  display() {
    this.twinkle(); // Adding some twinkling effect to our star

    // Mapping the star's 3D position to 2D screen coordinates
    let screenX = map(this.x / this.z, 0, 1, 0, width);
    let screenY = map(this.y / this.z, 0, 1, 0, height);
    let starGlow = map(this.z, 0, canvasSize, 2, 0); // Calculating the star's glow based on distance

    // Drawing the line representing the star on the canvas
    stroke(this.starBrightness); // Setting the stroke brightness
    strokeWeight(starGlow); // Setting the stroke weight for a glowing effect
    line(this.prevX, this.prevY, screenX, screenY); // Drawing the line from previous to current position

    // Updating the previous position for smooth motion
    this.prevX = screenX;
    this.prevY = screenY;
  }

  // Twinkle method: Adds twinkling effect to the stars
  twinkle() {
    if (random() > 0.99) { // Adjust the probability for twinkling effect
      this.starBrightness = random(150, 250); // Randomize the brightness for twinkling
    }
  }
}

// Set Gradient function: Draws a gradient background
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill(); // No filling for gradient
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1); // Mapping the gradient color
    let c = lerpColor(c1, c2, inter); // Linearly interpolating between two colors
    stroke(c); // Setting stroke color
    line(x, i, x + w, i); // Drawing a line to create gradient effect
  }
}
