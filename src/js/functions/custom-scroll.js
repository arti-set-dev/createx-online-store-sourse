import SimpleBar from 'simplebar';

Array.prototype.forEach.call(
  document.querySelectorAll('[data-simplebar]'),
  (el) => new SimpleBar(el, {
    autoHide: false,
  })
);
