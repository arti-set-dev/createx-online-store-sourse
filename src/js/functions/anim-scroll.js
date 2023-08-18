export const animItemsScroll = () => {
  const animItems = Array.from(document.querySelectorAll('.anim-item'));

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-item--show');

        if (entry.target.classList.contains('anim-item--norepeat')) {
          observer.unobserve(entry.target);
        }
      } else {
        entry.target.classList.remove('anim-item--show');
      }
    })
  }

  const options = {
    threshold: 0,
  }

  const observer = new IntersectionObserver(callback, options);

  animItems?.forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', () => {
  animItemsScroll();
})
