/* ═══════════════════════════════════════════════
   mentorship.js
   ═══════════════════════════════════════════════ */

/* ── Network quality helper (skip heavy FX on 2G) ── */
function isSlowConnection() {
  const c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return c && (c.effectiveType === '2g' || c.effectiveType === 'slow-2g');
}

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


/* ════════════════════════════════════════════════
   HERO GLOBE — canvas dot-sphere, rotates on Y axis
   ════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('hero-globe');
  if (!canvas) return;
  if (isSlowConnection()) return;

  const ctx    = canvas.getContext('2d');
  const mobile = isTouch();

  /* Canvas / geometry */
  const SIZE = mobile ? 200 : 330;
  const R    = SIZE * 0.41;          // sphere radius in px
  const CX   = SIZE / 2;
  const CY   = SIZE / 2;
  canvas.width  = SIZE;
  canvas.height = SIZE;

  /* ── Fibonacci-lattice dot distribution on unit sphere ── */
  const TOTAL  = mobile ? 72 : 190;
  const GOLDEN = Math.PI * (3 - Math.sqrt(5));
  const rawDots = [];
  for (let i = 0; i < TOTAL; i++) {
    const y = 1 - (i / (TOTAL - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = GOLDEN * i;
    rawDots.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }

  /* Pre-apply a small X-tilt (~16°) so the sphere reads as 3-D */
  const TILT   = 0.28;
  const cosT   = Math.cos(TILT);
  const sinT   = Math.sin(TILT);
  const dots   = rawDots.map(([x, y, z]) => [
    x,
    y * cosT - z * sinT,
    y * sinT + z * cosT,
  ]);

  const DOT_BASE = mobile ? 0.95 : 1.3;

  function render(ry) {
    ctx.clearRect(0, 0, SIZE, SIZE);

    const cosRY = Math.cos(ry);
    const sinRY = Math.sin(ry);

    /* Outer glow ring */
    ctx.save();
    ctx.shadowBlur  = 26;
    ctx.shadowColor = 'rgba(123,46,255,0.5)';
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(123,46,255,0.16)';
    ctx.lineWidth   = 1.5;
    ctx.stroke();
    ctx.restore();

    /* Project + sort back-to-front (painter's algorithm) */
    const projected = dots.map(([x, y, z]) => {
      const x3 =  x * cosRY + z * sinRY;
      const z3 = -x * sinRY + z * cosRY;
      return { px: CX + x3 * R, py: CY + y * R, z: z3 };
    });
    projected.sort((a, b) => a.z - b.z);

    /* Draw dots — opacity/size driven by depth */
    projected.forEach(({ px, py, z }) => {
      const norm  = (z + 1) * 0.5;               // 0 = back, 1 = front
      const alpha = (0.07 + norm * 0.88).toFixed(2);
      const r     = DOT_BASE * (0.38 + norm * 0.82);
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(123,46,255,${alpha})`;
      ctx.fill();
    });
  }

  /* ── Static frame for reduced-motion users ── */
  if (prefersReducedMotion) {
    render(0.4);
    return;
  }

  /* ── Animation loop with FPS cap ── */
  let rotY    = 0;
  let rafId;
  let lastTs  = 0;
  const STEP  = mobile ? 1000 / 30 : 1000 / 60;

  function frame(ts) {
    if (ts - lastTs >= STEP) {
      render(rotY);
      rotY  += 0.0038;
      lastTs = ts;
    }
    rafId = requestAnimationFrame(frame);
  }

  /* Pause when scrolled out of view → saves CPU/battery */
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        lastTs = 0;
        rafId  = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(rafId);
      }
    });
  }, { threshold: 0.01 }).observe(canvas);
})();


/* ════════════════════════════════════════════════
   PARALLAX CUBES — small rotating squares that
   drift at different speeds as the page scrolls
   ════════════════════════════════════════════════ */
(function () {
  if (prefersReducedMotion) return;
  if (isSlowConnection()) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const mobile = isTouch();
  const COUNT  = mobile ? 8 : 17;

  /* Build cubes */
  const wrappers = [];
  const frag     = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const size   = Math.random() * 24 + 7;            // 7–31 px
    const x      = Math.random() * 88 + 6;            // 6–94 %
    const y      = Math.random() * 88 + 6;            // 6–94 %
    const dur    = (Math.random() * 16 + 5).toFixed(1); // 5–21 s spin
    const bOp    = (Math.random() * 0.22 + 0.07).toFixed(2);
    const fOp    = (Math.random() * 0.07 + 0.02).toFixed(2);
    const dir    = Math.random() < 0.5 ? 'normal' : 'reverse';
    /* Parallax speed: positive = moves down with scroll, negative = moves up.
       Mix both directions for a layered depth feel. */
    const spd    = (Math.random() * 0.32 + 0.04) * (Math.random() < 0.55 ? 1 : -0.6);

    /* Wrapper — receives the translateY from the scroll handler */
    const wrap = document.createElement('div');
    wrap.className = 'parallax-cube-wrap';
    wrap.style.cssText = `left:${x}%;top:${y}%;`;

    /* Inner square — spins via CSS animation */
    const cube = document.createElement('div');
    cube.className = 'parallax-cube';
    cube.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `--border-op:${bOp}`,
      `--fill-op:${fOp}`,
      `--dur:${dur}s`,
      `animation-direction:${dir}`,
    ].join(';');

    wrap.appendChild(cube);
    frag.appendChild(wrap);
    wrappers.push({ el: wrap, spd });
  }

  /* Insert cubes container before hero-content so it's behind the text */
  const container = document.createElement('div');
  container.id = 'hero-cubes';
  container.setAttribute('aria-hidden', 'true');
  container.appendChild(frag);
  hero.insertBefore(container, hero.querySelector('.hero-content'));

  /* ── Scroll-driven parallax (RAF-throttled, passive listener) ── */
  let ticking = false;
  let scrollY = 0;

  function applyParallax() {
    wrappers.forEach(({ el, spd }) => {
      el.style.transform = `translateY(${(scrollY * spd).toFixed(1)}px)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });
})();


/* ════════════════════════════════════════════════
   GEO CURRENCY — show UAH in Ukraine, EUR in
   Europe, USD everywhere else. Cached 24 h in
   localStorage so the API is hit only once/day.
   ════════════════════════════════════════════════ */
(function () {
  /* ── Price table (display strings, pre-formatted) ── */
  const PRICES = {
  //  key         EUR      USD      UAH
    career:   { eur: '25',   usd: '27',  uah: '1 100'  },
    intern:   { eur: '30',   usd: '32',  uah: '1 350'  },
    junior:   { eur: '50',   usd: '54',  uah: '2 200'  },
    middle:   { eur: '75',   usd: '80',  uah: '3 300'  },
    ultimate: { eur: '350',  usd: '375', uah: '15 000' },
    hourly:   { eur: '75',   usd: '80',  uah: '3 300'  },
  };

  const SYMBOLS = { eur: '€', usd: '$', uah: '₴' };
  const LABELS  = { eur: 'EUR', usd: 'USD', uah: 'UAH' };

  /* EU + EEA + CH countries → show EUR */
  const EU = new Set([
    'AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR',
    'HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI',
    'SK',              // EU-27
    'NO','IS','LI',    // EEA
    'CH',              // Switzerland
  ]);

  function detectCurrency(cc) {
    if (cc === 'UA') return 'uah';
    if (EU.has(cc))  return 'eur';
    return 'usd';
  }

  function applyCurrency(key) {
    const sym = SYMBOLS[key];
    document.querySelectorAll('[data-price]').forEach(el => {
      const pkg = el.dataset.price;
      if (!PRICES[pkg]) return;
      const symEl = el.querySelector('.currency');
      const numEl = el.querySelector('.price-num');
      if (symEl) symEl.textContent = sym;
      if (numEl) numEl.textContent = PRICES[pkg][key];
    });
    const note = document.getElementById('currency-note');
    if (note) note.textContent = LABELS[key];
  }

  /* ── Try localStorage cache first ── */
  const CACHE_KEY = 'blt_currency';
  const CACHE_TTL = 86400000; // 24 h in ms
  try {
    const hit = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (hit && Date.now() - hit.ts < CACHE_TTL) {
      applyCurrency(hit.k);
      return; // no network call needed
    }
  } catch (_) { /* ignore */ }

  /* EUR is the default while the fetch is in flight */
  applyCurrency('eur');

  /* ── Fetch country from ipapi.co (free, no key) ── */
  const ctrl = typeof AbortSignal !== 'undefined' && AbortSignal.timeout
    ? { signal: AbortSignal.timeout(5000) }
    : {};

  fetch('https://ipapi.co/json/', ctrl)
    .then(r => { console.log(r); if (!r.ok) throw new Error(); return r.json(); })
    .then(data => {
      const cc  = (data && data.country_code) || '';
      console.log(cc);
      
      const key = detectCurrency(cc);
      applyCurrency(key);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ k: key, ts: Date.now() }));
      } catch (_) { /* quota exceeded — ignore */ }
    })
    .catch(() => { /* keep EUR on error */ });
})();
