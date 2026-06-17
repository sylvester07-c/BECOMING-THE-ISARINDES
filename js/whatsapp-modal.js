// ── WHATSAPP MODAL ──
const hotels = {
  sunbeth: { name:'Sunbeth Star Event Center & Hotel', phone:'2348100810600' },
  royalbirds: { name:'Royal Birds Hotel & Towers', phone:'' }
};

let curMsg = '';
let curPhone = '';

const waModal = document.getElementById('waModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const copyMsgBtn = document.getElementById('copyMsgBtn');
const waMsgBox = document.getElementById('waMsg');
const modalSub = document.getElementById('modalSub');
const waLink = document.getElementById('waLink');

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const key = btn.getAttribute('data-modal');
    openModal(key);
  });
});

function openModal(key) {
  const h = hotels[key];
  curPhone = h.phone;
  curMsg = 
`Good day,

I am *[Your Full Name]* and I will be attending the *Wedding of Elisha & Goodnews Isarinde* on *Saturday, September 12, 2026* in Akure.

I would like to make a booking at ${h.name}:

• *Check-in Date:* Friday, September 11, 2026
• *Check-out Date:* Sunday, September 13, 2026 (2 nights)
• *Number of Rooms:* [State number]
• *Preferred Room Type:*
  [ ] Executive Suite — ₦80,000/night
  [ ] Royal Double — ₦40,000/night
  [ ] Royal Deluxe — ₦30,000/night
  [ ] Royal Medium — ₦25,000/night

I am part of the *Isarinde Wedding Group*. Please accommodate me with other wedding guests in the same wing or floor if possible.

Kindly confirm availability and payment details. Thank you!`;

  waMsgBox.textContent = curMsg;
  modalSub.textContent = `Send this to ${h.name} on WhatsApp`;
  
  const enc = encodeURIComponent(curMsg);
  waLink.href = curPhone ? `https://wa.me/${curPhone}?text=${enc}` : `https://wa.me/?text=${enc}`;
  
  waModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  waModal.classList.remove('open');
  document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeModal);
waModal.addEventListener('click', (e) => {
  if (e.target === waModal) closeModal();
});

copyMsgBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(curMsg).then(() => {
    if (window.showToast) window.showToast('Message Copied!');
  });
});
