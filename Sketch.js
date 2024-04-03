"use strict";

p5.disableFriendlyErrors = true; // disables FES

// Global Constants
const canvasSize = Math.min(screen.width, screen.height) * 0.675; // The size of the canvas where stars will be displayed
const totalStars = 8; // The total number of stars to be generated
const defaultStarSpeed = 60; // The default speed at which stars move

// Array to store instances of the Star class
let stars = [];

// Slider variable for controlling star speed
let speedSlider;

// Setup function to initialize the sketch
function setup() {
  createCanvas(canvasSize, canvasSize); // Create a canvas of specified size

  // Create a slider for controlling star speed
  speedSlider = createSlider(1, defaultStarSpeed, defaultStarSpeed / 2, 0);
  speedSlider.position(10, 10);
  speedSlider.size(canvasSize - 25);

  // Initialize the stars array with instances of the Star class
  for (let i = 0; i < (canvasSize * totalStars); i++) {
    stars.push(new Star());
  }
}

// Draw function to update and display the stars
function draw() {
  background(8, 18, 27); // Set background color to black
  translate(width / 2, height / 2);

  // Update and display each star in the stars array
  for (let i = 0; i < (canvasSize * totalStars); i++) {
    stars[i].update(); // Update star properties
    stars[i].display(); // Display the star
  }
}

// Star class definition
class Star {
  constructor() {
    // Set initial position of the star randomly within canvas bounds
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(canvasSize); // Depth 
    this.prevX = this.x;
    this.prevY = this.y;
    this.prevZ = this.z;
  }

  // Update star properties 
  update() {
    // Move the star along the z-axis (depth) based on the speed slider value
    this.z -= speedSlider.value();

    // If the star moves behind the viewer, reset its position
    if (this.z < 1) {
      this.z = canvasSize;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.prevX = this.x;
      this.prevY = this.y;
      this.prevZ = this.z;
    }
  }

  // Display the star
  display() {
    // Calculate the screen position of the star
    let screenX = map(this.x / this.z, 0, 1, 0, width);
    let screenY = map(this.y / this.z, 0, 1, 0, height);
    let starGlow = map(this.z, 0, canvasSize, 2, 0);

    // Draw a line connecting the previous position to the current position to simulate motion
    stroke(255);
    strokeWeight(starGlow);
    line(this.prevX, this.prevY, screenX, screenY);

    // Update the previous position to be the current position for the next frame
    this.prevX = screenX;
    this.prevY = screenY;
  }
}
