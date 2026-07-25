// ============================================================
// Respect reduced-motion / touch — these gate the fancier effects
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
const fancyEffectsOn = !prefersReducedMotion && !isTouchDevice;

// ============================================================
// Floating petals — a soft, whimsical background layer on every page
// ============================================================
if (!prefersReducedMotion) {
  const petalLayer = document.createElement('div');
  petalLayer.id = 'petal-layer';
  document.body.appendChild(petalLayer);

  const petalEmojis = ['🌸', '🌷', '🌼', '💮', '🌻', '✨'];
  const petalCount = isTouchDevice ? 10 : 16;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (0.9 + Math.random() * 1.1) + 'rem';
    petal.style.animationDuration = (10 + Math.random() * 14) + 's';
    petal.style.animationDelay = (Math.random() * -20) + 's';
    petalLayer.appendChild(petal);
  }
}

// ============================================================
// Splash / preloader (only runs if #splash exists on the page)
// ============================================================
const splash = document.getElementById('splash');
if (splash) {
  if (prefersReducedMotion) {
    splash.remove();
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => {
        splash.classList.add('splash-hide');
        setTimeout(() => splash.remove(), 700);
      }, 900);
    });
  }
}

// ============================================================
// Scroll progress bar — injected once, works on every page
// ============================================================
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.appendChild(progressBar);

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgressBar, { passive: true });
updateProgressBar();

// ============================================================
// Custom cursor (desktop only)
// ============================================================
if (fancyEffectsOn) {
  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('has-custom-cursor');

  let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.left = targetX + 'px';
    dot.style.top = targetY + 'px';
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // grow the ring over interactive elements
  document.querySelectorAll('a, button, .note-card, .project-card, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-active'));
  });
}

// ============================================================
// Magnetic buttons — nudge toward the cursor on hover
// ============================================================
if (fancyEffectsOn) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ============================================================
// 3D tilt on project/note cards
// ============================================================
if (fancyEffectsOn) {
  document.querySelectorAll('.project-card, .note-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ============================================================
// Nav: hide on scroll down, show on scroll up
// ============================================================
const navEl = document.querySelector('.nav');
let lastScrollY = window.scrollY;

if (navEl) {
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > lastScrollY && currentY > 140) {
      navEl.classList.add('nav-hidden');
    } else {
      navEl.classList.remove('nav-hidden');
    }
    lastScrollY = currentY;
  }, { passive: true });
}

// ============================================================
// Active nav link highlight while scrolling (index.html sections)
// ============================================================
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href*="#"]');

if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href').endsWith('#' + id));
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navObserver.observe(s));
}

// ============================================================
// Scroll-reveal animation
// ============================================================
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ============================================================
// Typing effect (hero subtitle) — element with [data-typing]
// ============================================================
const typingEl = document.querySelector('[data-typing]');
if (typingEl) {
  const words = JSON.parse(typingEl.dataset.typing);
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'type-cursor';

  if (prefersReducedMotion) {
    typingEl.textContent = words[0];
  } else {
    let wordIndex = 0, charIndex = 0, deleting = false;
    typingEl.textContent = '';
    typingEl.after(cursorSpan);

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        typingEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
  }
}

// ============================================================
// Count-up stats (elements with [data-count])
// ============================================================
const statEls = document.querySelectorAll('[data-count]');
if (statEls.length && 'IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
      } else {
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 30);
      }
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObserver.observe(el));
}

// ============================================================
// Particle network canvas (hero background — #particle-canvas)
// ============================================================
const canvas = document.getElementById('particle-canvas');
if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const hero = canvas.closest('.hero');

  function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const count = isTouchDevice ? 24 : 55;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6
    });
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          p.x += dx / dist * 0.6;
          p.y += dy / dist * 0.6;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232,163,61,0.7)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(241,238,227,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ============================================================
// Notes filter (notes.html) — animated show/hide
// ============================================================
const filterRow = document.getElementById('filterRow');
const notesGrid = document.getElementById('notesGrid');

if (filterRow && notesGrid) {
  const buttons = filterRow.querySelectorAll('.filter-btn');
  const cards = notesGrid.querySelectorAll('.note-card');

  filterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.style.display = '';
        card.classList.remove('filtering-out');
        card.classList.add('filtering-in');
      } else {
        card.classList.add('filtering-out');
        setTimeout(() => { if (card.classList.contains('filtering-out')) card.style.display = 'none'; }, 250);
      }
    });
  });
}
