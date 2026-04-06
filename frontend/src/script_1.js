// ── ПОЯВЛЕНИЕ РАЗДЕЛОВ ПРИ ПРОКРУТКЕ ──
const sections = document.querySelectorAll('section');

const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: 0.08 }
);

sections.forEach(s => revealObs.observe(s));

// ── АНИМАЦИЯ ПОЛОСОК НАВЫКОВ ──
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-bars]').forEach(g => barObs.observe(g));
