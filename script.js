const timers = {}

function toggleTimer(taskId) {
  if (!timers[taskId]) {
    timers[taskId] = {
      sec: 0,
      min: 0,
      hr: 0,
      running: false
    }
  }
  if (timers[taskId].running) {
    clearInterval(timers[taskId].interval);
    timers[taskId].running = false;
    document.getElementById(taskId).querySelector('button').textContent = 'Start';
  } else {
    timers[taskId].running = true;
    document.getElementById(taskId).querySelector('button').textContent = 'Stop';
    timers[taskId].interval = setInterval(() => {
      timers[taskId].sec++;
      if (timers[taskId].sec === 60) {
        timers[taskId].sec = 0;
        timers[taskId].min++;
      }
      if (timers[taskId].min === 60) {
        timers[taskId].min = 0;
        timers[taskId].hr++;
      }
      document.getElementById(taskId).querySelector('span').textContent =
        String(timers[taskId].hr).padStart(2,'0') + ':' +
        String(timers[taskId].min).padStart(2,'0') + ':' +
        String(timers[taskId].sec).padStart(2,'0');
      updateGoals();
    }, 1000);
  }
}

function updateGoals() {
  const solaceSec = timers['solace-study'] ? timers['solace-study'].hr * 3600 + timers['solace-study'].min * 60 + timers['solace-study'].sec : 0;
  const solaceMin = Math.floor(solaceSec / 60);
  const solacePct = Math.min((solaceMin / 120) * 100, 100);
  const solaceOffset = 220 - (220 * solacePct / 100);
  document.getElementById('solace-ring').style.strokeDashoffset = solaceOffset;
  document.getElementById('solace-time').textContent = solaceMin + ' / 120 min';

  const readingSec = timers['reading-books'] ? timers['reading-books'].hr * 3600 + timers['reading-books'].min * 60 + timers['reading-books'].sec : 0;
  const readingMin = Math.floor(readingSec / 60);
  const readingPct = Math.min((readingMin / 45) * 100, 100);
  const readingOffset = 220 - (220 * readingPct / 100);
  document.getElementById('reading-ring').style.strokeDashoffset = readingOffset;
  document.getElementById('reading-time').textContent = readingMin + ' / 45 min';
}