document.addEventListener('DOMContentLoaded', () => {
  // Hamburger / mobile nav
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => nav.classList.toggle('open'));
    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  // Smooth scroll with header offset
  const header = document.querySelector('.header');
  const offset = () => (header ? header.getBoundingClientRect().height : 0);
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - offset() - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Stat counters
  const stats = document.querySelectorAll('.stats .stat span[data-count]');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count || '0', 10);
    const duration = 1600;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / duration, 1);
      el.textContent = Math.floor(target * p).toString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.6 });
  stats.forEach(s => io.observe(s));

  // Apply form validation (basic)
  const form = document.getElementById('applicationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('fullName');
      const email = document.getElementById('email');
      const edu = document.getElementById('education');
      const msg = document.getElementById('message');
      const terms = document.getElementById('terms');

      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name.value.trim() || !validEmail.test(email.value.trim()) || !edu.value || !msg.value.trim() || !terms.checked) {
        alert('Please complete all required fields with valid information.');
        return;
      }
      alert('Thank you for your application! We will be in touch soon.');
      form.reset();
    });
  }

  // Newsletter form
  document.querySelectorAll('.newsletter').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = f.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        alert('Subscribed!');
        input.value = '';
      }
    });
  });
});
// FAQ accordion
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion .item .q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.item');
      if (!item) return;
      const open = item.classList.contains('active');
      // Close others
      document.querySelectorAll('.accordion .item').forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!open) item.classList.add('active');
    });
  });

  // Active nav state on scroll
  const links = document.querySelectorAll('.nav a');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const setActive = () => {
    const y = window.scrollY + (document.querySelector('.header')?.getBoundingClientRect().height || 0) + 16;
    let current = null;
    sections.forEach(sec => { if (sec.offsetTop <= y) current = sec; });
    if (!current) return;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current.id));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
});
