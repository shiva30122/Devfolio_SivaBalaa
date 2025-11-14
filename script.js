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

// ===============================================
// 7. OPEN OVERLAY – FREEZE PAGE
// ===============================================
function openNewOverlay(title, description, videoSrc, backgroundImage, event) {
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
// 11. SMOOTH SECTION SCROLL
// ===============================================
function showSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const desktopNav = document.getElementById("desktop-nav");
    const hamburgerNav = document.getElementById("hamburger-nav");
    const navHeight = desktopNav.offsetHeight || hamburgerNav.offsetHeight || 0;

    if (sectionId === "contact") {
      setTimeout(() => {
        const scrollTarget = document.documentElement.scrollHeight * 1.1;
        window.scrollTo({ top: scrollTarget, behavior: "smooth", duration: 1200 });
        setTimeout(() => {
          if (Math.abs(window.scrollY - scrollTarget) > 10) {
            window.scrollTo({ top: scrollTarget, behavior: "smooth" });
          }
        }, 1300);
      }, 100);
    } else {
      setTimeout(() => {
        const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: sectionTop, behavior: "smooth", duration: 1200 });
      }, 100);
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
// 13. LAST IMAGE SCROLL EFFECT – FIXED: Only at bottom
// ===============================================
function handleLastImageScroll() {
  const lastImage = document.getElementById("last-image-container");
  let isElastic = false;
  let timeout;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 50) {
      clearTimeout(timeout);
      if (!lastImage.classList.contains("elastic")) {
        lastImage.classList.remove("hidden");
        lastImage.classList.add("elastic");
        isElastic = true;
      }
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

// ===============================================
// 14. ELASTIC IMAGE
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
// 15. POPUP IMAGE – FIXED: Only at 95%+
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
// 16. SCROLL TO TOP ON REFRESH
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
// 17. SCROLL TO TOP ON REFRESH
// ===============================================
window.addEventListener("beforeunload", () => window.scrollTo(0, 0));
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  if (window.innerWidth <= 1200 && window.innerWidth > 600) {
    const navLinks = document.querySelector("#desktop-nav .nav-links");
    navLinks.style.display = "flex";
  }
});









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

  // 6. Start after page load (NO DELAY)
  if (document.readyState === 'complete') {
    startVideoLoad();
  } else {
    window.addEventListener('load', startVideoLoad);
  }
})();





/* VIDEO: MUTE ON START → TAP TO ENABLE SOUND → PLAY ONLY IF 30%+ VISIBLE */
(() => {
  const video = document.getElementById('intro-video');
  if (!video) return;

  const container = document.querySelector('.StartingAnimationContainer');
  if (!container) return;

  let soundEnabled = false;
  let isVisible = false;

  // CENTRAL PLAY CONTROL
  const updatePlayback = () => {
    const shouldPlay = isVisible && !document.hidden;

    if (soundEnabled) {
      // SOUND ON: play if visible
      if (shouldPlay && video.paused) {
        video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    } else {
      // SOUND OFF: muted autoplay only if visible
      if (shouldPlay && video.muted && video.paused) {
        video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    }
  };

  // UNMUTE + ENABLE SOUND ON FIRST TAP
  const enableSound = () => {
    if (soundEnabled) return;
    soundEnabled = true;
    video.muted = false;
    video.volume = 0.6;

    document.removeEventListener('click', enableSound);
    document.removeEventListener('touchstart', enableSound);

    updatePlayback(); // play if visible
  };

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

  // MUTED AUTOPLAY – ONLY IF VISIBLE + SOUND NOT ENABLED
  const tryMutedAutoplay = () => {
    if (isVisible && !soundEnabled && video.paused) {
      video.muted = true;
      video.play().catch(() => {
        setTimeout(() => {
          if (isVisible && !soundEnabled && video.paused) {
            video.play().catch(() => {});
          }
        }, 300);
      });
    }
  };

  // START AFTER VIDEO READY
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
      video.play().catch(() => {});
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


