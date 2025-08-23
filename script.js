// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Toggle Nav Links on Mobile and Tablet
function toggleNav() {
  const navLinks = document.querySelector("#desktop-nav .nav-links");
  const navButton = document.querySelector(".nav-toggle-btn");
  const isOpen = navLinks.classList.contains("open");

  if (window.innerWidth <= 1200) { // Tablet and below
    if (isOpen) {
      navLinks.classList.remove("open");
      navLinks.classList.add("closing");
      navButton.classList.remove("open");
      navButton.classList.add("closing");
      setTimeout(() => {
        navLinks.classList.remove("closing");
        navButton.classList.remove("closing");
        if (window.innerWidth <= 600) {
          navLinks.style.display = "none"; // Mobile
        }
      }, 500);
    } else {
      navLinks.classList.add("open");
      navLinks.style.display = "flex"; // Ensure visibility on tablet/mobile
      navButton.classList.add("open");
    }
  }
}

// Sequential Animation for Nav Links on Page Load
window.addEventListener("load", () => {
  const navLinks = document.querySelectorAll("#desktop-nav .nav-links a");
  navLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.add("animate-on-load");
    }, index * 300); // 300ms delay between each link
  });
});

// Handle Nav Links Click and Animation
document.querySelectorAll("#desktop-nav .nav-links a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent immediate navigation
    const navLinks = document.querySelector("#desktop-nav .nav-links");
    const navButton = document.querySelector(".nav-toggle-btn");
    link.classList.add("clicked");

    setTimeout(() => {
      link.classList.remove("clicked");
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navLinks.classList.add("closing");
        if (navButton) {
          navButton.classList.remove("open");
          navButton.classList.add("closing");
        }
        setTimeout(() => {
          navLinks.classList.remove("closing");
          if (navButton) navButton.classList.remove("closing");
          if (window.innerWidth <= 600) {
            navLinks.style.display = "none"; // Mobile
          }
          // Navigate after animation
          window.location.href = link.getAttribute("href");
        }, 500);
      } else {
        // Navigate immediately if no animation needed
        window.location.href = link.getAttribute("href");
      }
    }, 800); // Match animation duration
  });

  // Add split animation on hover
  link.addEventListener("mouseenter", () => {
    link.classList.add("hovered");
  });
});

/* wordanimation start */






const words = ["Game Programmer ",' Applcation Developer ', "Level Designer  "];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");
const typingSpeed = 60;
const deletingSpeed = 30;
const pauseBetween = 1200;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    typewriterElement.textContent = currentWord.substring(0, charIndex);
    charIndex++;
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(type, pauseBetween);
    } else {
      setTimeout(type, typingSpeed);
    }
  } else {
    typewriterElement.textContent = currentWord.substring(0, charIndex);
    charIndex--;
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(type, deletingSpeed);
    }
  }
  typewriterElement.classList.toggle("empty", typewriterElement.textContent === "");
}

type();

window.addEventListener("load", () => {
  typeWriter();
});
/* wordanimation end */

// Overlay Functions
function openNewOverlay(title, description, videoSrc, backgroundImage) {
  const overlay = document.getElementById("new-overlay");
  const expandFadeImage = document.createElement("img");

  expandFadeImage.src = backgroundImage;
  expandFadeImage.className = "expand-fade-image";
  document.body.appendChild(expandFadeImage);
  document.body.classList.add("no-scroll"); // Prevent background scrolling

  setTimeout(() => {
    expandFadeImage.classList.add("expanded");
    setTimeout(() => {
      document.body.removeChild(expandFadeImage);
      overlay.style.display = "flex";
      document.getElementById("new-overlay-title").innerText = title;
      document.getElementById("new-overlay-description").innerHTML = description;

      const videoElement = document.getElementById("new-overlay-video");
      const sourceElement = document.getElementById("new-video-source");
      if (videoSrc) {
        sourceElement.src = videoSrc;
        videoElement.style.display = "block";
        videoElement.load();
        videoElement.play();
      } else {
        videoElement.style.display = "none";
      }
    }, 700);
  }, 100);
}

function closeNewOverlay(event) {
  const videoElement = document.getElementById("new-overlay-video");
  videoElement.pause();
  videoElement.currentTime = 0;
  document.getElementById("new-overlay").style.display = "none";
  document.body.classList.remove("no-scroll"); // Re-enable background scrolling
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const videoSource = document.getElementById("new-video-source");
    if (videoSource && !videoSource.src) {
      videoSource.src = videoSource.getAttribute("data-src");
      const videoElement = document.getElementById("new-overlay-video");
      videoElement.style.display = "block";
      videoElement.load();
    }
  }, 1000);
});

// On Load Animations
function triggerOnLoadAnimations() {
  const elements = document.querySelectorAll(".animate-on-load");
  elements.forEach((element) => {
    element.classList.add("in-view");
  });
}

window.addEventListener("load", triggerOnLoadAnimations);

// Section Navigation with Smoother, Slower Scrolling
function showSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const desktopNav = document.getElementById("desktop-nav");
    const hamburgerNav = document.getElementById("hamburger-nav");
    const navHeight = desktopNav.offsetHeight || hamburgerNav.offsetHeight || 0;

    if (sectionId === "contact") {
      setTimeout(() => {
        const scrollTarget = document.documentElement.scrollHeight * 1.1; // Scroll to 110%
        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
          duration: 1200
        });
        // Ensure full scroll completion
        setTimeout(() => {
          if (Math.abs(window.scrollY - scrollTarget) > 10) {
            window.scrollTo({ top: scrollTarget, behavior: "smooth" });
          }
        }, 1300);
      }, 100);
    } else {
      setTimeout(() => {
        const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
          duration: 1200
        });
      }, 100);
    }
  } else {
    console.error(`Section with ID ${sectionId} not found.`);
  }
}

window.addEventListener("load", () => {
  const profileSection = document.getElementById("profile");
  if (profileSection) {
    profileSection.parentElement.style.display = "flex";
  }
  // Ensure nav links are clickable on mobile
  const navLinks = document.querySelector("#desktop-nav .nav-links");
  if (window.innerWidth <= 600) {
    navLinks.style.display = "none"; // Hidden by default
  }
});

// Scroll Reveal Animation
function applyScrollReveal() {
  const elements = document.querySelectorAll(".scroll-reveal");

  function handleScroll() {
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < windowHeight && rect.bottom > 0;

      if (isVisible && !element.classList.contains("reveal")) {
        element.classList.add("reveal");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  handleScroll();
}

window.addEventListener("load", applyScrollReveal);

// Last Image Scroll Effect
function handleLastImageScroll() {
  const lastImage = document.getElementById("last-image-container");
  let isElastic = false;
  let timeout;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 10) {
      clearTimeout(timeout);
      lastImage.classList.add("elastic");
      isElastic = true;
      timeout = setTimeout(() => {
        if (isElastic) {
          lastImage.classList.remove("elastic");
          lastImage.classList.add("hidden");
          isElastic = false;
        }
      }, 1000);
    } else {
      lastImage.classList.remove("elastic");
      lastImage.classList.add("hidden");
      isElastic = false;
    }
  });
}

window.addEventListener("load", handleLastImageScroll);

// Elastic Image Effect
function handleElasticImage() {
  const elasticImage = document.getElementById("elastic-image-container");
  const contactSection = document.getElementById("contact");
  let isVisible = false;
  let lastScrollTop = 0;
  let scrollTimeout = null;
  let isExpanded = false;

  function showElasticImage() {
    if (!isVisible) {
      elasticImage.classList.remove("closing");
      elasticImage.classList.add("visible");
      isVisible = true;
    }
  }

  function hideElasticImage() {
    if (isVisible) {
      elasticImage.classList.remove("expanded", "contracted");
      elasticImage.classList.add("closing");
      isVisible = false;
      setTimeout(() => {
        elasticImage.classList.remove("visible", "closing");
      }, 800);
    }
  }

  function expandElasticImage() {
    if (isVisible && !isExpanded) {
      elasticImage.classList.remove("contracted");
      elasticImage.classList.add("expanded");
      isExpanded = true;
    }
  }

  function contractElasticImage() {
    if (isVisible && isExpanded) {
      elasticImage.classList.remove("expanded");
      elasticImage.classList.add("contracted");
      isExpanded = false;
    }
  }

  function isContactSectionInView() {
    const rect = contactSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return rect.top < windowHeight && rect.bottom > 0;
  }

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollPosition = scrollTop + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const direction = scrollTop > lastScrollTop ? "down" : "up";
    const isAtBottom = Math.abs(scrollPosition - documentHeight) < 5;

    clearTimeout(scrollTimeout);

    if (isAtBottom && isContactSectionInView()) {
      showElasticImage();
      if (direction === "down") {
        expandElasticImage();
      }
    } else {
      if (isVisible && !isExpanded) {
        hideElasticImage();
      }
    }

    scrollTimeout = setTimeout(() => {
      if (isAtBottom && isVisible) {
        contractElasticImage();
      }
    }, 150);

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("wheel", handleScroll);
}

window.addEventListener("load", handleElasticImage);

// Popup Image Effect
function handlePopupImage() {
  const popupImage = document.getElementById("popup-image");
  let isVisible = false;

  function showPopupImage() {
    if (!isVisible) {
      popupImage.classList.remove("hiding");
      popupImage.classList.add("visible");
      isVisible = true;
    }
  }

  function hidePopupImage() {
    if (isVisible) {
      popupImage.classList.remove("visible");
      popupImage.classList.add("hiding");
      setTimeout(() => {
        popupImage.classList.remove("hiding");
        isVisible = false;
      }, 500); // Match animation duration
    }
  }

  function checkScrollPosition() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;

    if (scrollPercentage >= 95) {
      showPopupImage();
    } else if (isVisible && scrollPercentage < 93) {
      hidePopupImage();
    }
  }

  window.addEventListener("scroll", checkScrollPosition);
  window.addEventListener("resize", checkScrollPosition);
}

window.addEventListener("load", handlePopupImage);

// Scroll to Top on Load/Refresh
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  if (window.innerWidth <= 1200 && window.innerWidth > 600) {
    const navLinks = document.querySelector("#desktop-nav .nav-links");
    navLinks.style.display = "flex"; // Ensure tablet nav is visible on load
  }
});