document.addEventListener("DOMContentLoaded", function () {
  const likeButton = document.getElementById("like-button");
  if (!likeButton) {
    console.log("Like button not found");
    return;
  }

  let isLiked = false;
  let isAnimating = false;

  // Load saved state from localStorage
  const savedLiked = localStorage.getItem("isLiked");

  if (savedLiked === "true") {
    isLiked = true;
    likeButton.classList.add("liked");
  }

  likeButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Prevent spam clicking during animation
    if (isAnimating) return;
    isAnimating = true;

    // Add clicked class for ripple effect
    likeButton.classList.add("clicked");
    setTimeout(() => likeButton.classList.remove("clicked"), 600);

    if (!isLiked) {
      // Like the button
      isLiked = true;
      likeButton.classList.add("liked");

      // Enhanced effects for liking
      createFloatingHearts(e);
      createSparkleEffect(e);

      // Enhanced haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate([50, 30, 100]); // Pattern vibration
      }
    } else {
      // Unlike the button with subtle effect
      isLiked = false;
      likeButton.classList.remove("liked");
      createDislikeEffect(e);

      if (navigator.vibrate) {
        navigator.vibrate(25); // Gentle vibration for unlike
      }
    }

    // Save state
    localStorage.setItem("isLiked", isLiked.toString());

    // Reset animation lock
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  });

  function createFloatingHearts(e) {
    const rect = likeButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // More variety in heart symbols
    const heartSymbols = ["♡", "♥", "💖", "💕", "✨", "⭐", "💫"];

    // Create more hearts with varied timing
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.innerHTML = heartSymbols[i % heartSymbols.length];
        heart.className = "floating-heart";
        heart.style.position = "fixed";
        heart.style.left = centerX + (Math.random() - 0.5) * 80 + "px";
        heart.style.top = centerY + (Math.random() - 0.5) * 20 + "px";
        heart.style.zIndex = "1000";
        heart.style.color = "var(--foreground-color)";
        heart.style.fontSize = 16 + Math.random() * 8 + "px";
        heart.style.pointerEvents = "none";

        // Add random rotation
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(heart);

        setTimeout(() => {
          if (heart.parentNode) {
            heart.remove();
          }
        }, 2500);
      }, i * 80);
    }
  }

  function createSparkleEffect(e) {
    const rect = likeButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create sparkle particles
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "✨";
        sparkle.className = "sparkle-particle";
        sparkle.style.position = "fixed";
        sparkle.style.left = centerX + (Math.random() - 0.5) * 100 + "px";
        sparkle.style.top = centerY + (Math.random() - 0.5) * 100 + "px";
        sparkle.style.zIndex = "999";
        sparkle.style.color = "var(--foreground-color)";
        sparkle.style.fontSize = 8 + Math.random() * 6 + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.animation = "sparkleFloat 1.5s ease-out forwards";

        document.body.appendChild(sparkle);

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.remove();
          }
        }, 1500);
      }, i * 50);
    }
  }

  function createDislikeEffect(e) {
    const rect = likeButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Subtle unlike effect
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const particle = document.createElement("div");
        particle.innerHTML = "💔";
        particle.className = "dislike-particle";
        particle.style.position = "fixed";
        particle.style.left = centerX + (Math.random() - 0.5) * 30 + "px";
        particle.style.top = centerY + "px";
        particle.style.zIndex = "1000";
        particle.style.color = "var(--foreground-color)";
        particle.style.fontSize = "12px";
        particle.style.pointerEvents = "none";
        particle.style.opacity = "0.7";
        particle.style.animation = "fadeDown 1s ease-out forwards";

        document.body.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, 1000);
      }, i * 100);
    }
  }

  // Enhanced hover effects
  likeButton.addEventListener("mouseenter", function () {
    if (!isLiked && !isAnimating) {
      this.style.transform = "scale(1.08) rotate(-3deg)";
      this.style.filter = "brightness(1.1)";

      // Subtle preview sparkles on hover
      createPreviewSparkles();
    } else if (isLiked) {
      this.style.transform = "scale(1.05)";
      this.style.filter = "brightness(1.2)";
    }
  });

  likeButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)";
    this.style.filter = "brightness(1)";
  });

  function createPreviewSparkles() {
    const rect = likeButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Subtle preview sparkles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "✨";
        sparkle.style.position = "fixed";
        sparkle.style.left = centerX + (Math.random() - 0.5) * 50 + "px";
        sparkle.style.top = centerY + (Math.random() - 0.5) * 50 + "px";
        sparkle.style.zIndex = "998";
        sparkle.style.color = "var(--foreground-color)";
        sparkle.style.fontSize = "8px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.opacity = "0.6";
        sparkle.style.animation = "previewSparkle 0.8s ease-out forwards";

        document.body.appendChild(sparkle);

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.remove();
          }
        }, 800);
      }, i * 150);
    }
  }

  // Add dynamic CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-80px) scale(0.3) rotate(360deg);
            }
        }
        
        @keyframes fadeDown {
            0% {
                opacity: 0.7;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(40px) scale(0.5);
            }
        }
        
 
        
        @keyframes previewSparkle {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            50% {
                opacity: 0.6;
                transform: scale(1.2);
            }
            100% {
                opacity: 0;
                transform: scale(0.8);
            }
        }
        
        .floating-heart {
            animation: floatUp 2.5s ease-out forwards !important;
        }
        
        @keyframes floatUp {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
                opacity: 0.8;
                transform: translateY(-30px) scale(1.1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0.3) rotate(360deg);
            }
        }
    `;
  document.head.appendChild(style);
});
