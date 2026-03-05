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
    }, 1000);
  }
}