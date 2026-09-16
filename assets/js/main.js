
(() => {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) root.dataset.theme = saved;

  const themeBtn = document.querySelector('[data-theme-toggle]');
  const setThemeIcon = () => {
    if (!themeBtn) return;
    themeBtn.textContent = root.dataset.theme === 'light' ? '☾' : '☀';
    themeBtn.setAttribute('aria-label', root.dataset.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  };
  setThemeIcon();

  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', root.dataset.theme);
    setThemeIcon();
  });

  const menu = document.querySelector('.nav-links');
  document.querySelector('[data-menu]')?.addEventListener('click', () => menu?.classList.toggle('open'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.1});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      card.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
    });
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
