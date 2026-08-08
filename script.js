/**
 * Dr. Samala Sri Kavya — Professional Portfolio
 * Vanilla JavaScript Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE ENGINE (DARK / LIGHT MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or auto-detect system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', dark);
  }

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  });

  // --------------------------------------------------------------------------
  // 2. SCROLL PROGRESS BAR & HEADER SCROLLED STATE
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress');
  const siteHeader = document.getElementById('header');

  window.addEventListener('scroll', () => {
    // Progress calculation
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }

    // Header Shadow
    if (window.scrollY > 20) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  });

  // --------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION HAMBURGER MENU
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileNav(forceClose = false) {
    const isOpen = forceClose ? false : !mobileNav?.classList.contains('open');
    
    if (isOpen) {
      hamburgerBtn?.classList.add('open');
      mobileNav?.classList.add('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'true');
      mobileNav?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      hamburgerBtn?.classList.remove('open');
      mobileNav?.classList.remove('open');
      hamburgerBtn?.setAttribute('aria-expanded', 'false');
      mobileNav?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileNav());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(true));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      toggleMobileNav(true);
    }
  });

  // --------------------------------------------------------------------------
  // 4. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // --------------------------------------------------------------------------
  const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .zoom-in');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after revealing for performance
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => animationObserver.observe(el));

  // --------------------------------------------------------------------------
  // 5. ACTIVE NAVIGATION LINK HIGHLIGHTING
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35
  });

  sections.forEach(section => navObserver.observe(section));

  // --------------------------------------------------------------------------
  // 6. EXPERTISE DETAIL MODAL DATA & CONTROLLER
  // --------------------------------------------------------------------------
  const modalData = {
    'medical-review': {
      title: 'Medical Review',
      subtitle: 'Clinical & Documentation Accuracy',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>',
      content: `
        <p>Medical review connects healthcare expertise with structured clinical document evaluation. Dr. Samala Sri Kavya applies clinical precision to evaluate complex medical records, case safety reports, and trial data.</p>
        <p><strong>Key Focus Areas:</strong></p>
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Clinical terminology and diagnostic consistency</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Evaluation of patient history and therapeutic timelines</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Verification of clinical narrative accuracy and compliance</li>
        </ul>
      `
    },
    'drug-safety': {
      title: 'Drug Safety',
      subtitle: 'Therapeutic Risk & Benefit Evaluation',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      content: `
        <p>Pharmaceutical drug safety involves evaluating benefit-risk profiles throughout the lifecycle of medicinal products. Safety review safeguards patients against preventable adverse outcomes.</p>
        <p><strong>Key Focus Areas:</strong></p>
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Benefit-risk profile monitoring and evaluation</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Analysis of potential drug interactions and contraindications</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Commitment to patient-centered safety principles</li>
        </ul>
      `
    },
    'pharmacovigilance': {
      title: 'Pharmacovigilance',
      subtitle: 'Adverse Event & Safety Surveillance',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
      content: `
        <p>Pharmacovigilance is the science and activities relating to the detection, assessment, understanding, and prevention of adverse effects or any other drug-related problem.</p>
        <p><strong>Key Focus Areas:</strong></p>
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Adverse event (AE) and adverse drug reaction (ADR) assessment</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Signal detection support and medical narrative review</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Understanding regulatory safety monitoring frameworks</li>
        </ul>
      `
    },
    'clinical-research': {
      title: 'Clinical Research',
      subtitle: 'Evidence-Based Study Evaluation',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      content: `
        <p>Clinical research provides the scientific foundation for modern evidence-based care. Reviewing study protocols, methodologies, and findings ensures scientific integrity.</p>
        <p><strong>Key Focus Areas:</strong></p>
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Trial protocol and methodology appraisal</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Synthesis of scientific medical literature</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Evaluation of trial endpoint parameters</li>
        </ul>
      `
    },
    'healthcare': {
      title: 'Healthcare',
      subtitle: 'Interdisciplinary Clinical Perspective',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
      content: `
        <p>A holistic understanding of healthcare systems, patient care pathways, and clinical communication enhances quality across medical review domains.</p>
        <p><strong>Key Focus Areas:</strong></p>
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Interdisciplinary medical communication</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Patient safety culture and clinical governance</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Comprehensive understanding of treatment standards</li>
        </ul>
      `
    },
    'dentistry': {
      title: 'Dentistry',
      subtitle: 'Clinical Oral Healthcare Background',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      content: `
        <p>Clinical dental training forms the foundational bedrock of Dr. Samala Sri Kavya's medical expertise, instilling diagnostic precision and patient interaction experience.</p>
        <p><strong>Key Focus Areas:</strong></p>
        <ul>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Clinical oral diagnosis and patient treatment</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Pharmacology, local anesthesia, and oral pathology</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg> Patient empathy and clinical record management</li>
        </ul>
      `
    }
  };

  const modalOverlay = document.getElementById('expertise-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalIcon = document.getElementById('modal-icon');
  const modalBody = document.getElementById('modal-body');

  const expertiseCards = document.querySelectorAll('.expertise-card[data-modal]');

  function openModal(key) {
    const data = modalData[key];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalIcon) modalIcon.innerHTML = data.icon;
    if (modalBody) modalBody.innerHTML = data.content;

    modalOverlay?.classList.add('active');
    modalOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay?.classList.remove('active');
    modalOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  expertiseCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalKey = card.getAttribute('data-modal');
      if (modalKey) openModal(modalKey);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate professional form submission
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.setAttribute('disabled', 'true');
      submitBtn.innerHTML = '<span>Processing Inquiry...</span>';
    }

    setTimeout(() => {
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you for your message. Your inquiry has been logged successfully.';
      }
      contactForm.reset();
      
      if (submitBtn) {
        submitBtn.removeAttribute('disabled');
        submitBtn.innerHTML = `<span>Send Professional Inquiry</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      }
    }, 1000);
  });

  // --------------------------------------------------------------------------
  // 8. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
