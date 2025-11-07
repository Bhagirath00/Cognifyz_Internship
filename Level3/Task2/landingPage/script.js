// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.accordion .item .q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.item');
        const open = item.classList.contains('active');
        document.querySelectorAll('.accordion .item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.accordion .item .q').forEach(q => q.setAttribute('aria-expanded','false'));
        if (!open){
            item.classList.add('active');
            btn.setAttribute('aria-expanded','true');
        }
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const code = `function developFuture() {
  const skills = [
    'HTML5', 'CSS3',
    'JavaScript', 'React'
  ];
  
  const passion = true;
  const dedication = 100;
  
  if (passion && dedication) {
    return 'Success!';
  }
}

developFuture();`;

let i = 0;
function typeWriter() {
    if (i < code.length) {
        typingText.textContent += code.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 10);
    } else {
        counter.innerText = target;
    }
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            counter.innerText = '0';
            animateCounter(counter);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===== SCROLL ANIMATIONS =====
const observeElements = document.querySelectorAll('.benefit-card, .qualification-category, .contact-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

observeElements.forEach(el => {
    fadeInObserver.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LEARN MORE BUTTON =====
const learnMoreBtn = document.getElementById('learnMoreBtn');
learnMoreBtn.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

// ===== APPLICATION MODAL =====
const modal = document.getElementById('applicationModal');
const applyBtns = [
    document.getElementById('applyBtn'),
    document.getElementById('ctaApplyBtn')
];
const modalClose = document.querySelector('.modal-close');

applyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== FORM SUBMISSIONS =====
const applicationForm = document.getElementById('applicationForm');
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(applicationForm);
    const data = Object.fromEntries(formData.entries());
    
    // Show success message
    showNotification('Application submitted successfully! We will contact you soon.', 'success');
    
    // Close modal and reset form
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    applicationForm.reset();
    
    // Log data (in production, send to server)
    console.log('Application Data:', data);
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Show success message
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Log data (in production, send to server)
    console.log('Contact Data:', data);
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' : '#ff4444'};
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 242, 254, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            max-width: 400px;
            font-weight: 600;
        ">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" style="margin-right: 10px;"></i>
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== DOWNLOAD BROCHURE =====
const downloadBtn = document.getElementById('downloadBrochure');
downloadBtn.addEventListener('click', () => {
    showNotification('Brochure download will be available soon!', 'info');
    
    // In production, trigger actual download
    // window.location.href = '/path/to/brochure.pdf';
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== FORM VALIDATION =====
const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value) {
            input.style.borderColor = '#ff4444';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(255, 68, 68)') {
            input.style.borderColor = '';
        }
    });
});

// ===== EMAIL VALIDATION =====
const emailInputs = document.querySelectorAll('input[type="email"]');

emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value && !emailRegex.test(input.value)) {
            input.style.borderColor = '#ff4444';
            showNotification('Please enter a valid email address', 'error');
        }
    });
});

// ===== PHONE VALIDATION =====
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        // Allow only numbers, spaces, parentheses, and dashes
        let value = e.target.value.replace(/[^\d\s\(\)\-\+]/g, '');
        e.target.value = value;
    });
});

// ===== FILE UPLOAD HANDLING =====
const fileInput = document.getElementById('appResume');
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024; // Convert to MB
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            
            if (fileSize > 5) {
                showNotification('File size should not exceed 5MB', 'error');
                fileInput.value = '';
            } else if (!allowedTypes.includes(file.type)) {
                showNotification('Only PDF and Word documents are allowed', 'error');
                fileInput.value = '';
            } else {
                showNotification(`File "${file.name}" uploaded successfully!`, 'success');
            }
        }
    });
}

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===== CURSOR TRAIL EFFECT (Optional Enhancement) =====
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(0, 242, 254, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            animation: fadeOut 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        cursorTrail.push(trail);
        
        if (cursorTrail.length > trailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
});

// Add fadeOut animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(cursorStyle);

// ===== TECH BADGE HOVER EFFECT =====
const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ===== BENEFIT CARD STAGGER ANIMATION =====
const benefitCards = document.querySelectorAll('.benefit-card');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
            
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

benefitCards.forEach(card => {
    staggerObserver.observe(card);
});

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Cognifyz Technologies - Web Developer Internship', 'font-size: 20px; font-weight: bold; color: #00f2fe;');
console.log('%cInterested in the internship? Apply now at our landing page!', 'font-size: 14px; color: #4facfe;');
console.log('%cBuilt with ❤️ and modern web technologies', 'font-size: 12px; color: #b0b0b0;');

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
});

// ===== PREVENT CONTEXT MENU (Optional - for production) =====
// Uncomment if you want to disable right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ===== ACCESSIBILITY - Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add keyboard navigation styles
const a11yStyle = document.createElement('style');
a11yStyle.textContent = `
    body.keyboard-nav *:focus {
        outline: 2px solid #00f2fe !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(a11yStyle);

// ===== DARK MODE TOGGLE (Optional Enhancement) =====
// Uncomment if you want to add dark mode toggle
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
`;
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
*/

console.log('✅ All scripts loaded successfully!');
