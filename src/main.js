import './style.css'

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate
document.querySelectorAll('section, .skill-card, .project-card, .glass').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const roles = [
  "Python Full Stack Developer",
  "Backend Architecture Specialist",
  "Professional Trainer & Mentor"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at the end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  // Use requestAnimationFrame style timing would be better but setTimeout is fine here
  setTimeout(type, typeSpeed);
}

// Start typing animation after a delay
if (typingText) {
  setTimeout(() => type(), 1000);
}

// Stats Count Up Animation
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const countTo = parseInt(target.innerText.replace('+', ''));
      let current = 0;
      const increment = countTo / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= countTo) {
          target.innerText = countTo + '+';
          clearInterval(timer);
        } else {
          target.innerText = Math.floor(current) + '+';
        }
      }, 30);
      statsObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Form Submission (Simulated)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
      btn.style.background = '#22c55e';
      if (typeof lucide !== 'undefined') lucide.createIcons();
      contactForm.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 3000);
    }, 1500);
  });
}
