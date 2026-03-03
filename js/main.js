/**
 * depan.be - Script principal
 */

function init() {
  initHeader();
  initMobileMenu();
  initContactForm();
  initActiveNav();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Animations au scroll - révèle les éléments à l'entrée dans le viewport
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// Marquer le lien actif dans la navigation
function initActiveNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const currentPage = (path === '/' || path === '') ? 'index.html' : path.split('/').pop() || 'index.html';

  nav.querySelectorAll('a[href]').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    const linkPage = href === '/' ? 'index.html' : href.replace(/^\//, '');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  if (!burger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (overlay) overlay.classList.remove('open');
  }

  function openMenu() {
    navLinks.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (overlay) overlay.classList.add('open');
  }

  burger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (navLinks.classList.contains('open')) closeMenu();
    else openMenu();
  });

  navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });

  if (overlay) overlay.addEventListener('click', closeMenu);
}

// Header scroll effect
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Contact form - prepare mailto with form data
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    const name = form.querySelector('[name="name"]')?.value;
    const phone = form.querySelector('[name="phone"]')?.value;
    const postal = form.querySelector('[name="postal"]')?.value;
    const email = form.querySelector('[name="email"]')?.value;
    const message = form.querySelector('[name="message"]')?.value;

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Contact depan.be - ${name}`);
    const body = encodeURIComponent(
      `Nom: ${name}\nTéléphone: ${phone}\nCode postal: ${postal}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    form.action = `mailto:info@depan.be?subject=${subject}&body=${body}`;
  });
}
