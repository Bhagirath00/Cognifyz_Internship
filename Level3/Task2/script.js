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
document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navList = document.querySelector('.nav-list');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const statNumbers = document.querySelectorAll('.stat-number');
  const skillLevels = document.querySelectorAll('.skill-level');
  const applicationForm = document.getElementById('applicationForm');

  // State variables
  let isDarkTheme = false;
  let isPlaying = true;
  let slideInterval;

  // Initialize
  animateStats();
  animateSkills();

  // Add back to top button
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Add testimonial carousel functionality
  const testimonials = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;

  function rotateTestimonials() {
    if (testimonials.length > 1) {
      testimonials.forEach((testimonial, index) => {
        testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
      });

      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
  }

  // Start testimonial rotation if there are testimonials
  if (testimonials.length > 1) {
    // Show first testimonial
    testimonials[0].style.display = 'block';

    // Rotate every 5 seconds
    slideInterval = setInterval(rotateTestimonials, 5000);
  }

  // Event Listeners
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  themeToggle.addEventListener('click', toggleTheme);

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      this.classList.add('active');

      // Close mobile menu if open
      if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll effect to header
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }

    // Animate elements when they come into view
    animateOnScroll();

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrollPosition = window.scrollY;
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });

  // Form submission
  if (applicationForm) {
    applicationForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Form validation
      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const terms = document.getElementById('terms').checked;

      if (!fullName || !email || !message || !terms) {
        alert('Please fill in all required fields and agree to the terms.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Simulate form submission
      alert('Thank you for your application! We will review it and get back to you soon.');
      applicationForm.reset();
    });
  }

  // Functions
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  }

  function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const icon = themeToggle.querySelector('i');

    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('dark-theme');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }

    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkTheme = true;
    document.body.classList.add('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  function animateSkills() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillLevels.forEach(skill => {
            const level = skill.getAttribute('data-level');
            skill.style.width = level;
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.qualifications');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }

  function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .testimonial-card, .contact-item');

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize animation styles
  const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .contact-item');
  animatedElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  // Newsletter form submission
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you for subscribing to our newsletter!');
      emailInput.value = '';
    });
  });

  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add animation to hero title when page loads
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 300);
  }

  // Add parallax effect to hero section
  window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;

    if (hero) {
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });
});