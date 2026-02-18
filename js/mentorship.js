/* ═══════════════════════════════════════════════
   mentorship.js
   ═══════════════════════════════════════════════ */

const isTouch = () => window.matchMedia('(hover: none)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── PARTICLES ── */
(function () {
  const container = document.getElementById('particles');
  if (!container) return;

  // Fewer particles on mobile to save battery
  const count = isTouch() ? 12 : 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 1;
    p.style.cssText = [
      `left: ${Math.random() * 100}%`,
      `width: ${size}px`,
      `height: ${size}px`,
      `animation-duration: ${Math.random() * 12 + 8}s`,
      `animation-delay: ${Math.random() * 10}s`,
    ].join(';');
    container.appendChild(p);
  }
})();


/* ── SCROLL-REVEAL ── */
(function () {
  const elements = document.querySelectorAll('.pkg-card, .hourly-card, .phase-item');
  if (!elements.length || prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    observer.observe(el);
  });
})();


/* ── STAT COUNTER ── */
(function () {
  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats || prefersReducedMotion) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;

        const suffix = el.innerHTML.replace(/[0-9]/g, '');
        let current = 0;
        const step = Math.ceil(target / 30);

        const tick = setInterval(() => {
          current = Math.min(current + step, target);
          el.innerHTML = current + suffix;
          if (current >= target) clearInterval(tick);
        }, 40);
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  observer.observe(heroStats);
})();


/* ── DESKTOP-ONLY EFFECTS ── */
// Card tilt, magnetic buttons, and cursor glow are skipped on touch devices
// to avoid janky interactions and save resources.
if (!isTouch() && !prefersReducedMotion) {

  /* Card tilt */
  document.querySelectorAll('.pkg-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'border-color 0.35s, transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s';
    });
  });

  /* Magnetic buttons */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
      setTimeout(() => { el.style.transition = ''; }, 500);
    });
  });

  /* Cursor glow */
  const glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed',
    'width:400px',
    'height:400px',
    'border-radius:50%',
    'background:radial-gradient(circle, rgba(123,46,255,0.07) 0%, transparent 70%)',
    'pointer-events:none',
    'transform:translate(-50%,-50%)',
    'transition:left 0.12s ease,top 0.12s ease',
    'z-index:0',
  ].join(';');
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}
