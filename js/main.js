// F12
document.addEventListener("keydown", function (e) {
  if (e.key === "F12") {
    e.preventDefault();
  }
});
  
// Ctrl+Shift+I
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }
});
  
// Ctrl+Shift+C
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    e.preventDefault();
  }
});

// Ctrl+U
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "U") {
    e.preventDefault();
  }
});

// Disable contextmenu
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Background animation
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.addEventListener('resize', resize);
  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = 40 + Math.random() * 60;
    this.a = Math.random() * 2 * Math.PI;
    this.speed = 0.002 + Math.random() * 0.003;
    this.color = `hsla(${200 + Math.random()*80}, 80%, 70%, 0.15)`;
  }
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  Particle.prototype.update = function() {
    this.a += this.speed;
    this.x += Math.cos(this.a) * 0.2;
    this.y += Math.sin(this.a) * 0.2;
    if(this.x < -100 || this.x > w+100 || this.y < -100 || this.y > h+100) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
    }
  }
  function animate() {
    ctx.clearRect(0,0,w,h);
    for(let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  resize();
  particles = Array.from({length: 18}, () => new Particle());
  animate();

  // Change theme
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const logo = document.getElementById('logo-img');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode);
    icon.src = mode === 'dark' ? './images/dark.png' : './images/light.png';
    icon.alt = mode === 'dark' ? 'ダークテーマ' : 'ライトテーマ';
    logo.src = mode === 'dark' ? './images/2-color.png' : './images/2-light.png';
    localStorage.setItem('theme', mode);
  }
  const saved = localStorage.getItem('theme');
  setTheme(saved ? saved : (prefersDark ? 'dark' : 'light'));
  btn.onclick = () => {
    const now = document.documentElement.getAttribute('data-theme');
    setTheme(now === 'dark' ? 'light' : 'dark');
  };

  // Easter egg: Logo click animation
  let logoClickCount = 0;
  let logoClickTimer = null;
  logo.addEventListener('click', () => {
    logoClickCount++;
    if (logoClickTimer) clearTimeout(logoClickTimer);
    if (logoClickCount >= 7) {
      // Animation to be triggered after 7 clicks
      logo.classList.add('egg-spin');
      setTimeout(() => {
        logo.classList.remove('egg-spin');
      }, 1500);
      logoClickCount = 0;
    } else {
      logoClickTimer = setTimeout(() => {
        logoClickCount = 0;
      }, 800);
    }
  });
});

