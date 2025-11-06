document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('colorButton');
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, stars = [], starCount = 120; // tuned for perf
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function random255() { return Math.floor(Math.random() * 256); }

  function setButtonColor(r, g, b) {
    const rgb = `rgb(${r}, ${g}, ${b})`;
    btn.style.backgroundColor = rgb;

    // Auto-contrast for text (simple luminance check)
    const luminance = 0.2126*r + 0.7152*g + 0.0722*b;
    btn.style.color = luminance > 140 ? '#0f0f10' : '#ffffff';
  }

  btn.addEventListener('click', () => {
    setButtonColor(random255(), random255(), random255());
  });

  // Set an initial pleasant color
  setButtonColor(255, 255, 255);

  // --- Falling stars background ---
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function makeStar() {
    const size = Math.random() * 1.8 + 0.4; // 0.4 - 2.2px
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vy: Math.random() * 0.6 + 0.25,
      vx: (Math.random() - 0.5) * 0.15,
      size,
      alpha: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * 0.02 + 0.005
    };
  }

  function initStars() {
    stars = Array.from({ length: starCount }, makeStar);
  }
  initStars();

  function step() {
    ctx.clearRect(0, 0, W, H);
    // subtle vignette
    const g = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, Math.max(W,H)*0.7);
    g.addColorStop(0, 'rgba(255,255,255,0.0)');
    g.addColorStop(1, 'rgba(0,0,0,0.2)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);

    for (let s of stars) {
      s.y += s.vy;
      s.x += s.vx;
      s.alpha += (Math.random() - 0.5) * s.twinkle; // twinkle
      if (s.alpha < 0.1) s.alpha = 0.1; if (s.alpha > 0.8) s.alpha = 0.8;

      if (s.y > H + 4) { s.y = -4; s.x = Math.random()*W; }
      if (s.x < -4) s.x = W + 4; else if (s.x > W + 4) s.x = -4;

      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  // Button hover sparkle ring
  let hoverId = null;
  btn.addEventListener('mouseenter', () => {
    cancelAnimationFrame(hoverId);
    let t = 0;
    const ring = () => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width/2; const cy = rect.top + rect.height/2;
      const r = Math.max(rect.width, rect.height) * (0.6 + 0.15*Math.sin(t));
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();
      t += 0.15;
      hoverId = requestAnimationFrame(ring);
    };
    hoverId = requestAnimationFrame(ring);
  });
  btn.addEventListener('mouseleave', () => {
    cancelAnimationFrame(hoverId); hoverId = null;
  });
});