/**
 * depan.be - Script principal
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initContactForm();
  initActiveNav();
  initScrollReveal();
});

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

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  // Close on link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') nav.classList.remove('open');
  });
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
