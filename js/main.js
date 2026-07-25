/* ---------- Ambient monitoring-grid canvas ---------- */
const canvas = document.getElementById('bg-grid');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const nodes = [];
const NODE_COUNT = 46;
for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 0.25,
    dy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.4 + 0.6
  });
}

const LINK_DIST = 130;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < LINK_DIST) {
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.12 * (1 - dist / LINK_DIST)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  nodes.forEach(n => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(237, 237, 234, 0.35)';
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();

    if (!prefersReducedMotion) {
      n.x += n.dx;
      n.y += n.dy;
      if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.dy *= -1;
    }
  });

  requestAnimationFrame(drawGrid);
}
drawGrid();

/* ---------- Typing effect ---------- */
const roles = ['Full-Stack Developer', 'API Integrator', 'Automation Builder', 'BCA Undergraduate'];
const typedEl = document.getElementById('typed-text');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

/* ---------- Scroll reveal ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
