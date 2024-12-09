// Image sources
const imageSources = [
  "images/image1.jpeg",
  "images/image2.jpg",
  "images/image3.jpeg",
  "images/image4.jpg",
  "images/image5.jpeg",
  "images/image6.jpeg",
  "images/image7.jpeg",
  "images/image8.jpeg"
];

// Image container
const container = document.getElementById("image-container");

// Track the current highest z-index
let highestZIndex = 100;

// Track the last image displayed
let lastImage = null;

// Time in milliseconds before hiding the image when idle
const IDLE_TIME = 800; // 1 second

// Timer to detect idle state
let idleTimer;

// Function to get a random image source
function getRandomImageSource() {
  return imageSources[Math.floor(Math.random() * imageSources.length)];
}

// Function to create and position a single image
function createImage(x, y) {
  const LEFT_MARGIN = 20;
  // Remove the previous image if it exists
  if (lastImage) {
    hideImage(lastImage);
  }

  // Create a new image element
  const img = document.createElement("img");
  img.src = getRandomImageSource();
  
  // Set image position and z-index to ensure it's on top
  img.style.left = `${x + LEFT_MARGIN}px`;
  img.style.top = `${y}px`;
  img.style.zIndex = ++highestZIndex; // Increment z-index

  // Append the image to the container
  container.appendChild(img);

  // Store the current image as the last one displayed
  lastImage = img;

  // Show the image with a smooth grow effect
  setTimeout(() => {
    img.classList.add("visible");
  }, 40); // Slight delay for smooth appearance
}

// Function to hide an image
function hideImage(img) {
  img.classList.remove("visible");
  setTimeout(() => img.remove(), 400); // Remove after fade-out
}

// Function to hide the last image
function hideLastImage() {
  if (lastImage) {
    hideImage(lastImage);
    lastImage = null;
  }
}

// Event listener to track mouse movement and add a single image near the cursor
document.addEventListener("mousemove", (event) => {
  const { clientX: x, clientY: y } = event;

  // Create and display a single image near the cursor
  createImage(x, y);

  // Reset idle timer whenever the mouse moves
  clearTimeout(idleTimer);

  // After IDLE_TIME (e.g., 1 second of inactivity), hide the last image
  idleTimer = setTimeout(hideLastImage, IDLE_TIME);
});
