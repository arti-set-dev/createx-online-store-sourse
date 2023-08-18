import vars from '../_vars';

export const headerFixed = () => {
  const headerMiddle = vars.headerEl?.querySelector('.header__middle');
  const headerTop = vars.headerEl?.querySelector('.header__top');

  const headerMiddleHeight = headerMiddle?.clientHeight;
  const headerHeight = vars.headerEl?.clientHeight;
  const sectionHeight = 1200;

  const focusElements = [
    'a[href]',
    'input',
    'button',
    'select',
    'textarea',
    '[tabindex]'
  ]

  const focusheaderElements = headerMiddle.querySelectorAll(focusElements);

  let windowPosition = window.scrollY;

  if (windowPosition >= sectionHeight) {
    headerTop.style.marginBottom = `${headerMiddleHeight}px`;
    headerMiddle.classList.add('header__middle--fixed');
    headerMiddle.classList.add('fixed-block');
    headerMiddle.setAttribute('data-modal-fix', '')
    headerMiddle.style.transform = 'initial';

    focusheaderElements.forEach((focusEl) => {
      focusEl.disabled = false;
    })
  } else if (windowPosition >= headerHeight) {
    headerMiddle.classList.add('fixed-block');
    headerMiddle.style.transform = 'translateY(-100%)';
    focusheaderElements.forEach((focusEl) => {
      focusEl.disabled = true;
    })
  } else {
    if (!vars.bodyEl.classList.contains('dis-scroll')) {
      headerTop.removeAttribute('style');
      headerMiddle.classList.remove('fixed-block');
      headerMiddle.classList.remove('header__middle--fixed');
      headerMiddle.removeAttribute('data-modal-fix')
      headerMiddle.removeAttribute('style');

      focusheaderElements.forEach((focusEl) => {
        focusEl.disabled = false;
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  headerFixed();

  document.addEventListener('scroll', () => {
    headerFixed();
  })
})
