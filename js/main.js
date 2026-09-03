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

// testimonials: seamless auto-sliding marquee
const track = document.querySelector('.testi-track');
if (track) {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    // no animation: let it wrap/scroll naturally
    track.style.animation = 'none';
    track.style.flexWrap = 'wrap';
    track.style.justifyContent = 'center';
  } else {
    // duplicate the set once so the -50% keyframe loops seamlessly
    track.setAttribute('aria-hidden', 'false');
    const originals = Array.from(track.children);
    originals.forEach(node => {
      const clone = node.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    // scale duration to card count so speed feels consistent
    const perCard = 5; // seconds per card
    track.style.animationDuration = (originals.length * perCard) + 's';
  }
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

// team bios in a modal
(function(){
  const modal = document.getElementById('bio-modal');
  const dataEl = document.getElementById('bio-data');
  if(!modal || !dataEl) return;
  let bios={};
  try{ bios = JSON.parse(dataEl.textContent); }catch(e){ return; }
  const nameEl = document.getElementById('bio-modal-name');
  const roleEl = document.getElementById('bio-modal-role');
  const bodyEl = document.getElementById('bio-modal-body');
  let lastFocus = null;

  function open(key){
    const b = bios[key]; if(!b) return;
    nameEl.textContent = b.name;
    roleEl.textContent = b.role;
    bodyEl.innerHTML = '<p>' + String(b.bio).split('\n\n').join('</p><p>') + '</p>';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    modal.querySelector('.bio-modal-close').focus();
  }
  function close(){
    modal.hidden = true;
    document.body.style.overflow = '';
    if(lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('.team-card').forEach(card => {
    const key = card.getAttribute('data-bio');
    card.querySelectorAll('.bio-open').forEach(btn =>
      btn.addEventListener('click', () => open(key))
    );
  });
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !modal.hidden) close(); });
})();

// footer year
document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

// Hero video: reveal only once it can actually play; otherwise keep the photo fallback
(function(){
  const media = document.querySelector('.hero-media');
  const video = document.querySelector('.hero-video');
  if(!media || !video) return;
  const show = () => media.classList.add('video-ready');
  // If the source is missing/unsupported, 'canplay' never fires and the image stays.
  video.addEventListener('canplay', show, { once:true });
  video.addEventListener('error', () => media.classList.remove('video-ready'));
  // Respect reduced-motion: pause video, keep the still image
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    try{ video.pause(); video.removeAttribute('autoplay'); }catch(e){}
  }
})();

// Homepage intro form: route to the matching Momence booking
(function(){
  const form = document.getElementById('intro-form');
  if(!form) return;
  const EMAIL = 'mailto:iva.mazar@gmail.com?subject=Private%20Pilates%20Inquiry';
  const LINKS = {
    'Group reformer classes': 'https://momence.com/m/593017',
    'Private Pilates': EMAIL,
    'Duo or trio sessions': 'https://momence.com/m/595533',
    'Gyrotonic®': EMAIL,
    'Pre / postnatal Pilates': EMAIL,
    "I'm not sure yet": 'mailto:iva.mazar@gmail.com?subject=Getting%20Started%20at%20Leaside%20Pilates'
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const svc = form.querySelector('[name="service"]').value;
    const url = LINKS[svc] || 'mailto:iva.mazar@gmail.com';
    if (url.startsWith('mailto:')) { window.location.href = url; }
    else { window.open(url, '_blank', 'noopener'); }
  });
})();
