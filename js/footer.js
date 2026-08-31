document.getElementById('site-footer').innerHTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand">Leaside Pilates</div>
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
          <li><a href="contact.html#book">Book a Private</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4>Get in Touch</h4>
        <ul>
          <li><a href="tel:+16475509968">647-550-9968</a></li>
          <li><a href="mailto:iva.mazar@gmail.com">iva.mazar@gmail.com</a></li>
          <li><a href="contact.html#login">Log In / Sign Up</a></li>
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
