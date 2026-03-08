const timers = {}

function toggleTimer(taskId) {
  if (!timers[taskId]) {
    timers[taskId] = {
      elapsed: 0,
      running: false,
      startTime: null
    }
  }

  if (timers[taskId].running) {
    timers[taskId].elapsed += Date.now() - timers[taskId].startTime;
    clearInterval(timers[taskId].interval);
    timers[taskId].running = false;
    document.getElementById(taskId).querySelector('button').textContent = 'Start';
  } else {
    timers[taskId].startTime = Date.now();
    timers[taskId].running = true;
    document.getElementById(taskId).querySelector('button').textContent = 'Stop';
    timers[taskId].interval = setInterval(() => {
      const total = timers[taskId].elapsed + (Date.now() - timers[taskId].startTime);
      const totalSec = Math.floor(total / 1000);
      const hr = Math.floor(totalSec / 3600);
      const min = Math.floor((totalSec % 3600) / 60);
      const sec = totalSec % 60;
      document.getElementById(taskId).querySelector('span').textContent =
        String(hr).padStart(2,'0') + ':' +
        String(min).padStart(2,'0') + ':' +
        String(sec).padStart(2,'0');
      updateGoals();
    }, 1000);
  }
}

function updateGoals() {
  const solaceTotal = timers['solace-study'] ? timers['solace-study'].elapsed + (timers['solace-study'].running ? Date.now() - timers['solace-study'].startTime : 0) : 0;
  const solaceMin = Math.floor(solaceTotal / 60000);
  const solacePct = Math.min((solaceMin / 120) * 100, 100);
  const solaceOffset = 220 - (220 * solacePct / 100);
  document.getElementById('solace-ring').style.strokeDashoffset = solaceOffse
