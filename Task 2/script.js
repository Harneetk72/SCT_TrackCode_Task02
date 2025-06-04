(() => {
  const timeDisplay = document.getElementById('time-display');
  const startPauseBtn = document.getElementById('start-pause-btn');
  const lapBtn = document.getElementById('lap-btn');
  const resetBtn = document.getElementById('reset-btn');
  const lapsContainer = document.getElementById('laps');

  let startTime = 0;
  let elapsedTime = 0; // milliseconds
  let timerId = null;
  let isRunning = false;
  let lapTimes = [];

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    return (
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + '.' +
      String(milliseconds).padStart(3, '0')
    );
  }

  function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }

  function start() {
    startTime = Date.now() - elapsedTime;
    timerId = setInterval(() => {
      updateTime();
    }, 31); // update roughly 30fps
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.setAttribute('aria-pressed', 'true');
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  }

  function pause() {
    clearInterval(timerId);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.setAttribute('aria-pressed', 'false');
  }

  function reset() {
    clearInterval(timerId);
    elapsedTime = 0;
    isRunning = false;
    lapTimes = [];
    timeDisplay.textContent = '00:00.000';
    lapsContainer.innerHTML = '';
    startPauseBtn.textContent = 'Start';
    startPauseBtn.setAttribute('aria-pressed', 'false');
    lapBtn.disabled = true;
    resetBtn.disabled = true;
  }

  function recordLap() {
    lapTimes.push(elapsedTime);
    const lapNumber = lapTimes.length;
    const lapTime = elapsedTime;
    const lapElem = document.createElement('div');
    lapElem.className = 'lap';
    const lapNumSpan = document.createElement('span');
    lapNumSpan.className = 'lap-number';
    lapNumSpan.textContent = `Lap ${lapNumber}`;
    const lapTimeSpan = document.createElement('span');
    lapTimeSpan.className = 'lap-time';
    lapTimeSpan.textContent = formatTime(lapTime);
    lapElem.appendChild(lapNumSpan);
    lapElem.appendChild(lapTimeSpan);
    lapsContainer.insertBefore(lapElem, lapsContainer.firstChild);
  }

  startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  });

  resetBtn.addEventListener('click', () => {
    reset();
  });

  lapBtn.addEventListener('click', () => {
    if (isRunning) {
      recordLap();
    }
  });

})();