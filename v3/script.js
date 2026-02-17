document.addEventListener('DOMContentLoaded', () => {
  const snapContainer = document.getElementById('snapContainer');
  const dots = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('.snap-section');

  // ===== Update active dot on scroll =====
  if (snapContainer) {
    const updateDots = () => {
      const scrollTop = snapContainer.scrollTop;
      const viewHeight = snapContainer.clientHeight;

      sections.forEach((section, i) => {
        const top = section.offsetTop;
        if (scrollTop >= top - viewHeight / 2 && scrollTop < top + section.offsetHeight - viewHeight / 2) {
          dots.forEach((d) => d.classList.remove('active'));
          if (dots[i]) dots[i].classList.add('active');
        }
      });
    };

    snapContainer.addEventListener('scroll', updateDots, { passive: true });
    updateDots();

    // Dot click navigation
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href')?.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          snapContainer.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
      });
    });

    // Gallery link in hero -> scroll to gallery section
    const galleryLink = document.querySelector('a.btn-outline[href="#gallery"]');
    if (galleryLink) {
      galleryLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('gallery');
        if (target) {
          snapContainer.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
      });
    }
  }

  // ===== Lightbox =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('.carousel-item[data-src]').forEach((item) => {
    item.addEventListener('click', () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('active');
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
});
