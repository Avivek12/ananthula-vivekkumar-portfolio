// src/scripts/navbarStars.js
export function initNavbarStars() {
  const canvas = document.getElementById("navbar-stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = 80; // height of navbar
  const stars = [];

  for (let i = 0; i < 40; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      d: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fill();
      s.y += s.d;
      if (s.y > h) {
        s.y = 0;
        s.x = Math.random() * w;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = 80;
  });
}
