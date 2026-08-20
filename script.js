/* =========================================================
   WebForSale — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky navbar shadow ---------- */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 8) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);

  /* ---------- Mobile hamburger menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const navbarNav = document.getElementById('navbarNav');

  navToggle.addEventListener('click', function () {
    const isOpen = navbarNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navbarNav.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Smooth scrolling for internal links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 76; // navbar height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Active navigation link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active-link');
      }
    });
  }
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  /* ---------- FAQ accordion ---------- */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(function (item) {
    const trigger = item.querySelector('.accordion__trigger');

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-delay');
          if (delay) {
            el.style.transitionDelay = delay + 'ms';
          }
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    animatedEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 480) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Contact form validation ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    field.closest('.form-group').classList.add('has-error');
    errorEl.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    field.closest('.form-group').classList.remove('has-error');
    errorEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.classList.remove('is-visible');

      const nameVal = document.getElementById('name').value.trim();
      const emailVal = document.getElementById('email').value.trim();
      const messageVal = document.getElementById('message').value.trim();

      let isValid = true;

      if (nameVal.length < 2) {
        showError('name', 'Please enter your full name.');
        isValid = false;
      } else {
        clearError('name');
      }

      if (!isValidEmail(emailVal)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('email');
      }

      if (messageVal.length < 10) {
        showError('message', 'Please write a message of at least 10 characters.');
        isValid = false;
      } else {
        clearError('message');
      }

      if (isValid) {
        formSuccess.classList.add('is-visible');
        contactForm.reset();
        setTimeout(function () {
          formSuccess.classList.remove('is-visible');
        }, 5000);
      }
    });

    // Clear errors as the user types
    ['name', 'email', 'message'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () {
        clearError(id);
      });
    });
  }

});
