// ──────────────────────────────────────────
// NAVBAR: diventa opaca allo scroll
// ──────────────────────────────────────────
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
});

// Chiudi il menu mobile cliccando su un link
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ──────────────────────────────────────────
// SCROLL-REVEAL
// ──────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ──────────────────────────────────────────
// ANNO COPYRIGHT AUTOMATICO
// ──────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ──────────────────────────────────────────
// ACCORDION FAQ
// ──────────────────────────────────────────
document.querySelectorAll('.faq__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item   = trigger.closest('.faq__item');
    const isOpen = item.classList.contains('open');

    // Chiudi tutti
    document.querySelectorAll('.faq__item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.faq__trigger').setAttribute('aria-expanded', 'false');
    });

    // Apri quello cliccato (se era chiuso)
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});
