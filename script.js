function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const words = ["  GAME DEVELOPER  ","SOFTWARE DEVELOPER"];
let currentIndex = 0;

function changeWord() {
    const wordElement = document.getElementById("changing-word");
    wordElement.textContent = words[ currentIndex ];
    currentIndex = (currentIndex + 1) % words.length;
}

// Initial word set
changeWord();

// Change word every 2 seconds to match the CSS animation timing
setInterval(changeWord, 2000);


// Function to open the new overlay and set content
function openNewOverlay(title, description, videoSrc) {
  // Set overlay content
  document.getElementById("new-overlay-title").innerText = title;
  document.getElementById("new-overlay-description").innerHTML = description; // Use innerHTML here

  // Set video source and show it if available
  const videoElement = document.getElementById("new-overlay-video");
  const sourceElement = document.getElementById("new-video-source");

  // If videoSrc is provided, load it
  if (videoSrc) {
      sourceElement.src = videoSrc; // Set the video source
      videoElement.style.display = 'block'; // Make the video visible
      videoElement.load(); // Load the video
      videoElement.muted = false; // Play Audio !... the video to allow autoplay
      videoElement.play(); // Play the video
  } else {
      videoElement.style.display = 'none'; // Hide video if no source is provided
  }

  // Show the overlay
  document.getElementById('new-overlay').style.display = 'flex'; // Show the overlay
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close the overlay and stop the video
function closeNewOverlay() {
  const videoElement = document.getElementById("new-overlay-video");
  videoElement.pause(); // Stop the video
  videoElement.currentTime = 0; // Reset video to start
  document.getElementById("new-overlay").style.display = "none"; // Hide the overlay
  document.body.style.overflow = 'auto'; // Enable background scrolling
}

// Close the overlay when clicking outside of it
function closeOverlay(event) {
  if (event.target.id === "new-overlay") {
      closeNewOverlay();
  }
}


window.addEventListener('load', function() {
  // Delay video loading after the page has loaded
  setTimeout(() => {
      const videoSource = document.getElementById('new-video-source');

      // Check if the video source is set and load it if not already done
      if (videoSource && !videoSource.src) {
          // Set the src attribute to the data-src value
          videoSource.src = videoSource.getAttribute('data-src');
          
          // Show the video element
          const videoElement = document.getElementById('new-overlay-video');
          videoElement.style.display = 'block'; // Make it visible
          
          // Load the video
          videoElement.load();
      }
  }, 1000); // Adjust the delay time as needed (1000ms = 1 second)
});

