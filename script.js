// ===============================================
// 1. HAMBURGER MENU TOGGLE (Mobile)
// ===============================================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ===============================================
// 2. TABLET NAV TOGGLE (≤1200px)
// ===============================================
function toggleNav() {
  const navLinks = document.querySelector("#desktop-nav .nav-links");
  const navButton = document.querySelector(".nav-toggle-btn");
  const isOpen = navLinks.classList.contains("open");

  if (window.innerWidth <= 1200) {
    if (isOpen) {
      navLinks.classList.remove("open");
      navLinks.classList.add("closing");
      navButton.classList.remove("open");
      navButton.classList.add("closing");
      setTimeout(() => {
        navLinks.classList.remove("closing");
        navButton.classList.remove("closing");
        if (window.innerWidth <= 600) {
          navLinks.style.display = "none";
        }
      }, 500);
    } else {
      navLinks.classList.add("open");
      navLinks.style.display = "flex";
      navButton.classList.add("open");
    }
  }
}

// ===============================================
// 3. NAV LINKS ANIMATION ON PAGE LOAD
// ===============================================
window.addEventListener("load", () => {
  const navLinks = document.querySelectorAll("#desktop-nav .nav-links a");
  navLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.add("animate-on-load");
    }, index * 300);
  });
});




// ===============================================
// 4. NAV LINK CLICK – Animation + Navigation + HOVER
// ===============================================
document.querySelectorAll("#desktop-nav .nav-links a").forEach(link => {

  // HOVER IN
  link.addEventListener("mouseenter", () => {
    link.classList.add("hovered");
  });

  // HOVER OUT ← THIS WAS MISSING!
  link.addEventListener("mouseleave", () => {
    link.classList.remove("hovered");
  });

  // CLICK
  link.addEventListener("click", (e) => {
    e.preventDefault();
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
            navLinks.style.display = "none";
          }
          window.location.href = link.getAttribute("href");
        }, 500);
      } else {
        window.location.href = link.getAttribute("href");
      }
    }, 800);
  });
});



// ===============================================
// 5. TYPEWRITER ANIMATION
// ===============================================
const words = ["Game Programmer ", 'Application Developer ', "Level Designer  "];
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

// ===============================================
// 6. SAVE SCROLL POSITION (GLOBAL)
// ===============================================
let savedScrollPosition = 0;
let winAudio = new Audio('./assets/Audio/Win.mp3'); // GLOBAL WIN AUDIO
let isWinAudioPlaying = false;

// ===============================================
// PROJECT PHASES LOGIC
// ===============================================

const projects = {
  shopCalculator: {
    phases: [
      // PHASE 1
      {
        title: "ShopCalculator - Phase 1 : Prototype ",
        // You can have unique description for each phase
        description: `<h3>This project is a dynamic vegetable calculator specifically designed for Android shop applications, redeveloped from scratch to enhance efficiency and user experience.</h3><br>
<h4>Problem Statement:</h4><br> Manual calculation of vegetable quantities and prices in shop applications for Android devices is inefficient and prone to errors. VegCal addresses these challenges with an optimized solution tailored for mobile devices. The app is still in development and not yet available on the Google Play Store.<br><br>
<strong>Technologies Used:</strong> <br>  Android Studio , Kotlin , SQLite Database, AdMob , FireBase , Android SDK , Java JDK  <br><br>
<strong>Key Features:</strong><br>
- <strong>User-Friendly Design:</strong>   Completely revamped UI in Android Studio for improved accessibility and ease of use, tailored for shop owners and staff, with added minor adjustments for polished experience.<br>
- <strong>Efficient Backend:</strong>   Integrates an SQLite database for robust data management with real-time updates.<br>
- <strong>Optimized Performance:</strong>   Base APK optimized to under 5MB, ensuring lightweight and fast performance on Android devices.<br>
- <strong>Enhanced Functionality:</strong>   Improved logic for seamless pricing and quantity calculations, enhancing accuracy and efficiency.<br>
- <strong>Monetization and Authentication:</strong>   Implemented Google AdMob for banner ads and Google Authentication for secure user access. Interstitial ads, along with saving and retrieving functionalities, are still under development.<br><br>
This project reflects my commitment to creating efficient and user-centric solutions for both game and application development, leveraging my skills in Godot, Unity, and Android Studio development !. <br><br> I am eager to continue learning and take on more complex challenges in future projects !!... <br><br>`,
        // Unique video for this phase
        videoSrc: 'assets/Videos/Shop Calculator.mp4',
        backgroundImage: './assets/Images/Shopcalculator.png'
      },
      // PHASE 2 - UPDATED CONTENT EXAMPLE
      {
        title: "ShopCalculator - Phase 2 Final Product : Ads || Cloud Save || Import || Export || Monetization || Security Implementation",
        description: `<h3>Phase 2 marks the comprehensive upgrade of ShopCalculator into a production-ready utility, featuring advanced data management, security, and monetization.</h3><br>
<h4>Production Status:</h4><br>
The application has successfully completed its core development cycle and is currently in the <strong>Pre-Launch Stage</strong>, <br> readying for upload and release on the <strong>Google Play Store Under SharMi Inc ShopCalculator</strong>.<br><br>

<strong>Newly Implemented Features:</strong><br>
- <strong>Cloud Infrastructure:</strong> Integrated <strong>Cloud Save</strong> functionality to ensure data persistence and prevent loss of critical shop records.<br>
- <strong>Data Flexibility (Import/Export):</strong> Added robust <strong>Import & Export</strong> capabilities, allowing users to back up data locally or transfer it between devices seamlessly.<br>
- <strong>Monetization Ecosystem:</strong> Fully implemented <strong>Ads (Banner & Interstitial)</strong> using Google AdMob to establish a sustainable revenue model.<br>
- <strong>Security Enhancement:</strong> Deployed a complete <strong>Security Implementation</strong> to safeguard user data and ensure application integrity against unauthorized access.<br><br>
This phase solidifies ShopCalculator as a professional tool, bridging the gap between a prototype and a market-ready Android application.<br><br>
<h2 style="color: #1900ffff; text-align: center; font-weight: bold; text-shadow: 0 0 10px rgba(0, 81, 255, 0.5);">FINAL COMPLETED: DECEMBER 13, 2025</h2>`,
        videoSrc: 'assets/Videos/Shop Calculator Phase 2.mp4',
        backgroundImage: './assets/Images/Shopcalculator.png'
      },
      // PHASE 3 - LATEST

    ]
  }
  // TO ADD NEW PROJECT:
  // 1. Add key (e.g., 'newProject': { phases: [...] })
  // 2. Add phase objects with unique title, description, videoSrc.
};

let currentProjectKey = null;
let currentPhaseIndex = 0;

function openProject(projectKey, event) {
  if (projects[projectKey]) {
    currentProjectKey = projectKey;
    const projectData = projects[projectKey];
    // Default to latest phase (last one)
    currentPhaseIndex = projectData.phases.length - 1;

    updateProjectUI(true, event);
  } else {
    console.error("Project not found:", projectKey);
  }
}

function changePhase(delta) {
  if (!currentProjectKey || !projects[currentProjectKey]) return;

  const phases = projects[currentProjectKey].phases;
  const newIndex = currentPhaseIndex + delta;

  if (newIndex >= 0 && newIndex < phases.length) {
    currentPhaseIndex = newIndex;
    updateProjectUI(false);
  }
}

function updateProjectUI(isOpening, event) {
  const phase = projects[currentProjectKey].phases[currentPhaseIndex];
  const totalPhases = projects[currentProjectKey].phases.length;

  if (isOpening) {
    openNewOverlay(phase.title, phase.description, phase.videoSrc, phase.backgroundImage, event, true);
  } else {
    // Update Content without full reload
    document.getElementById("new-overlay-title").innerText = phase.title;
    document.getElementById("new-overlay-description").innerHTML = phase.description;
    document.getElementById("new-overlay-description").scrollTop = 0;

    // Update Video
    const videoElement = document.getElementById("new-overlay-video");
    const sourceElement = document.getElementById("new-video-source");

    if (phase.videoSrc) {
      // CHECK CACHE
      if (videoCache[phase.videoSrc]) {
        sourceElement.src = videoCache[phase.videoSrc];
      } else {
        // PLAY & CACHE
        sourceElement.src = phase.videoSrc;
        fetch(phase.videoSrc)
          .then(response => response.blob())
          .then(blob => {
            videoCache[phase.videoSrc] = URL.createObjectURL(blob);
          })
          .catch(err => console.error("Video cache failed:", err));
      }

      videoElement.style.display = "block";
      videoElement.load();
      videoElement.play();
    } else {
      videoElement.style.display = "none";
      videoElement.pause();
    }

    // Update buttons state
    updateNavButtons(totalPhases);
  }
}

function updateNavButtons(totalPhases) {
  const controlsContainer = document.getElementById("phase-controls");
  const indicator = document.getElementById("phase-indicator");
  const prevBtn = document.getElementById("prev-phase-btn");
  const nextBtn = document.getElementById("next-phase-btn");

  if (indicator && controlsContainer) {
    indicator.innerText = `Phase ${currentPhaseIndex + 1} / ${totalPhases}`;

    // Disable/Enable buttons
    prevBtn.disabled = currentPhaseIndex === 0;
    prevBtn.style.cursor = currentPhaseIndex === 0 ? "default" : "pointer";
    prevBtn.style.opacity = currentPhaseIndex === 0 ? "0.5" : "1";

    nextBtn.disabled = currentPhaseIndex === totalPhases - 1;
    nextBtn.style.cursor = currentPhaseIndex === totalPhases - 1 ? "default" : "pointer";
    nextBtn.style.opacity = currentPhaseIndex === totalPhases - 1 ? "0.5" : "1";
  }
}

// ===============================================
// 7. OPEN OVERLAY – FREEZE PAGE
// ===============================================
// CACHE OBJECT
const videoCache = {};

function openNewOverlay(title, description, videoSrc, backgroundImage, event, showNav = false) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // SAVE current position
  savedScrollPosition = window.scrollY;

  // FREEZE PAGE
  isOverlayOpen = true;
  document.documentElement.classList.add("no-scroll");  // <--- HTML
  document.body.classList.add("no-scroll");

  const overlay = document.getElementById("new-overlay");
  const expandFadeImage = document.createElement("img");

  expandFadeImage.src = backgroundImage;
  expandFadeImage.className = "expand-fade-image";
  document.body.appendChild(expandFadeImage);

  setTimeout(() => {
    expandFadeImage.classList.add("expanded");
    setTimeout(() => {
      document.body.removeChild(expandFadeImage);
      overlay.style.display = "flex";
      document.getElementById("new-overlay-title").innerText = title;
      document.getElementById("new-overlay-description").innerHTML = description;

      // Handle Phase Nav Visibility (Split Elements)
      const controlsContainer = document.getElementById("phase-controls");
      const indicator = document.getElementById("phase-indicator");

      if (controlsContainer && indicator) {
        controlsContainer.style.display = showNav ? "flex" : "none";
        indicator.style.display = showNav ? "block" : "none";

        if (showNav && typeof currentProjectKey !== 'undefined' && currentProjectKey) {
          const total = projects[currentProjectKey].phases.length;
          updateNavButtons(total);
        }
      }

      const videoElement = document.getElementById("new-overlay-video");
      const sourceElement = document.getElementById("new-video-source");

      if (videoSrc) {
        // CHECK CACHE
        if (videoCache[videoSrc]) {
          sourceElement.src = videoCache[videoSrc];
        } else {
          // PLAY & CACHE
          sourceElement.src = videoSrc;
          fetch(videoSrc)
            .then(response => response.blob())
            .then(blob => {
              videoCache[videoSrc] = URL.createObjectURL(blob);
            })
            .catch(err => console.error("Video cache failed:", err));
        }

        videoElement.style.display = "block";
        videoElement.load();
        videoElement.play();
      } else {
        videoElement.style.display = "none";
      }

      // Reset scroll position of the description
      document.getElementById("new-overlay-description").scrollTop = 0;
    }, 700);
  }, 100);
}

// ===============================================
// 8. CLOSE OVERLAY – UNFREEZE (NO JUMP BACK)
// ===============================================
function closeNewOverlay(event) {
  if (event) event.stopPropagation();

  isOverlayOpen = false;
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");

  // DO NOT SCROLL BACK — KEEP WHERE USER LEFT IT
  // window.scrollTo(0, savedScrollPosition);  // REMOVED

  const videoElement = document.getElementById("new-overlay-video");
  videoElement.pause();
  videoElement.currentTime = 0;
  document.getElementById("new-overlay").style.display = "none";
}

// ===============================================
// 9. LAZY LOAD VIDEO
// ===============================================
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

// ===============================================
// 10. ON-LOAD ANIMATIONS
// ===============================================
function triggerOnLoadAnimations() {
  const elements = document.querySelectorAll(".animate-on-load");
  elements.forEach((element) => {
    element.classList.add("in-view");
  });
}
window.addEventListener("load", triggerOnLoadAnimations);

// ===============================================
// 11. SMOOTH SECTION SCROLL (FIXED FOR FIRST CLICK)
// ===============================================
function showSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const desktopNav = document.getElementById("desktop-nav");
    const hamburgerNav = document.getElementById("hamburger-nav");
    const navHeight = desktopNav.offsetHeight || hamburgerNav.offsetHeight || 0;

    // Check if mobile menu is open
    const mobileMenuOpen = document.querySelector(".menu-links.open") !== null;


    if (sectionId === "contact") {
      const delay = mobileMenuOpen ? 600 : 150;
      // Audio: Win + Scroll Lock (ON CLICK ONLY)
      winAudio.currentTime = 0;
      winAudio.play().then(() => { isWinAudioPlaying = true; }).catch(e => console.log("Win audio play failed:", e));

      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll"); // Fix for some browsers

      setTimeout(() => {
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
      }, 4000);

      setTimeout(() => {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
          // Mobile: Force scroll to absolute bottom
          window.scrollTo({ top: 999999, behavior: "smooth" });
        } else {
          // Desktop: Scroll to exact bottom
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: maxScroll, behavior: "smooth" });
        }
      }, delay);
    } else {
      // MUCH MORE AGGRESSIVE SCROLL FIX
      const initialDelay = 500; // Increased from 150ms - give page more time to settle

      setTimeout(() => {
        // Force a reflow to ensure all content has rendered
        void document.body.offsetHeight;

        const calculateAndScroll = () => {
          // Calculate target position
          const rect = targetSection.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY - navHeight + 60; // Added 2 <br> spacing

          // Smooth scroll to calculated position
          window.scrollTo({ top: sectionTop, behavior: "smooth" });

          // FIRST RECALCULATION - after smooth scroll starts (400ms)
          setTimeout(() => {
            const rect1 = targetSection.getBoundingClientRect();
            const correctedTop1 = rect1.top + window.scrollY - navHeight + 60; // Added 2 <br> spacing

            // Adjust if off by more than 30px
            if (Math.abs(window.scrollY - correctedTop1) > 30) {
              window.scrollTo({ top: correctedTop1, behavior: "smooth" });
            }
          }, 400);

          // SECOND RECALCULATION - after scroll completes (1200ms total)
          setTimeout(() => {
            const rect2 = targetSection.getBoundingClientRect();
            const finalTop = rect2.top + window.scrollY - navHeight + 60; // Added 2 <br> spacing

            // Final adjustment if still significantly off
            if (Math.abs(window.scrollY - finalTop) > 30) {
              window.scrollTo({ top: finalTop, behavior: "smooth" });
            }
          }, 1200);
        };

        calculateAndScroll();
      }, initialDelay);
    }
  }
}

window.addEventListener("load", () => {
  const profileSection = document.getElementById("profile");
  if (profileSection) {
    profileSection.parentElement.style.display = "flex";
  }
  if (window.innerWidth <= 600) {
    const navLinks = document.querySelector("#desktop-nav .nav-links");
    navLinks.style.display = "none";
  }
});

// ===============================================
// 12. SCROLL REVEAL
// ===============================================
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

// ===============================================
// 13. ELASTIC IMAGE (LARGE AT 100%)
// ===============================================
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

// ===============================================
// 14. POPUP IMAGE (SMALL AT 95%)
// ===============================================
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
      }, 500);
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

// ===============================================
// 15. SCROLL TO TOP ON REFRESH
// ===============================================
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  if (window.innerWidth <= 1200 && window.innerWidth > 600) {
    const navLinks = document.querySelector("#desktop-nav .nav-links");
    navLinks.style.display = "flex";
  }
});

// ===============================================
// 16. AUTO-SCROLL TO BOTTOM WHEN CONTACT 30% VISIBLE + AUDIO
// ===============================================
let hasAutoScrolled = false;

function checkContactVisibility() {
  const contactSection = document.getElementById("contact");
  if (!contactSection) return;

  const rect = contactSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Calculate how much of the contact section is visible
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const sectionHeight = rect.height;
  const visibilityPercentage = (visibleHeight / sectionHeight) * 100;

  // 1. PLAY WIN SOUND IF >= 30% VISIBLE
  if (visibilityPercentage >= 30) {
    if (!isWinAudioPlaying) {
      winAudio.play().then(() => { isWinAudioPlaying = true; }).catch(e => console.log("Win audio play failed (scroll):", e));
    }

    // Auto-scroll logic (keep existing)
    if (!hasAutoScrolled) {
      hasAutoScrolled = true;
      // logic for auto scroll if needed, or maybe user just wants sound?
      // keeping original behavior for auto-scroll just in case:
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        window.scrollTo({ top: 999999, behavior: "smooth" });
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: maxScroll, behavior: "smooth" });
      }
    }
  }
  // 2. STOP WIN SOUND IF < 30% VISIBLE
  else {
    if (isWinAudioPlaying) {
      winAudio.pause();
      winAudio.currentTime = 0;
      isWinAudioPlaying = false;
    }
  }
}

window.addEventListener("scroll", checkContactVisibility);
window.addEventListener("resize", checkContactVisibility);










// === FIXED: LAZY + CACHE + PLAY ASAP + POSTER ON TOP (index -1) ===
// Paste at end of <body> or in your JS file

(function () {
  const video = document.getElementById('intro-video');
  if (!video) return;

  const src = './assets/Videos/Intro.mov';
  const posterUrl = './assets/Videos/intro-poster.jpg'; // <120 KB

  // 1. Insert poster (FAST LOAD, ON TOP)
  const poster = document.createElement('img');
  poster.src = posterUrl;
  poster.className = 'intro-video';
  poster.style.cssText = `
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    z-index: -1; /* BACK LAYER */
  `;
  video.parentElement.style.position = 'relative';
  video.parentElement.insertBefore(poster, video);

  // 2. Hide video initially (will appear later)
  video.style.display = 'none';
  video.style.cssText = `
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    z-index: 0;
  `;
  video.preload = 'none';
  video.removeAttribute('autoplay');

  // 3. Start download IMMEDIATELY after page load
  function startVideoLoad() {
    const source = video.querySelector('source');
    if (!source.src) {
      source.src = src;
      video.load(); // Start download NOW
    }

    // 4. PLAY AS SOON AS ENOUGH DATA — then show video
    const tryPlay = () => {
      video.play().then(() => {
        // Video started → hide poster, show video
        poster.style.opacity = '0';
        setTimeout(() => poster.remove(), 300); // smooth fade
        video.style.display = 'block';
      }).catch(() => {
        // Not ready → try again soon
        setTimeout(tryPlay, 100);
      });
    };

    // Listen for first playable moment
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });
    tryPlay(); // Try right away
  }

  // 5. Sound on tap
  video.addEventListener('click', () => {
    video.muted = !video.muted;
  });

  // 6. Start after page load (DELAYED to prioritize images)
  const initVideo = () => {
    // Wait a bit to let images fetch first
    setTimeout(startVideoLoad, 2500);
  };

  if (document.readyState === 'complete') {
    initVideo();
  } else {
    window.addEventListener('load', initVideo);
  }
})();

// ===============================================
// 16. HANDLE BLUR LOAD IMAGES
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  const blurredImages = document.querySelectorAll(".blur-load");
  blurredImages.forEach(img => {
    function loaded() {
      img.classList.add("loaded");
    }
    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  });
});





/* VIDEO: MUTE ON START → TAP TO ENABLE SOUND → PLAY ONLY IF 30%+ VISIBLE */
/* VIDEO: MUTE ON START → TAP TO ENABLE SOUND → PLAY ONLY IF 30%+ VISIBLE */
(() => {
  const video = document.getElementById('intro-video');
  const soundBtn = document.getElementById('sound-btn');
  const soundIconOff = document.getElementById('sound-icon-off');
  const soundIconOn = document.getElementById('sound-icon-on');
  const soundText = document.getElementById('sound-text');

  if (!video) return;

  const container = document.querySelector('.StartingAnimationContainer');
  if (!container) return;

  let soundEnabled = false; // Tracks if initial interaction occurred
  let isVisible = false;

  // FADE OUT TEXT
  setTimeout(() => {
    if (soundText) soundText.classList.add('hidden');
  }, 7000);

  // UPDATE UI
  const updateUI = () => {
    if (video.muted) {
      if (soundIconOff) soundIconOff.style.display = 'none';
      if (soundIconOn) soundIconOn.style.display = 'block';
    } else {
      if (soundIconOff) soundIconOff.style.display = 'block';
      if (soundIconOn) soundIconOn.style.display = 'none';
    }
  };

  // CENTRAL PLAY CONTROL
  const updatePlayback = () => {
    const shouldPlay = isVisible && !document.hidden;

    if (soundEnabled) {
      // INTERACTED: Just play (mute state handled by video element)
      if (shouldPlay && video.paused) {
        video.play().catch(() => { });
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    } else {
      // NOT INTERACTED: Force muted autoplay
      if (shouldPlay && video.paused) {
        video.muted = true;
        video.play().catch(() => { });
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    }
  };

  // ENABLE SOUND (Global or Button)
  const enableSound = () => {
    if (soundEnabled) return;
    soundEnabled = true;
    video.muted = false;
    video.volume = 0.6;
    updateUI();

    // Remove global listeners
    document.removeEventListener('click', enableSound);
    document.removeEventListener('touchstart', enableSound);

    updatePlayback();
  };

  // BUTTON CLICK HANDLER
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent global listener
      e.preventDefault();

      if (!soundEnabled) {
        // First click on button -> Enable sound
        enableSound();
      } else {
        // Subsequent clicks -> Toggle mute
        video.muted = !video.muted;
        updateUI();
      }
    });
  }

  // GLOBAL LISTENERS (One time only)
  document.addEventListener('click', enableSound, { once: true });
  document.addEventListener('touchstart', enableSound, { once: true });

  // INTERSECTION OBSERVER – 30% THRESHOLD
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
      updatePlayback();
    },
    { threshold: [0, 0.3, 0.5, 0.7, 1.0] }
  );

  observer.observe(container);

  // START AFTER VIDEO READY
  const tryMutedAutoplay = () => {
    if (isVisible && !soundEnabled && video.paused) {
      video.muted = true;
      video.play().catch(() => { });
    }
  };

  if (video.readyState >= 1) {
    tryMutedAutoplay();
  } else {
    video.addEventListener('loadedmetadata', tryMutedAutoplay, { once: true });
  }

  // TAB VISIBILITY
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      updatePlayback();
    }
  });

  // iOS RESUME FIX
  const tick = () => {
    if (isVisible && soundEnabled && !document.hidden && video.paused) {
      video.play().catch(() => { });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

})();



function downloadResume() {
  // Path to your PDF (inside assets folder)
  const resumeUrl = './assets/Siva%20Resume.pdf';  // %20 = space

  // Create invisible <a> tag
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'Siva_Balaa_Resume.pdf';  // Name shown when downloaded
  link.style.display = 'none';

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}







// ===============================================

// WORK EXPERIENCE – CLICK + GLOWING HINT


document.addEventListener('DOMContentLoaded', () => {
  const hint = document.getElementById('mouseHint');

  document.querySelectorAll('.locked-card').forEach(locked => {
    const jobId = locked.getAttribute('data-job');
    const full = document.getElementById(`fullCard${jobId}`);
    let unlocked = false;

    // Hover hint
    locked.addEventListener('mouseenter', () => hint.classList.add('show'));
    locked.addEventListener('mouseleave', () => hint.classList.remove('show'));

    // Click to unlock
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      locked.style.opacity = '0';
      setTimeout(() => {
        locked.style.display = 'none';
        full.style.display = 'block';
        full.style.animation = 'fadeInUp 0.8s ease';
      }, 400);
    };

    locked.addEventListener('click', unlock);
    locked.addEventListener('touchstart', unlock);
  });
});

// Animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);


performance.getEntriesByType("navigation")[0].type === "reload" && (location.href = "index.html")





// ===============================================
// FUTURE VISION – SCROLL REVEAL + GLOW HINT
// ===============================================

// ===============================================
// 17. TOAST NOTIFICATION
// ===============================================
function showToast(message) {
  let toast = document.getElementById("toast-container");

  // Create toast if not exists
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-container";
    document.body.appendChild(toast);
  }

  toast.innerText = message;
  toast.className = "show";

  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 4000);
}

// ===============================================
// 18. AUTO-DOWNLOAD VIDEO CACHE SYSTEM (Background)
// ===============================================
const VIDEO_ASSETS = [
  'assets/Videos/Shop Calculator.mp4',
  'assets/Videos/Shop Calculator Phase 2.mp4',
  'assets/Videos/FPSVideo.mp4',
  'assets/Videos/2D_Puzzle.mp4'
];

async function preloadVideos() {
  console.log("Starting background video download...");

  for (const src of VIDEO_ASSETS) {
    if (videoCache[src]) continue; // Already cached

    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      videoCache[src] = objectUrl;
      console.log(`Cached: ${src}`);
    } catch (err) {
      console.error(`Failed to cache ${src}:`, err);
    }
  }
  console.log("All videos cached successfully!");
}

// Start preloading after critical content (images) has likely loaded
window.addEventListener('load', () => {
  // Wait 4 seconds to let initial high-res images and UI settle
  setTimeout(() => {
    // optional: check if requestIdleCallback is supported for even smoother perf
    if ('requestIdleCallback' in window) {
      requestIdleCallback(preloadVideos, { timeout: 20000 });
    } else {
      preloadVideos();
    }
  }, 4000);
});

// ===============================================
// 19. FUTURE VISION AUDIO (PLAY AT 30% VISIBILITY)
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  const futureSection = document.getElementById("future-vision");

  if (futureSection) {
    // Ensure relative positioning for absolute hearts
    futureSection.style.position = 'relative';

    const audio = new Audio("assets/Audio/Love.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    let isPlaying = false;
    let heartInterval = null;

    // TARGET THE CONTAINER (Wrapper of Image + Heartbeat)
    const visualsContainer = futureSection.querySelector('.future-visuals');

    // FLOATING HEART GENERATOR
    function spawnHeart() {
      const heart = document.createElement('div');
      heart.classList.add('romantic-heart');
      heart.innerHTML = '❤';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem'; // 1rem to 2.5rem
      heart.style.animationDuration = (Math.random() * 2 + 3) + 's'; // 3s to 5s

      futureSection.appendChild(heart);

      // Cleanup
      setTimeout(() => {
        heart.remove();
      }, 5000);
    }

    function startHeartRain() {
      if (!heartInterval) {
        spawnHeart(); // Immediate one
        heartInterval = setInterval(spawnHeart, 450); // Increased frequency (more hearts)
      }
    }

    function stopHeartRain() {
      if (heartInterval) {
        clearInterval(heartInterval);
        heartInterval = null;
      }
      // Optional: Clear existing hearts immediately?
      // const existingHearts = futureSection.querySelectorAll('.romantic-heart');
      // existingHearts.forEach(h => h.remove());
    }

    // Function to start animations
    function startAnimations() {
      if (!isPlaying) {
        // STOP WIN AUDIO IF PLAYING
        if (typeof isWinAudioPlaying !== 'undefined' && isWinAudioPlaying && typeof winAudio !== 'undefined') {
          winAudio.pause();
          winAudio.currentTime = 0;
          isWinAudioPlaying = false;
        }

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            // START SVG ANIMATION & HEART RAIN
            if (visualsContainer) visualsContainer.classList.add("heartbeat-active");
            startHeartRain();
          }).catch(error => {
            console.log("Future Vision Audio play prevented (interaction needed?):", error);
            // Even if audio fails, still show animations
            isPlaying = true;
            if (visualsContainer) visualsContainer.classList.add("heartbeat-active");
            startHeartRain();
          });
        }
      }
    }

    // Function to stop animations
    function stopAnimations() {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        // STOP SVG ANIMATION & HEART RAIN
        if (visualsContainer) visualsContainer.classList.remove("heartbeat-active");
        stopHeartRain();
      }
    }

    // Check if section is visible on load (for hash navigation)
    function checkInitialVisibility() {
      const rect = futureSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const sectionHeight = rect.height;
      const visibilityRatio = visibleHeight / sectionHeight;

      if (visibilityRatio >= 0.3) {
        startAnimations();
      }
    }

    // IntersectionObserver for scroll-based triggering
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.3) {
          startAnimations();
        } else {
          stopAnimations();
        }
      });
    }, {
      threshold: [0.25, 0.3, 0.35]
    });

    observer.observe(futureSection);

    // Check initial visibility after a short delay to ensure page is settled
    setTimeout(() => {
      checkInitialVisibility();
    }, 500);
  }
});

// ===============================================
// 20. DREAM NAV BUTTON HEART PARTICLES
// ===============================================
document.addEventListener("DOMContentLoaded", () => {
  const dreamNavBtns = document.querySelectorAll('.dream-nav-btn');

  dreamNavBtns.forEach(btn => {
    function spawnNavHeart() {
      const heart = document.createElement('div');
      heart.classList.add('nav-heart');
      heart.innerHTML = '❤';

      // Random horizontal offset
      const randomOffset = (Math.random() - 0.5) * 40; // -20px to +20px
      heart.style.left = `calc(50% + ${randomOffset}px)`;

      btn.appendChild(heart);

      // Cleanup after animation
      setTimeout(() => {
        heart.remove();
      }, 1500);
    }

    // Spawn hearts continuously (not just on hover)
    spawnNavHeart(); // Immediate heart
    setInterval(spawnNavHeart, 400); // Heart every 400ms - ALWAYS ACTIVE

    // Extra hearts on hover for more intensity
    let hoverInterval = null;
    btn.addEventListener('mouseenter', () => {
      hoverInterval = setInterval(spawnNavHeart, 200); // More frequent on hover
    });

    btn.addEventListener('mouseleave', () => {
      if (hoverInterval) {
        clearInterval(hoverInterval);
        hoverInterval = null;
      }
    });
  });
});

// ===============================================
// 21. CLOSE AUDIO ON PAGE RELOAD
// ===============================================
window.addEventListener("beforeunload", () => {
  const closeAudio = new Audio('./assets/Audio/Close.mp3');
  closeAudio.play().catch(e => console.log("Close audio play failed:", e));
});