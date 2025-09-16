// src/scripts/about-particles.js
export function initAboutParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const mouse = { x: null, y: null, radius: 100 };

  canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particles = [];
  const colors = ["#ff4d6d","#6a11cb","#ffb347","#ff7eb3","#ffd700"];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dy: Math.random() * 1 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random()*colors.length)],
      type: Math.random() > 0.85 ? "balloon" : "star",
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      ctx.beginPath();
      if (p.type === "star") {
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      } else {
        ctx.ellipse(p.x, p.y, p.r+2, p.r+5, 0, 0, 2*Math.PI);
      }
      ctx.fillStyle = p.color;
      ctx.fill();

      if (mouse.x && mouse.y) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        }
      }

      p.y += p.dy;
      p.x += p.dx;

      if (p.y > h) p.y = -10;
      if (p.x > w) p.x = 0;
      if (p.x < 0) p.x = w;
    });

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
}
