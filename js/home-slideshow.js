(function() {
  var GALLERY_PHOTOS = [
    { src: 'images/group-photo.png', alt: 'Club members group photo on the green' },
    { src: 'images/adf-flag.png', alt: 'Member with the Australian Defence Force flag on the course' },
    { src: 'images/three-mates-flag.png', alt: 'Three mates walking to the flag' },
    { src: 'images/bunker-shot.png', alt: 'Member playing a bunker shot' },
    { src: 'images/putt-mountains.png', alt: 'Member putting with mountains in the background' },
    { src: 'images/fourball-lake.png', alt: 'Fourball group photo by the lake' },
    { src: 'images/atherton-grey.png', alt: 'Club team at Atherton Golf Club in grey polos' },
    { src: 'images/ball-placement.png', alt: 'Member placing the ball on the tee' },
    { src: 'images/xmas-shirts.png', alt: 'Christmas shirts fourball on the green' },
    { src: 'images/on-green.png', alt: 'Mates walking on the green together' },
    { src: 'images/tee-swing.png', alt: 'Member mid-backswing on the tee' },
    { src: 'images/clubhouse.png', alt: 'Members gathered at the clubhouse for a presentation' },
    { src: 'images/fairway-mates.png', alt: 'Two mates posing with clubs on the fairway' },
    { src: 'images/putt-waterfront.png', alt: 'Member putting on the waterfront course' },
    { src: 'images/putting.png', alt: 'Putting practice with palm trees in the background' },
    { src: 'images/ball-wave.png', alt: 'Member holding up a golf ball on the green' },
    { src: 'images/drive-shot.png', alt: 'Member mid-swing on the tee' },
    { src: 'images/atherton-white.png', alt: 'Club team at Atherton Golf Club in white polos' },
    { src: 'images/carts.png', alt: 'Members at the golf carts before a round' },
    { src: 'images/barefoot-drive.png', alt: 'Barefoot driving at a social event with the crowd watching' },
    { src: 'images/tee-shot.png', alt: 'Member hitting a tee shot on the fairway' }
  ];

  var INTERVAL_MS = 5000;

  function initSlideshow(container) {
    if (!container || GALLERY_PHOTOS.length < 2) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var slides = GALLERY_PHOTOS.map(function(photo, i) {
      var img = document.createElement('img');
      img.className = 'about-slide' + (i === 0 ? ' is-active' : '');
      img.src = photo.src;
      img.alt = photo.alt;
      img.width = 800;
      img.height = 800;
      if (i !== 0) img.setAttribute('aria-hidden', 'true');
      container.appendChild(img);
      return img;
    });

    if (reducedMotion) return;

    var index = 0;
    var active = slides[0];

    window.setInterval(function() {
      index = (index + 1) % slides.length;
      var next = slides[index];
      var nextPhoto = GALLERY_PHOTOS[index];

      next.src = nextPhoto.src;
      next.alt = nextPhoto.alt;
      next.removeAttribute('aria-hidden');
      active.setAttribute('aria-hidden', 'true');
      active.classList.remove('is-active');
      next.classList.add('is-active');
      active = next;
    }, INTERVAL_MS);
  }

  document.addEventListener('DOMContentLoaded', function() {
    initSlideshow(document.querySelector('.about-slideshow'));
  });
})();
