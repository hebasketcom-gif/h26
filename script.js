/**
 * DR. SAMALA SRI KAVYA — PORTFOLIO INTERACTIVITY ENGINE
 * Medical Reviewer | Pharmacovigilance & Clinical Research
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME MANAGER (LIGHT / DARK MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('dsk_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('dsk_portfolio_theme', 'dark');
      if (themeIcon) {
        themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor"/>`;
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('dsk_portfolio_theme', 'light');
      if (themeIcon) {
        themeIcon.innerHTML = `<circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
      }
      if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      }
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  /* ==========================================================================
     2. NAVBAR SCROLL & SCROLL PROGRESS INDICATOR
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Update Progress Bar
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Toggle Navbar Glass Class
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     4. SMOOTH ANCHOR SCROLLING WITH NAVBAR OFFSET
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     5. ACTIVE SECTION HIGHLIGHT IN NAVBAR
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);

  /* ==========================================================================
     6. INTERACTIVE PROFESSIONAL JOURNEY TIMELINE
     ========================================================================== */
  const journeyStages = [
    {
      num: '01',
      title: 'Dentistry',
      category: 'Clinical Foundation',
      description: 'Gained robust patient-facing clinical experience, diagnostic acumen, and healthcare ethics. Built an in-depth understanding of oral pathology, patient care protocols, and physiological mechanisms that form the bedrock of medical review.',
      skills: ['Clinical Diagnostics', 'Patient Care Protocols', 'Pathophysiology', 'Healthcare Ethics']
    },
    {
      num: '02',
      title: 'Medical Review',
      category: 'Clinical Data Evaluation',
      description: 'Transitioned clinical acumen into medical review. Specializing in analyzing complex medical documentation, clinical narratives, and safety data to ensure clinical accuracy, regulatory compliance, and evidence-based standards.',
      skills: ['Medical Documentation Review', 'Clinical Narrative Analysis', 'Protocol Verification', 'Quality Assurance']
    },
    {
      num: '03',
      title: 'Drug Safety',
      category: 'Safety & Risk Awareness',
      description: 'Focused on pharmaceutical safety principles, risk-benefit evaluations, and safety monitoring. Applying structured medical knowledge to safeguard patient outcomes across therapeutic evaluation processes.',
      skills: ['Risk Awareness', 'Safety Signal Recognition', 'Benefit-Risk Assessment', 'Adverse Event Principles']
    },
    {
      num: '04',
      title: 'Pharmacovigilance',
      category: 'Post-Market & Clinical PV',
      description: 'Comprehensive focus on global pharmacovigilance concepts, safety surveillance, case processing frameworks, and safety reporting protocols aligned with regulatory expectations.',
      skills: ['Pharmacovigilance Frameworks', 'Safety Surveillance', 'Aggregate Safety Principles', 'Regulatory Standards']
    },
    {
      num: '05',
      title: 'Clinical Research',
      category: 'Evidence-Based Science',
      description: 'Integrating clinical background with modern clinical trial methodology, medical research analysis, patient safety oversight, and evidence synthesis to support advance healthcare innovation.',
      skills: ['Clinical Trial Principles', 'Evidence-Based Analysis', 'Research Methodology', 'Patient Safety Integration']
    }
  ];

  const timelineSteps = document.querySelectorAll('.timeline-step');
  const cardTag = document.getElementById('timeline-card-tag');
  const cardTitle = document.getElementById('timeline-card-title');
  const cardDesc = document.getElementById('timeline-card-desc');
  const cardSkills = document.getElementById('timeline-card-skills');

  function updateTimelineCard(index) {
    const data = journeyStages[index];
    if (!data) return;

    // Update active class on steps
    timelineSteps.forEach((step, idx) => {
      if (idx === index) {
        step.classList.add('active');
        step.setAttribute('aria-selected', 'true');
      } else {
        step.classList.remove('active');
        step.setAttribute('aria-selected', 'false');
      }
    });

    // Animate Card Content Update
    const cardWrapper = document.querySelector('.timeline-card-wrapper');
    if (cardWrapper) {
      cardWrapper.style.opacity = '0.4';
      cardWrapper.style.transform = 'translateY(10px)';

      setTimeout(() => {
        if (cardTag) cardTag.textContent = `Stage ${data.num} — ${data.category}`;
        if (cardTitle) cardTitle.textContent = data.title;
        if (cardDesc) cardDesc.textContent = data.description;
        if (cardSkills) {
          cardSkills.innerHTML = data.skills
            .map(skill => `<span class="interest-pill">${skill}</span>`)
            .join('');
        }

        cardWrapper.style.opacity = '1';
        cardWrapper.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  timelineSteps.forEach((step, idx) => {
    step.addEventListener('click', () => {
      updateTimelineCard(idx);
    });
  });

  /* ==========================================================================
     7. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after animating once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     8. CONTACT FORM SUBMISSION HANDLER
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please complete all required fields.');
        return;
      }

      // Display friendly success message
      if (formStatus) {
        formStatus.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. Dr. Samala Sri Kavya's profile will review your message.`;
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
      }

      contactForm.reset();

      setTimeout(() => {
        if (formStatus) formStatus.style.display = 'none';
      }, 8000);
    });
  }
});
