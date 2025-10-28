// Particles + Typewriter + Menu Toggle

// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// PARTICLES BACKGROUND
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7
    });
  }
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
}
function updateParticles() {
  for (const p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
}
function animate() {
  drawParticles();
  updateParticles();
  requestAnimationFrame(animate);
}
animate();

// === ABOUT SECTION FADE-IN ANIMATION ===
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutSection.classList.add('show');
    }
  });
}, { threshold: 0.2 });

observer.observe(aboutSection);


// === COUNT-UP ANIMATION ===
const counters = document.querySelectorAll('.counter');
let started = false; // evita que se repita al hacer scroll

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 80; // controla la velocidad
    let count = 0;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + "+";
      }
    };
    updateCount();
  });
}

// Detecta cuando entra en pantalla
window.addEventListener('scroll', () => {
  const section = document.querySelector('.stats');
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint && !started) {
    started = true;
    animateCounters();
  }
});


// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});
// SKILLS ANIMATION ON SCROLL
const skillBoxes = document.querySelectorAll('.skill-box');

function revealSkills() {
  const triggerBottom = window.innerHeight * 0.85;
  skillBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSkills);
revealSkills();

// === EMAILJS CONFIG ===
(function(){
  emailjs.init("7C54pxJo_xpFZuyzs"); // reemplazá con tu public key
})();

// === CONTACT FORM SUBMIT ===
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_awy6ofp', 'template_tzc0m5o', this)
    .then(() => {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "#22c55e";
      form.reset();
    }, (err) => {
      status.textContent = "❌ Error sending message. Try again later.";
      status.style.color = "#ef4444";
      console.error(err);
    });
});
