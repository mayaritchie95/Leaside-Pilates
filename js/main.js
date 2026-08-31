// header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.mobile-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// reveal on scroll (breath motif)
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
} else {
  reveals.forEach(r => r.classList.add('in'));
}

// testimonials carousel
const track = document.querySelector('.testi-track');
if (track) {
  const cards = track.children.length;
  let i = 0;
  const step = () => {
    const card = track.children[0];
    const w = card.getBoundingClientRect().width + 24;
    const perView = Math.max(1, Math.floor(track.parentElement.clientWidth / w));
    const max = Math.max(0, cards - perView);
    i = Math.min(Math.max(i, 0), max);
    track.style.transform = `translateX(${-i * w}px)`;
  };
  document.querySelector('.testi-prev')?.addEventListener('click', () => { i--; step(); });
  document.querySelector('.testi-next')?.addEventListener('click', () => { i++; step(); });
  window.addEventListener('resize', step);
  step();
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const open = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', !open);
    const a = q.nextElementSibling;
    a.style.maxHeight = open ? null : a.scrollHeight + 'px';
  });
});

// team expandable bios
document.querySelectorAll('.team-card .more').forEach(btn => {
  btn.addEventListener('click', () => {
    const bio = btn.previousElementSibling;
    const open = bio.classList.toggle('open');
    btn.querySelector('.label').textContent = open ? 'Read less' : 'Read bio';
  });
});

// footer year
document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());
