// Get our elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');

const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

// Build our functions
function togglePlay() {
  // HTML5 Video API, paused is a property that lives in the video tag
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
  // Or use a ternary operator, and replace the string to call each method (its a simple toggle after all)
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // Listen to the video state to update UI
}

// Update button
function updateButton() {
  // Ternary with both icons, video doesn't have a playing method, only paused
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log('Update the button');
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.value);
  // console.log(this.name);
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', e => {
//   if (mousedown) {
//     scrub(e);
//   }
// });
// If mouse is down returns true then it updates the position using scrub.
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
