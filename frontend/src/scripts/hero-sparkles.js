export function initSparkles() {
  const canvas = document.getElementById("hero-sparkles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const sparkles = [];
  const colors = ["#ffffff", "#ffdd00", "#ff4d4d", "#4dff4d", "#4d4dff"];

  function createSparkle() {
    const sparkle = {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: 2,
    };
    sparkles.push(sparkle);
    setTimeout(createSparkle, Math.random() * 2000 + 1000);
  }

  for (let i = 0; i < 10; i++) {
    setTimeout(createSparkle, Math.random() * 2000);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    sparkles.forEach((sparkle, index) => {
      ctx.beginPath();
      ctx.arc(sparkle.x, sparkle.y, sparkle.r, 0, Math.PI * 2);
      ctx.fillStyle = sparkle.color;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;
      sparkle.life += 1 / 60;
      if (sparkle.life >= sparkle.maxLife) {
        sparkles.splice(index, 1);
      }
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
}