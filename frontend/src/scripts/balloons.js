window.initBalloons = function () {
  const container = document.querySelector(".balloons-container");
  if (!container) return;

  container.innerHTML = ""; // Clear existing balloons

  const balloonCount = 5; // number of balloons
  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // Random position and size
    balloon.style.left = `${Math.random() * 90}%`;
    balloon.style.width = `${5 + Math.random() * 7}px`;
    balloon.style.height = `${17 + Math.random() * 13}px`;

    // Random gradient color
    balloon.style.background = `linear-gradient(${Math.random() * 360}deg,
      hsl(${Math.random() * 360}, 80%, 60%),
      hsl(${Math.random() * 360}, 70%, 50%))`;

    // Horizontal sway amplitude
    const amplitude = Math.random() * 20 + 10; 
    balloon.style.setProperty('--amplitude', `${amplitude}px`);

    // Random animation duration
    const duration = Math.random() * 5 + 5; 
    balloon.style.animation = `floatBalloon ${duration}s ease-in-out infinite alternate`;

    balloon.style.transformOrigin = "center bottom";
    container.appendChild(balloon);
  }
};
