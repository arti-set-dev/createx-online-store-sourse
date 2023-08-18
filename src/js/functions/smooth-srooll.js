export const smoothSrooll = (e) => {
  const navBtnData = e.target.dataset.scroll;
  const btnToUp = document?.querySelector('[data-btn-up]');
  const anchor = document?.querySelector(`[data-anchor="${navBtnData}"]`);
  let anchorID;
  let distance;
  e.target != btnToUp ? anchorID = anchor?.getBoundingClientRect().top : anchorID = 0;
  const startPosition = window.scrollY;
  anchorID !== 0 ? distance = (anchorID - startPosition) + startPosition : distance = anchorID - startPosition;
  if (e.target.hasAttribute('data-scroll-bottom')) distance = (anchorID - startPosition) - (document.documentElement.clientHeight - anchor.offsetHeight);
  const duration = 1000;
  let start = null;
  window.requestAnimationFrame(animatate);
  function animatate(currentTime) {
    if (!start) {
      start = currentTime;
    }
    const progress = currentTime - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(animatate);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const scrollBtn = e.target.closest('[data-scroll]');
    const btnToUp = e.target.closest('[data-btn-up]');
    const timerString = getComputedStyle(document.documentElement).getPropertyValue('--ui-transition');
    const timerNum = parseFloat(timerString) * 1000;

    if (scrollBtn) {
      if (getComputedStyle(document.querySelector('.burger')).display != 'none') {
        setTimeout(() => {
          smoothSrooll(e);
        }, timerNum);
      } else {
        smoothSrooll(e);
      }
    }
    if (btnToUp) {
      btnToUp.disabled = true;
      setTimeout(() => {
        btnToUp.disabled = false;
      }, 1000);
      smoothSrooll(e);
    }
  })
})
