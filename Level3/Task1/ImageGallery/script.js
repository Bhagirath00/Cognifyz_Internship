// Image Gallery JavaScript Functionality
document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const gallery = document.getElementById('imageGallery');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewBtns = document.querySelectorAll('.view-btn');
  const searchInput = document.getElementById('searchInput');
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  const expandBtns = document.querySelectorAll('.expand-btn');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const loadingSpinner = document.querySelector('.loading-spinner');

  // Stats elements
  const totalImagesEl = document.getElementById('totalImages');
  const filteredImagesEl = document.getElementById('filteredImages');
  const favoriteCountEl = document.getElementById('favoriteCount');

  // Initialize stats
  let favoriteCount = 0;
  updateStats();

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get filter value
      const filter = this.getAttribute('data-filter');

      // Filter images
      filterImages(filter);
    });
  });

  // View mode functionality
  viewBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      viewBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Get view mode
      const view = this.getAttribute('data-view');

      // Change view mode
      changeViewMode(view);
    });
  });

  // Search functionality
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    searchImages(searchTerm);
  });

  // Favorite functionality
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const icon = this.querySelector('i');

      if (icon.classList.contains('far')) {
        // Add to favorites
        icon.classList.remove('far');
        icon.classList.add('fas');
        this.style.color = '#e74c3c';
        favoriteCount++;
      } else {
        // Remove from favorites
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.style.color = '';
        favoriteCount--;
      }

      updateStats();
    });
  });

  // Expand functionality (lightbox)
  expandBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const galleryItem = this.closest('.gallery-item');
      const imgSrc = galleryItem.querySelector('.thumbnail').getAttribute('data-full');
      const imgAlt = galleryItem.querySelector('.thumbnail').getAttribute('alt');

      openLightbox(imgSrc, imgAlt);
    });
  });

  // Thumbnail click opens lightbox
  thumbnails.forEach(img => {
    img.addEventListener('click', function () {
      const full = this.getAttribute('data-full') || this.getAttribute('src');
      const alt = this.getAttribute('alt') || '';
      openLightbox(full, alt);
    });
  });

  // Lightbox functionality
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Filter images
  function filterImages(category) {
    const items = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;

    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Update filtered images count
    if (filteredImagesEl) {
      filteredImagesEl.textContent = visibleCount;
    }
  }

  // Change view mode
  function changeViewMode(view) {
    if (view === 'list') {
      gallery.classList.add('list-view');
    } else {
      gallery.classList.remove('list-view');
    }
  }

  // Search images
  function searchImages(term) {
    const items = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;

    items.forEach(item => {
      const title = item.querySelector('h3').textContent.toLowerCase();
      const category = item.getAttribute('data-category');

      if (title.includes(term) || category.includes(term)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Update filtered images count
    if (filteredImagesEl) {
      filteredImagesEl.textContent = visibleCount;
    }
  }

  // Open lightbox
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxContent) return;

    // Show loading spinner
    if (loadingSpinner) {
      loadingSpinner.style.display = 'block';
    }

    // Create new image
    const img = new Image();
    img.src = src;
    img.alt = alt;

    img.onload = function () {
      // Hide loading spinner
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }

      // Set lightbox content
      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(img);

      // Set caption
      if (lightboxCaption) {
        lightboxCaption.textContent = alt;
      }

      // Show lightbox
      lightbox.classList.add('active');

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    };

    img.onerror = function () {
      // Hide loading spinner
      if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
      }

      // Show error message
      lightboxContent.innerHTML = '<p>Error loading image</p>';
      lightbox.classList.add('active');

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    };
  }

  // Close lightbox
  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('active');

    // Allow body scroll
    document.body.style.overflow = '';
  }

  // Update stats
  function updateStats() {
    // Update total images count
    const totalImages = document.querySelectorAll('.gallery-item').length;
    if (totalImagesEl) {
      totalImagesEl.textContent = totalImages;
    }

    // Update filtered images count (this should be updated when filtering)
    // For now, we'll just show the total
    if (filteredImagesEl) {
      const visibleImages = document.querySelectorAll('.gallery-item:not([style*="display: none"])').length;
      filteredImagesEl.textContent = visibleImages || totalImages;
    }

    // Update favorite count
    if (favoriteCountEl) {
      favoriteCountEl.textContent = favoriteCount;
    }
  }

  // Initialize animations
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, index) => {
    // Add staggered animation delay
    item.style.animationDelay = `${index * 0.1}s`;
  });

  // Simulate loading images
  setTimeout(() => {
    galleryItems.forEach(item => {
      item.style.opacity = '1';
    });
  }, 100);
});