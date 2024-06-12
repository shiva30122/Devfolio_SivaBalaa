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


