// ── COUNTDOWN TIMER ──
const countdownDate = new Date('2026-09-12T07:00:00').getTime();

const cD = document.getElementById('cD');
const cH = document.getElementById('cH');
const cM = document.getElementById('cM');
const cS = document.getElementById('cS');

function updateCountdown() {
  const now = new Date().getTime();
  const d = countdownDate - now;

  if (d <= 0) {
    if(cD) {
      cD.textContent = '0';
      cH.textContent = '0';
      cM.textContent = '0';
      cS.textContent = '0';
      clearInterval(timerInterval);
    }
    return;
  }

  const days = Math.floor(d / (1000 * 60 * 60 * 24));
  const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((d % (1000 * 60)) / 1000);

  if(cD) {
    // Simple DOM update, could add CSS transitions if values change
    if(cD.textContent !== days.toString()) cD.textContent = days;
    if(cH.textContent !== hours.toString()) cH.textContent = hours;
    if(cM.textContent !== minutes.toString()) cM.textContent = minutes;
    if(cS.textContent !== seconds.toString()) cS.textContent = seconds;
  }
}

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);
