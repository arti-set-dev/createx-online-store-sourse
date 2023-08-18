import { getCartItem } from "../functions/get-cart-item";
import { renderCard } from "../functions/render-card";
import { renderNotification } from "../functions/render-notification";

const updateWishlist = (currBtn, wishList) => {
  const wishItem = getCartItem(currBtn);

  if (currBtn.checked) {
    wishList.push(wishItem);
  } else {
    const currentIndex = wishList.findIndex(item => JSON.stringify(item) === JSON.stringify(wishItem));
    wishList.splice(currentIndex, 1);
  }

  updateWishlistCount(wishList)
  updateLocalStorage(wishList);
}

const updateWishlistCount = (wishList) => {
  document.querySelectorAll('[data-wishlist-count]')?.forEach(item => item.textContent = wishList.length);
}

const updateLocalStorage = (wishList) => {
  localStorage.setItem('wishList', JSON.stringify(wishList));
}

export const setCheckedState = (wishList) => {
  setTimeout(() => {
    wishList?.forEach(wishItem => {
      const cards = document.querySelectorAll('.card');
      for (let i = 0; i < cards.length; i++) {
        const currCard = cards[i];

        if (currCard.querySelector('.title').innerText === wishItem.title) {
          currCard.querySelector('.checkbox-wishlist').checked = true;
          break;
        }
      }
    });
  });
}

const wishlistInit = (wishList) => {
  setCheckedState(wishList);

  updateWishlistCount(wishList);
}

const deleteWishlist = (wishList) => {
  wishList.splice(0, wishList.length);
  document.querySelectorAll('.wishlist__item')?.forEach(item => item?.remove());
  updateWishlistCount(wishList);

  document.querySelector('.notification-text')?.remove();
  renderNotification(document.querySelector('.wishlist__content'), 'No products in favorites');
  updateLocalStorage(wishList);
}

document.addEventListener('DOMContentLoaded', () => {
  const wishList = JSON.parse(localStorage.getItem('wishList')) || [];

  wishlistInit(wishList);

  document.addEventListener('click', (e) => {
    if (e.target.closest('.checkbox-wishlist')) {
      const currBtn = e.target.closest('.checkbox-wishlist');
      updateWishlist(currBtn, wishList);
    }

    if (e.target.closest('[data-wishlist-delete]')) {
      deleteWishlist(wishList)
    }
  })

  if (location.pathname === '/createx-online-store/wishlist.html') {
    const wishListReverse = wishList.toReversed();
    wishListReverse?.forEach(wishItem => {
      renderCard(document.querySelector('.wishlist__content'), 'wishlist__item', wishItem);
    })

    if (wishListReverse.length === 0) {
      renderNotification(document.querySelector('.wishlist__content'), 'No products in favorites');
    }
  }
})
