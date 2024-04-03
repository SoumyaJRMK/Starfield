// Kawaii Night Sky with Colorful Stars and Particle Trails 🌟✨🎨

// Disabling Friendly Errors System (FES) to keep things smooth and cute! (*＾▽＾)／
p5.disableFriendlyErrors = true;

// Global Constants for our adorable night sky~ (≧◡≦)
const canvasSize = 700; // The size of our beautiful canvas
const totalMainStars = 5; // The number of main twinkling stars
const defaultStarSpeed = 40; // The default speed of our stars

// An array to hold our main twinkling stars
let mainStars = [];

// A slider to control the speed of the stars
let speedSlider;

// Setup Function: Initializes the canvas and stars
function setup() {
  createCanvas(canvasSize, canvasSize); // Creating our canvas
  
  // Creating main twinkling stars and adding them to our array
  for (let i = 0; i < canvasSize * totalMainStars; i++) {
    mainStars.push(new Star()); // Creating a new star and adding it to our twinkling array
  }
  
  // Creating a slider to control star speed
  speedSlider = createSlider(5, defaultStarSpeed, defaultStarSpeed / 2, 0); // Slider settings
  speedSlider.position(10, 10); // Positioning the slider adorably
  speedSlider.size(canvasSize - 25); // Adjusting its size to fit the canvas adorably
}
// Draw Function: Renders the stars and updates their positions
function draw() {
  drawSkyGradient(); // Creating a beautiful night sky gradient
  
  translate(width / 2, height / 2); // Translating the origin to the center of the canvas adorably
  
  // Updating and displaying main twinkling stars
  for (let i = 0; i < canvasSize * totalMainStars; i++) {
    mainStars[i].update(); // Updating the position of the star
    mainStars[i].display(); // Displaying the star on the canvas
  }
}
// Draw a Gradient Background for the Sky
function drawSkyGradient() {
  noFill(); // No filling for gradient
  
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1); // Mapping the gradient color
    let gradientColor = lerpColor(color(0, 0, 20), color(0, 0, 0), inter); // Linearly interpolating between two colors
    stroke(gradientColor); // Setting stroke color
    line(0, i, width, i); // Drawing a line to create gradient effect
  }
}
// Star Class: Represents a main twinkling star in the animation
class Star {
  constructor() {
    // Initializing the star's position and other properties
    this.xPos = random(-width, width); // Random X position within the canvas
    this.yPos = random(-height, height); // Random Y position within the canvas
    this.zPos = random(canvasSize); // Random Z position within the canvas
    this.prevXPos = this.xPos; // Previous X position for smooth motion
    this.prevYPos = this.yPos; // Previous Y position for smooth motion
    this.speed = random(2, 4); // Random speed for parallax effect
    this.size = random(0, 1); // Random size for star variation
    this.color = color(random(200, 255), random(200, 255), random(200, 255)); // Random color for the star
    this.prevPositions = []; // Array to store previous positions for particle trails
    this.trailLength = random(5, 10); // Random length of particle trail
  }
  // Update Method: Moves the star and resets its position if it goes out of bounds
  update() {
    let speedFactor = map(this.zPos, 0, canvasSize, 0.1, 1);
    this.xPos += random(-0.5, 0.5) * this.speed * speedFactor; // Adding a bit of randomness to X position
    this.yPos += random(-0.5, 0.5) * this.speed * speedFactor; // Adding a bit of randomness to Y position
    this.zPos -= speedSlider.value(); // Adjusting Z position based on slider value
    
    // Resetting the star's position if it goes out of bounds
    if (this.zPos < 1) {
      this.zPos = canvasSize; // Bringing the star back to the forefront
      this.xPos = random(-width, width); // Randomizing X position
      this.yPos = random(-height, height); // Randomizing Y position
      this.prevXPos = this.xPos; // Updating previous X position
      this.prevYPos = this.yPos; // Updating previous Y position
      this.size = random(0, 1); // Random size for star variation
      this.color = color(random(200, 250), random(200, 250), random(200, 250)); // Randomizing color for a fresh star
    }
  }
  // Display Method: Draws the star on the canvas adorably
  display() {
    // Set the stroke color to the star's color
    strokeWeight(this.size); // Adjusting stroke weight based on star size
    stroke(this.color); // Setting stroke color based on brightness
    
    // Draw particle trails by connecting current and previous positions with a line
    for (let i = 1; i <= this.trailLength; i++) {
      let prevIndex = constrain(i * 2, 0, this.trailLength * 2);
      let prevX = this.prevPositions[prevIndex];
      let prevY = this.prevPositions[prevIndex + 1];
      line(prevX, prevY, this.xPos, this.yPos);
    }
    
    // Mapping the star's 3D position to 2D screen coordinates
    let screenX = map(this.xPos / this.zPos, 0, 1, 0, width);
    let screenY = map(this.yPos / this.zPos, 0, 1, 0, height);
    let starGlow = map(this.zPos, 0, canvasSize, 2, 0); // Calculating the star's glow based on distance
    
    // Drawing the line representing the star on the canvas adorably
    strokeWeight(starGlow); // Setting the stroke weight for a glowing effect
    line(this.prevXPos, this.prevYPos, screenX, screenY); // Drawing the line from previous to current position
    
    // Updating the previous position for smooth motion
    this.prevXPos = screenX;
    this.prevYPos = screenY;
  }
}
