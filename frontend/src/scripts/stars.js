window.initStars = function () {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 2 });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
};
