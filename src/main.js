// CSS is now linked directly in index.html for compatibility with static hosting like GitHub Pages

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
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hero-content')) {
        // Higher-level stagger for hero
        const children = entry.target.querySelectorAll('.reveal-stagger');
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('active');
        });
      } else {
        entry.target.classList.add('active');
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Elements to animate
document.querySelectorAll('section, .project-card, .timeline-item, .training-card, .glass, .hero-content').forEach(el => {
  if (!el.classList.contains('hero-content')) {
    el.classList.add('reveal');
  }
  observer.observe(el);
});

// Typing Animation
const typingText = document.getElementById('typing-text');
const roles = [
  "Python Full Stack Developer",
  "Backend Developer ",
  "Trainer & Mentor"
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
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop redirect

    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = "Sending...";
    btn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
        btn.style.background = "#22c55e";
        if (typeof lucide !== 'undefined') lucide.createIcons();
        contactForm.reset();
      } else {
        btn.innerHTML = 'Error! <i data-lucide="alert-circle"></i>';
        btn.style.background = "#ef4444";
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    } catch (error) {
      btn.innerHTML = 'Failed <i data-lucide="x-circle"></i>';
      btn.style.background = "#ef4444";
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.disabled = false;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 4000);
  });
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const navOverlay = document.querySelector('.nav-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

if (menuToggle && navOverlay) {
  menuToggle.addEventListener('click', () => {
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  });
}

if (closeMenu && navOverlay) {
  closeMenu.addEventListener('click', () => {
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});
