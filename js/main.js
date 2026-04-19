/* =========================================================
   hello-doordash — Interactions
   ========================================================= */

(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Scroll progress ink trail ----------
  const inkFill = document.querySelector('.ink-fill');
  if (inkFill) {
    const updateInk = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      inkFill.style.height = `${Math.min(100, Math.max(0, pct))}%`;
    };
    window.addEventListener('scroll', updateInk, { passive: true });
    updateInk();
  }

  // ---------- Typewriter on hero name ----------
  const typed = document.querySelector('.typed');
  if (typed && !prefersReduced) {
    const text = typed.dataset.text || '';
    typed.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        typed.textContent += text.charAt(i);
        i++;
        setTimeout(tick, 80);
      } else {
        const caret = document.querySelector('.caret');
        if (caret) setTimeout(() => caret.remove(), 2000);
      }
    };
    setTimeout(tick, 400);
  } else if (typed) {
    typed.textContent = typed.dataset.text || '';
    const caret = document.querySelector('.caret');
    if (caret) caret.remove();
  }

  // ---------- Route-map canvas in hero ----------
  const canvas = document.getElementById('route-map');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, routes, dots, gridStep;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gridStep = Math.max(60, Math.min(w, h) / 10);
    };

    const bezier = (t, p0, p1, p2) => {
      const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
      const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
      return { x, y };
    };

    const seedRoutes = () => {
      routes = [];
      const count = 4;
      for (let i = 0; i < count; i++) {
        const p0 = { x: Math.random() * w * 0.3, y: Math.random() * h };
        const p2 = { x: w * 0.7 + Math.random() * w * 0.3, y: Math.random() * h };
        const p1 = { x: (p0.x + p2.x) / 2 + (Math.random() - 0.5) * w * 0.4,
                     y: (p0.y + p2.y) / 2 + (Math.random() - 0.5) * h * 0.5 };
        routes.push({ p0, p1, p2 });
      }
      dots = routes.map((_, i) => ({
        route: i,
        t: Math.random(),
        speed: 0.0012 + Math.random() * 0.0018,
        pulse: 0
      }));
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(17,17,17,0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += gridStep) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    };

    const drawRoutes = () => {
      ctx.strokeStyle = 'rgba(235,23,0,0.22)';
      ctx.lineWidth = 1.4;
      routes.forEach(r => {
        ctx.beginPath();
        ctx.moveTo(r.p0.x, r.p0.y);
        ctx.quadraticCurveTo(r.p1.x, r.p1.y, r.p2.x, r.p2.y);
        ctx.stroke();
      });
    };

    const drawDots = () => {
      dots.forEach(d => {
        const r = routes[d.route];
        const pos = bezier(d.t, r.p0, r.p1, r.p2);
        const baseR = 4;
        const pulseR = baseR + d.pulse * 8;
        if (d.pulse > 0) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,48,8,${0.2 * (1 - d.pulse)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, baseR, 0, Math.PI * 2);
        ctx.fillStyle = '#EB1700';
        ctx.fill();
      });
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      drawRoutes();
      if (!prefersReduced) {
        dots.forEach(d => {
          const prevT = d.t;
          d.t += d.speed;
          if (d.t >= 1) d.t = 0;
          if (prevT < 0.5 && d.t >= 0.5) d.pulse = 1;
          if (d.pulse > 0) d.pulse = Math.max(0, d.pulse - 0.015);
        });
      }
      drawDots();
      if (!prefersReduced) requestAnimationFrame(step);
    };

    const init = () => { resize(); seedRoutes(); step(); };
    init();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); seedRoutes(); if (prefersReduced) step(); }, 120);
    });
  }
})();
