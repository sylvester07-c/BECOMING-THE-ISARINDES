// ── INITIALIZE LUCIDE ICONS ──
lucide.createIcons();

// ── SWIPER CAROUSEL (Around Akure) ──
document.addEventListener('DOMContentLoaded', () => {
  // Init places swiper
  const placesSwiper = new Swiper(".mySwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    grabCursor: true,
    breakpoints: {
      480: { slidesPerView: 1.5 },
      640: { slidesPerView: 2.2 }
    }
  });


});

// ── MOBILE NAV ──
const hamburger = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('open');
  if (mobileNav.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── NAV BAR SCROLL EFFECT ──
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(27,58,107,0.05)';
  } else {
    nav.style.boxShadow = 'none';
  }
  
  // Hide nav on scroll down, show on scroll up
  if (window.scrollY > lastScrollY && window.scrollY > 150) {
    nav.classList.add('nav-hidden');
  } else {
    nav.classList.remove('nav-hidden');
  }
  lastScrollY = window.scrollY;
});

// ── SCROLL PROGRESS BAR ──
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// ── FAQ ACCORDION ──
const faqQs = document.querySelectorAll('.faq-q');
if (faqQs.length > 0) {
  faqQs.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      // Close all others
      document.querySelectorAll('.faq-item').forEach(el => {
        if (el !== parent) el.classList.remove('open');
      });
      // Toggle clicked
      parent.classList.toggle('open');
    });
  });
}

// ── CLIPBOARD COPY (Gifts) ──
const copyAcctBtn = document.getElementById('copyAcctBtn');
if (copyAcctBtn) {
  copyAcctBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('1971083007').then(() => {
      showToast('Account Number Copied!');
    });
  });
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
window.showToast = showToast; // Expose globally for whatsapp modal
