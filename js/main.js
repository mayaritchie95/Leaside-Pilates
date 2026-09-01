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
