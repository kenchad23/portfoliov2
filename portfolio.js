/* SE1B 2250539 Icasiano Kenji 2025/07/30 */

/* ── Scroll-reveal ───────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── Nav: highlight active section ──────────────────────── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.menu a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.menu a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => activeObserver.observe(s));

/* ── Card tilt micro-interaction ────────────────────────── */
document.querySelectorAll('.card, .project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.width  / 2;
    const cy    = rect.height / 2;
    const dx    = (e.clientX - rect.left - cx) / cx;
    const dy    = (e.clientY - rect.top  - cy) / cy;
    card.style.transform = `perspective(600px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Typing effect for hero tagline ─────────────────────── */
const tagline = document.getElementById('hero-tagline');
if (tagline) {
  const text  = tagline.dataset.text || '';
  const speed = 38;
  tagline.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      tagline.textContent += text[i++];
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 1000);
}
