import vars from "../_vars";
import { disableScroll } from "../functions/disable-scroll";
import { enableScroll } from "../functions/enable-scroll";
import { isTablet } from '../functions/check-viewport';

const megamenu = () => {
  const megamenuList = document.querySelectorAll('.megamenu');

  const switchMenu = () => {
    vars.menuBtnElems?.forEach(btnEl => {
      if (btnEl !== document.activeElement) {
        const currMenu = btnEl?.closest('.header__middle-item').querySelector('.megamenu');

        btnEl?.classList.remove('header__middle-btn--active');
        currMenu?.classList.remove('megamenu--show');
      }
    })
  }

  const backMenu = () => {
    vars.menuBtnElems?.forEach(menuBtnEl => menuBtnEl?.classList.remove('header__middle-btn--active'));
    megamenuList?.forEach(megamenu => megamenu?.classList.remove('megamenu--show'));
  }

  const menuTopFixed = (menu, overlay) => {
    const headerCoord = vars.headerEl?.querySelector('.header__middle').getBoundingClientRect().bottom;

    if (!isTablet()) {
      if (menu) {
        menu.style.top = `${headerCoord}px`;
        overlay.style.top = `${headerCoord}px`;
      }
    }
  }

  const hideMenu = () => {
    vars.overlayEl?.classList.remove('overlay--show');
    vars.menuBtnElems?.forEach(menuBtnEl => menuBtnEl?.classList.remove('header__middle-btn--active'));
    megamenuList?.forEach(megamenu => megamenu?.classList.remove('megamenu--show'));
  }

  const toggleMenu = (btnEl) => {
    const currMenu = btnEl?.closest('.header__middle-item').querySelector('.megamenu');
    btnEl?.classList.toggle('header__middle-btn--active');
    currMenu?.classList.toggle('megamenu--show');

    if (currMenu?.classList.contains('megamenu--show')) {
      currMenu.scrollTop = 0;
      menuTopFixed(currMenu, vars.overlayEl);

      if (!vars.bodyEl.classList.contains('dis-scroll')) {
        disableScroll();

        vars.overlayEl?.classList.add('overlay--show');
      }
    } else {
      enableScroll();

      vars.overlayEl?.classList.remove('overlay--show');
    }

    switchMenu(btnEl);
  }

  vars.menuBtnElems?.forEach(btnEl => {
    btnEl?.addEventListener('click', () => {
      toggleMenu(btnEl);
    })
  })

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-back]')) {
      backMenu();
    }
  })

  vars.overlayEl?.addEventListener('click', () => {
    hideMenu();
  })
}

document.addEventListener('DOMContentLoaded', megamenu);
