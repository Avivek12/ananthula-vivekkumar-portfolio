window.initSkillsBg = function () {
  const canvas = document.getElementById("skills-bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6AD5"];
  const particleCount = 80;
  const particles = [];
  let mouse = { x: null, y: null, radius: 100 };

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 5 + 2,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.4,
      speedFactor: Math.random() * 0.5 + 0.5
    });
  }

  canvas.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx * p.speedFactor;
      p.y += p.dy * p.speedFactor;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      if (mouse.x && mouse.y) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x += dx / dist * force * 2;
          p.y += dy / dist * force * 2;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
      ctx.fill();
    });

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
};
