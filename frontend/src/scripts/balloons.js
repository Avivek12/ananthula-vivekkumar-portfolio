window.initBalloons = function () {
  const container = document.querySelector(".balloons-container");
  if (!container) return;

  container.innerHTML = ""; // Clear existing stars

  const starCount = 60; // number of stars

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    // Random horizontal position
    star.style.left = `${Math.random() * 100}%`;

    // Random size (slightly bigger for visibility)
    const size = 2 + Math.random() * 3; // 2px to 5px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random opacity
    star.style.opacity = 0.6 + Math.random() * 0.4;

    // Random animation duration
    const duration = 2 + Math.random() * 8; // 5s to 15s

    // Random initial delay
    const delay = Math.random() * 10;

    // Animation name
    star.style.animation = `fallStar ${duration}s linear ${delay}s infinite`;

    // Ensure stars are above background but below content
    star.style.zIndex = 0;

    container.appendChild(star);
  }
};
