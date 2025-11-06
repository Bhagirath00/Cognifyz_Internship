document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const transitionSpeed = document.getElementById('transitionSpeed');
  const transitionEffect = document.getElementById('transitionEffect');
  const progressBar = document.getElementById('progressFill');
  const currentSlide = document.getElementById('currentSlide');
  const totalSlides = document.getElementById('totalSlides');

  // State variables
  let currentSlideIndex = 0;
  let isPlaying = true;
  let slideInterval;
  let progressInterval;
  let progressWidth = 0;
  let transitionDuration = 3000; // Default 3 seconds

  // Initialize
  if (totalSlides) totalSlides.textContent = slides.length;
  updateSlideInfo();
  startSlideshow();
  startProgressBar();

  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));
  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
  if (transitionSpeed) transitionSpeed.addEventListener('change', updateTransitionSpeed);
  if (transitionEffect) transitionEffect.addEventListener('change', updateTransitionEffect);

  if (dots) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });
  }

  if (thumbnails) {
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => goToSlide(index));
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
      changeSlide(1);
    } else if (e.key === ' ') {
      togglePlayPause();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  });

  // Functions
  function changeSlide(direction) {
    // Reset progress bar
    resetProgressBar();

    // Remove active class from current slide
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.remove('active');
    }
    if (dots && dots[currentSlideIndex]) {
      dots[currentSlideIndex].classList.remove('active');
    }
    if (thumbnails && thumbnails[currentSlideIndex]) {
      thumbnails[currentSlideIndex].classList.remove('active');
    }

    // Update index
    currentSlideIndex += direction;

    // Handle wraparound
    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
      currentSlideIndex = slides.length - 1;
    }

    // Add active class to new slide
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.add('active');
    }
    if (dots && dots[currentSlideIndex]) {
      dots[currentSlideIndex].classList.add('active');
    }
    if (thumbnails && thumbnails[currentSlideIndex]) {
      thumbnails[currentSlideIndex].classList.add('active');
    }

    updateSlideInfo();
    startProgressBar();
  }

  function goToSlide(index) {
    if (index === currentSlideIndex) return;

    // Reset progress bar
    resetProgressBar();

    // Remove active class from current slide
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.remove('active');
    }
    if (dots && dots[currentSlideIndex]) {
      dots[currentSlideIndex].classList.remove('active');
    }
    if (thumbnails && thumbnails[currentSlideIndex]) {
      thumbnails[currentSlideIndex].classList.remove('active');
    }

    // Update index
    currentSlideIndex = index;

    // Add active class to new slide
    if (slides[currentSlideIndex]) {
      slides[currentSlideIndex].classList.add('active');
    }
    if (dots && dots[currentSlideIndex]) {
      dots[currentSlideIndex].classList.add('active');
    }
    if (thumbnails && thumbnails[currentSlideIndex]) {
      thumbnails[currentSlideIndex].classList.add('active');
    }

    updateSlideInfo();
    startProgressBar();
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;
    const icon = playPauseBtn ? playPauseBtn.querySelector('i') : null;

    if (isPlaying) {
      if (icon) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      }
      startSlideshow();
      startProgressBar();
    } else {
      if (icon) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      }
      stopSlideshow();
      stopProgressBar();
    }
  }

  function startSlideshow() {
    stopSlideshow();
    if (isPlaying) {
      slideInterval = setInterval(() => {
        changeSlide(1);
      }, transitionDuration);
    }
  }

  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  function startProgressBar() {
    stopProgressBar();
    if (!progressBar) return;

    progressWidth = 0;
    progressBar.style.width = '0%';

    progressInterval = setInterval(() => {
      if (isPlaying) {
        progressWidth += 100 / (transitionDuration / 100);
        progressBar.style.width = progressWidth + '%';

        if (progressWidth >= 100) {
          progressWidth = 0;
        }
      }
    }, 100);
  }

  function stopProgressBar() {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
  }

  function resetProgressBar() {
    if (progressBar) {
      progressWidth = 0;
      progressBar.style.width = '0%';
    }
  }

  function updateTransitionSpeed() {
    if (transitionSpeed) {
      transitionDuration = parseInt(transitionSpeed.value);
      startSlideshow();
    }
  }

  function updateTransitionEffect() {
    // This function can be expanded to handle different transition effects
    console.log('Transition effect changed to:', transitionEffect ? transitionEffect.value : 'unknown');
  }

  function updateSlideInfo() {
    if (currentSlide) {
      currentSlide.textContent = currentSlideIndex + 1;
    }
  }

  function toggleFullscreen() {
    const container = document.querySelector('.slideshow-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) { // Firefox
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) { // Chrome, Safari and Opera
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) { // IE/Edge
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
  }

  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    stopSlideshow();
    stopProgressBar();
  });
});