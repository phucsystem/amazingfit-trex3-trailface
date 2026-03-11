/**
 * TrailFace — CJX Interactions & Watch Face Animations
 * CJX Stage: usage (primary watch face interaction)
 */

document.addEventListener('DOMContentLoaded', function () {
  /* CJX entrance animation */
  const entranceElements = document.querySelectorAll('[data-cjx-entrance]');
  entranceElements.forEach(function (element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.95)';
  });

  requestAnimationFrame(function () {
    entranceElements.forEach(function (element, index) {
      const delay = index * 100;
      setTimeout(function () {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
      }, delay);
    });
  });

  /* Animate SVG arcs on load — staggered for visual impact */
  const arcs = document.querySelectorAll('.arc-animated');
  arcs.forEach(function (arc, index) {
    const targetDasharray = arc.getAttribute('data-target-dasharray');
    if (targetDasharray) {
      const totalLength = parseFloat(arc.getAttribute('data-total-length')) || 502;
      arc.style.strokeDasharray = '0 ' + totalLength;
      arc.style.transition = 'stroke-dasharray 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      setTimeout(function () {
        arc.style.strokeDasharray = targetDasharray;
      }, 300 + (index * 200));
    }
  });

  /* Pulse animation for heart rate icon — rhythmic double-beat */
  const heartIcon = document.querySelector('.heart-pulse');
  if (heartIcon) {
    const pulse = function () {
      heartIcon.style.transition = 'transform 0.12s ease-out';
      heartIcon.style.transform = 'translate(148px, 258px) scale(1.2)';
      setTimeout(function () {
        heartIcon.style.transform = 'translate(148px, 258px) scale(1)';
        setTimeout(function () {
          heartIcon.style.transform = 'translate(148px, 258px) scale(1.1)';
          setTimeout(function () {
            heartIcon.style.transform = 'translate(148px, 258px) scale(1)';
          }, 120);
        }, 150);
      }, 120);
    };
    setInterval(pulse, 1200);
  }

  /* Watch screen ambient glow on load */
  const watchScreen = document.querySelector('.watch-screen');
  if (watchScreen) {
    watchScreen.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.15), 0 0 80px rgba(0, 229, 255, 0.08)';
    setTimeout(function () {
      watchScreen.style.transition = 'box-shadow 2s ease';
      watchScreen.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.05), 0 0 30px rgba(0, 0, 0, 0.3)';
    }, 2000);
  }
});
