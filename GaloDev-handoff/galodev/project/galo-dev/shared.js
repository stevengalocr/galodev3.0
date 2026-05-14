// GaloDev — shared interactions
(function() {
  // Search modal
  const modal = document.getElementById('search-modal');
  const triggers = document.querySelectorAll('[data-search-trigger]');
  const closeBtn = document.getElementById('search-close');
  const input = document.getElementById('search-input');

  function open() {
    if (!modal) return;
    modal.classList.add('open');
    setTimeout(() => input && input.focus(), 50);
  }
  function close() {
    if (!modal) return;
    modal.classList.remove('open');
  }
  triggers.forEach(t => t.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); modal && modal.classList.contains('open') ? close() : open(); }
    if (e.key === 'Escape') close();
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  // Live counter increment
  document.querySelectorAll('[data-counter]').forEach(el => {
    let n = parseInt(el.textContent.replace(/,/g, ''), 10) || 0;
    setInterval(() => {
      n += Math.floor(Math.random() * 3) + 1;
      el.textContent = n.toLocaleString('en-US');
    }, 3500 + Math.random() * 2000);
  });
})();
