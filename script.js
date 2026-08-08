/**
 * Dr. Samala Sri Kavya - Professional Portfolio Script
 * Medical Reviewer | Pharmacovigilance & Clinical Research
 * Fully Vanilla JS - No external libraries
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize features
  initThemeToggle();
  initScrollProgress();
  initNavbarBehavior();
  initMobileMenu();
  initScrollAnimations();
  initContactForm();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (LIGHT / DARK MODE) WITH LOCAL STORAGE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Read saved theme or default to light
  const savedTheme = localStorage.getItem('drsamala_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('drsamala_theme', newTheme);
  });
}

/* --------------------------------------------------------------------------
   2. SCROLL PROGRESS INDICATOR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight <= 0) return;
    
    const scrolledRatio = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrolledRatio))}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. NAVBAR STICKY GLASS & ACTIVE SECTION INDICATOR
   -------------------------------------------------------------------------- */
function initNavbarBehavior() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // IntersectionObserver for active section link highlighting
  const sectionObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* --------------------------------------------------------------------------
   4. MOBILE HAMBURGER MENU
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('mobile-hamburger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileOverlay) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mobileOverlay.classList.contains('active');
    
    if (isOpen) {
      mobileOverlay.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mobileOverlay.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   5. INTERSECTION OBSERVER SCROLL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Unobserve after triggering reveal for performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => animationObserver.observe(el));
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation check
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Display client-side success message
    contactForm.style.display = 'none';
    if (successMessage) {
      successMessage.style.display = 'block';
    }
  });
}

/* --------------------------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
