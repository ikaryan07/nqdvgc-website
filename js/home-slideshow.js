(function() {
  var GALLERY_PHOTOS = [
    'images/putting.png',
    'images/group-photo.png',
    'images/fairway-mates.png',
    'images/fourball-lake.png',
    'images/clubhouse.png',
    'images/on-green.png',
    'images/putt-mountains.png',
    'images/tee-swing.png',
    'images/carts.png',
    'images/adf-flag.png',
    'images/three-mates-flag.png',
    'images/bunker-shot.png',
    'images/atherton-grey.png',
    'images/ball-placement.png',
    'images/xmas-shirts.png',
    'images/putt-waterfront.png',
    'images/ball-wave.png',
    'images/drive-shot.png',
    'images/atherton-white.png',
    'images/barefoot-drive.png',
    'images/tee-shot.png'
  ];

  var INTERVAL_MS = 5000;

  function initHeroSlideshow(container) {
    if (!container || GALLERY_PHOTOS.length < 2) return;

    var slides = GALLERY_PHOTOS.map(function(src, i) {
      var slide = document.createElement('div');
      slide.className = 'hero-slide' + (i === 0 ? ' is-active' : '');
      slide.style.backgroundImage = "url('" + src + "')";
      container.appendChild(slide);
      return slide;
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var index = 0;
    var active = slides[0];

    window.setInterval(function() {
      index = (index + 1) % slides.length;
      var next = slides[index];
      active.classList.remove('is-active');
      next.classList.add('is-active');
      active = next;
    }, INTERVAL_MS);
  }

  document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow(document.querySelector('.hero-slides'));
  });
})();
