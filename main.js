// ── Countdown Timer ──
function updateCountdown() {
  const wedding = new Date('2027-05-19T00:00:00');
  const now = new Date();
  const diff = wedding - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll Animations ──
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-anim]').forEach((el) => {
  if (el.closest('.hero')) {
    setTimeout(() => el.classList.add('revealed'), 100);
  } else {
    animObserver.observe(el);
  }
});

// ── Nav background on scroll ──
const nav = document.getElementById('main-nav');

function updateNav() {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── RSVP Placeholder ──
function handleRSVP(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('#name').value;

  const button = form.querySelector('.rsvp__button');
  button.textContent = 'Confirmed!';
  button.style.background = 'var(--color-accent-deep)';
  button.disabled = true;

  // TODO: Replace with actual form submission (API endpoint)
  console.log('RSVP submitted:', {
    name: form.querySelector('#name').value,
    email: form.querySelector('#email').value,
    guests: form.querySelector('#guests').value,
    companion: form.querySelector('#companion').value,
    message: form.querySelector('#message').value,
  });

  setTimeout(() => {
    alert('Thank you, ' + name + '! Your attendance has been confirmed. See you in Bali!');
  }, 300);
}
