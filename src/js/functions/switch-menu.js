export const switchMenu = (menuItemClass) => {
  const menuItems = document.querySelectorAll(menuItemClass);
  menuItems?.forEach(item => {
    const itemHref = item?.getAttribute('href');

    if (location.pathname === itemHref) {
      item?.classList.add('account-control__link--active');
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  switchMenu('.account-control__link');
})
