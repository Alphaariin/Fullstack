// === 3 MINUTE COUNTDOWN ===
const COUNTDOWN_MS = 3 * 60 * 1000; // 3 minutes in milliseconds
let endTime = Date.now() + COUNTDOWN_MS;

const $ = (id) => document.getElementById(id);
const pad2 = (n) => String(n).padStart(2, "0");

function getTimeParts(ms) {
  const SEC = 1000;
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  const days = Math.floor(ms / DAY);
  const hours = Math.floor((ms % DAY) / HOUR);
  const minutes = Math.floor((ms % HOUR) / MIN);
  const seconds = Math.floor((ms % MIN) / SEC);

  return { days, hours, minutes, seconds };
}

function updateCountdown() {
  const diff = endTime - Date.now();

  if (diff <= 0) {
    $("days").textContent = "00";
    $("hours").textContent = "00";
    $("minutes").textContent = "00";
    $("seconds").textContent = "00";
    const msg = $("liveMessage");
    if (msg) {
      msg.hidden = false;
      msg.textContent = "💥 Time's up!";
    }
    document.title = "💥 Time's up!";
    clearInterval(timerId);
    return;
  }

  const { days, hours, minutes, seconds } = getTimeParts(diff);

  $("days").textContent = String(days);
  $("hours").textContent = pad2(hours);
  $("minutes").textContent = pad2(minutes);
  $("seconds").textContent = pad2(seconds);

  document.title = `⏳ ${pad2(minutes)}m ${pad2(seconds)}s – Timer`;
}

// Initial render + 1s interval
updateCountdown();
const timerId = setInterval(updateCountdown, 1000);
