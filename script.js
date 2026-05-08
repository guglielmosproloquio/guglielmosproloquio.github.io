// ──────────────────────────────────────────
// NAVBAR: diventa opaca allo scroll
// ──────────────────────────────────────────
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ──────────────────────────────────────────
// SCROLL-REVEAL
// ──────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ──────────────────────────────────────────
// ANNO COPYRIGHT AUTOMATICO
// ──────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ──────────────────────────────────────────
// FILTRO CATALOGO
// ──────────────────────────────────────────
const filterBtns  = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const countEl     = document.getElementById('visibleCount');

if (filterBtns.length) {

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Aggiorna stato bottoni
      filterBtns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      let visible = 0;

      productCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.classList.remove('is-hidden');
          visible++;
        } else {
          card.classList.add('is-hidden');
        }
      });

      // Aggiorna contatore
      if (countEl) {
        countEl.style.opacity = '0';
        setTimeout(() => {
          countEl.textContent = visible;
          countEl.style.opacity = '1';
        }, 200);
      }
    });
  });
}

// ──────────────────────────────────────────
// FILTRO DA URL (es. catalogo.html?categoria=anelli)
// ──────────────────────────────────────────
const params   = new URLSearchParams(window.location.search);
const catParam = params.get('categoria');

if (catParam && filterBtns.length) {
  const target = document.querySelector(
    `.filter-btn[data-filter="${catParam}"]`
  );
  if (target) target.click(); // simula il click sul filtro corretto
}

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