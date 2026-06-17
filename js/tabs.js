// ── TABS LOGIC (TRAVEL) ──
document.addEventListener('DOMContentLoaded', () => {
  const tBtns = document.querySelectorAll('.t-btn');
  const tPanels = document.querySelectorAll('.t-panel');
  const tabIndicator = document.getElementById('tabIndicator');

  function updateIndicator(btn) {
    if (!tabIndicator || !btn) return;
    tabIndicator.style.width = `${btn.offsetWidth}px`;
    tabIndicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  }

  // Init indicator
  const activeBtn = document.querySelector('.t-btn.active');
  if (activeBtn) updateIndicator(activeBtn);

  // Handle window resize for indicator
  window.addEventListener('resize', () => {
    const act = document.querySelector('.t-btn.active');
    if (act) updateIndicator(act);
  });

  tBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from all
      tBtns.forEach(b => b.classList.remove('active'));
      tPanels.forEach(p => p.classList.remove('active'));

      // Add active to clicked
      const targetId = btn.getAttribute('data-target');
      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if(targetPanel) targetPanel.classList.add('active');

      updateIndicator(btn);
    });
  });
});
