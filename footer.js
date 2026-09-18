document.getElementById('site-footer').innerHTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-newsletter">
      <div class="foot-news-copy">
        <h3>Stay in the loop</h3>
        <p>Sign up for news about our workshops, community events, and class promos.</p>
      </div>
      <div class="foot-news-form">
        <div id="momence-plugin-lead-form"></div>
        <p class="news-note">By signing up you'll hear about workshops, community events, and class promos.</p>
      </div>
    </div>
    <div class="foot-grid">
      <div>
        <div class="foot-brand"><span class="foot-brand-name">Leaside</span><span class="foot-brand-sub">Pilates</span></div>
        <p>A boutique Pilates &amp; Gyrotonic® studio in Toronto. Private sessions, duos, trios, and small group classes with experienced instructors.</p>
        <p style="margin-top:12px">28 Industrial St, Unit 108 &amp; 109<br>East York, ON, M4G 1Y9</p>
      </div>
      <div class="foot-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="private-pilates.html">Private Pilates</a></li>
          <li><a href="group-classes.html">Group Classes</a></li>
          <li><a href="gyrotonic.html">Gyrotonic®</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>Visit</h4>
        <ul>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="first-visit.html">New Here</a></li>
          <li><a href="pricing.html#faq">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>Get in Touch</h4>
        <ul>
          <li><a href="tel:+16475509968">647-550-9968</a></li>
          <li><a href="mailto:hello@leasidepilates.com">hello@leasidepilates.com</a></li>
          <li><a href="https://www.instagram.com/leasidepilates/" target="_blank" rel="noopener" class="ig-link" aria-label="Follow Leaside Pilates on Instagram"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg> <span>Instagram</span></a></li>
          <li><a href="login.html">Log In / Sign Up</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© <span class="yr"></span> Leaside Pilates. All rights reserved.</span>
      <span class="legal">
        <a href="privacy-policy.html">Privacy Policy</a>
        <a href="terms-of-use.html">Terms of Use</a>
        <a href="accessibility.html">Accessibility</a>
      </span>
    </div>
  </div>
</footer>`;
document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

// Load the Momence newsletter lead-form (injected scripts don't auto-run, so create it here)
(function () {
  var mount = document.getElementById('momence-plugin-lead-form');
  if (!mount || document.getElementById('momence-plugin-lead-form-src')) return;
  var s = document.createElement('script');
  s.async = true;
  s.type = 'module';
  s.id = 'momence-plugin-lead-form-src';
  s.setAttribute('host_id', '150866');
  s.setAttribute('fields', 'firstName,lastName,email,phoneNumber');
  s.setAttribute('token', 'Dg8yGl6Dj4');
  s.setAttribute('country_code', 'ca');
  s.setAttribute('data-field-def', '{"firstName":{"type":"text","label":"First name","required":true},"lastName":{"type":"text","label":"Last name","required":true},"email":{"type":"email","label":"Email","required":true},"phoneNumber":{"type":"phone-number","label":"Phone number","required":true}}');
  s.src = 'https://momence.com/plugin/lead-form/lead-form.js';
  document.body.appendChild(s);
})();
