import vars from "../_vars";
import { getCartItem } from "../functions/get-cart-item";
import { parseNumber } from "../functions/parse-number";
import { stepper } from "./stepper";

const checkCardParams = (cardBtn) => {
  const currCard = cardBtn?.closest('.card');
  const sizeCheckboxes = Array.from(currCard?.querySelectorAll('[name="size"]'));
  const colorCheckboxes = Array.from(currCard?.querySelectorAll('[name="color"]'));

  const sizeChecked = sizeCheckboxes?.find(checkbox => checkbox.checked);
  const colorChecked = colorCheckboxes?.find(checkbox => checkbox.checked);

  if (!sizeChecked) sizeCheckboxes?.forEach(checkbox => checkbox.classList.add('card__radio--danger'));

  if (!colorChecked) colorCheckboxes?.forEach(checkbox => checkbox.classList.add('card__radio--danger'));

  if (sizeChecked && colorChecked) {
    return true;
  } else {
    return false;
  }
}

const removeErrors = (btnRadio) => {
  const sizeCheckboxes = Array.from(btnRadio?.closest('.card__fieldset').querySelectorAll('[type="radio"]'));
  sizeCheckboxes?.forEach(checkbox => checkbox?.classList.remove('card__radio--danger'));
}

export const getUniqueObjectsArray = (arr) => {
  let uniqueArray = [];

  arr.forEach(obj => {
    const isDuplicate = uniqueArray.some(uniqueObj =>
      JSON.stringify(uniqueObj) === JSON.stringify(obj)
    );

    if (!isDuplicate) {
      uniqueArray.push(obj);
    }
  });

  return uniqueArray;
}

const updateLocalStorage = (uniqueCartList) => {
  localStorage.setItem('cartList', JSON.stringify(uniqueCartList));
}

const updateCounter = (uniqueCartList) => {
  document.querySelectorAll('[data-cart-count]')?.forEach(elem => elem.textContent = uniqueCartList.length);
}

const renderCart = (image, title, price, oldPrice, size, color, count) => {
  return `
  <li class="cart__item">
    <a href="/createx-online-store/product.html" class="cart__link">
      <picture class="picture cart__picture">
        <source srcset="${image}.avif" type="image/avif">
        <source srcset="${image}.webp" type="image/webp">
        <img loading="lazy" src="${image}.jpg" class="image" width="80" height="80" alt="${title}">
      </picture>
    </a>
    <div class="cart__content">
      <div class="cart__content-head">
        <a href="/createx-online-store/product.html" class="cart__bold">${title}</a>
        <button type="button" class="btn-reset btn-delete" data-cart-delete>
          <svg class="svg btn-delete__icon btn-delete__icon--gray">
            <use xlink:href="img/sprite.svg#delete"></use>
          </svg>
        </button>
      </div>
      <div class="cart__content-params">
        <div class="cart__content-param">
          <span class="cart__inert">Color:</span>
          <span class="cart__desc">${color}</span>
        </div>
        <div class="cart__content-param">
          <span class="cart__inert">Size:</span>
          <span class="cart__desc">${size}</span>
        </div>
      </div>
      <div class="cart__content-inner">
        <div class="cart__content-btns">
          <div class="stepper cart__stepper">
            <label class="stepper__field cart__stepper-field">
              <input type="text" value="${count}" maxlength="2" class="stepper__input review__desc">
            </label>
            <div class="stepper__btns cart__stepper-btns">
              <button class="stepper__btn stepper__btn--up" aria-label="Increase Quantity">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99966 0.666992L12.6185 6.66699H3.38086L7.99966 0.666992Z" fill="#1E212C"></path>
                </svg>
              </button>
              <button class="stepper__btn stepper__btn--down stepper__btn--disabled"
                aria-label="Reduce the amount of">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99966 15.3337L3.38086 8.83366L12.6185 8.83366L7.99966 15.3337Z" fill="#1E212C"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span class="price price--red cart__price" data-old-price="${'$' + parseNumber(oldPrice)?.toFixed(2)}">${'$' + parseNumber(price)?.toFixed(2)}</span>
      </div>
      <a href="/createx-online-store/wishlist.html" class="cart__accent">Move to</a>
    </div>
  </li>`
}

const priceCalculation = (uniqueCartList) => {
  const priceList = uniqueCartList.map(cartItem => parseNumber(cartItem.currPrice));
  return priceList.reduce((sum, current) => sum + current, 0);
}

const renderTotalPrice = (totalPrice) => {
  document.querySelector('[data-total-price]').textContent = `$${totalPrice.toFixed(2)}`;
}

const updateTotalPrice = (uniqueCartList) => {
  const totalPrice = priceCalculation(uniqueCartList);
  renderTotalPrice(totalPrice);
}

const renderCartPrice = (newPrice, currBtn) => {
  if (currBtn.closest('.cart__item')) currBtn.closest('.cart__item').querySelector('.price').textContent = `$${newPrice.toFixed(2)}`;
}

const updateStepperPrice = (currBtn, cartList) => {
  const currCount = currBtn.closest('.stepper')?.querySelector('.stepper__input').value;
  const cartListEl = document?.querySelector('.cart__list');
  const btnDeleteIndex = Array.from(cartListEl.children)?.indexOf(currBtn.closest('.cart__item'));
  const defaultPrice = parseNumber(cartList[btnDeleteIndex]?.defaultPrice);
  const newPrice = defaultPrice * currCount;

  if (btnDeleteIndex !== -1) {
    cartList[btnDeleteIndex].currPrice = `${'$' + newPrice.toFixed(2)}`;
    cartList[btnDeleteIndex].count = currCount;
  }

  renderCartPrice(newPrice, currBtn);
  updateTotalPrice(cartList);
  updateLocalStorage(cartList);

}

const animToCart = (currBtn, parentSelector, selector, target, duration) => {
  const originalEl = currBtn.closest(parentSelector).querySelector(selector);
  const elemFly = currBtn.closest(parentSelector).querySelector(selector).cloneNode(true);
  const targetEl = document?.querySelector(target);

  const originalElTop = originalEl.getBoundingClientRect().top;
  const originalElLeft = originalEl.getBoundingClientRect().left;

  const targetElTop = targetEl.getBoundingClientRect().top;
  const targetElRight = targetEl.getBoundingClientRect().right;

  vars.bodyEl.append(elemFly);

  elemFly.style.cssText = `
    position: fixed;
    top: ${originalElTop}px;
    left: ${originalElLeft}px;
    width: ${originalEl.offsetWidth}px;
    height: ${originalEl.offsetHeight}px;
    opacity: 0.5;
    z-index: 20;
    transition: all ${duration}ms ease;
  `;

  setTimeout(() => {
    elemFly.style.left = `${targetElRight}px`;
    elemFly.style.top = `${targetElTop}px`;
    elemFly.style.width = '0px';
    elemFly.style.height = '0px';
  }, 0);

  setTimeout(() => {
    elemFly.remove();
  }, duration);
}

const addToCart = (cardBtn, cartList) => {
  const cartItemElems = document.querySelectorAll('.cart__item');
  const cartListEl = document.querySelector('.cart__list');

  const cartItem = getCartItem(cardBtn);
  cartList.push(cartItem);
  const uniqueCartList = getUniqueObjectsArray(cartList);

  updateLocalStorage(uniqueCartList);
  updateCounter(uniqueCartList);
  updateTotalPrice(uniqueCartList);

  animToCart(cardBtn, '.card', '.image', '.btn-cart', 500)

  const cartListReverse = uniqueCartList.toReversed();

  cartListReverse?.map(cartItem => {
    cartItemElems?.forEach(cartItemElem => cartItemElem?.remove());
    cartListEl?.insertAdjacentHTML('afterbegin', renderCart(cartItem.image, cartItem.title, cartItem.currPrice, cartItem.oldPrice, cartItem.size, cartItem.color, cartItem.count));
  })
}

const removeToCart = (btnDelete, cartList) => {
  const cartListEl = document.querySelector('.cart__list');
  const btnDeleteIndex = Array.from(cartListEl.children).indexOf(btnDelete.closest('.cart__item'));

  cartList.splice(btnDeleteIndex, 1);
  btnDelete.closest('.cart__item').remove();

  updateCounter(cartList);
  updateTotalPrice(cartList);
  updateLocalStorage(cartList);
}

const cartInit = (cartList) => {
  const cartListEl = document.querySelector('.cart__list');

  updateCounter(cartList);
  updateTotalPrice(cartList);

  const cartListRevesed = cartList.toReversed();

  cartListRevesed?.map(cartItem => {
    cartListEl?.insertAdjacentHTML('afterbegin', renderCart(cartItem.image, cartItem.title, cartItem.currPrice, cartItem.oldPrice, cartItem.size, cartItem.color, cartItem.count));
  })

  stepper();
}

document.addEventListener('DOMContentLoaded', () => {
  let cartList = JSON.parse(localStorage.getItem('cartList')) || [];
  cartInit(cartList);

  document.addEventListener('click', (e) => {
    cartList = JSON.parse(localStorage.getItem('cartList')) || [];

    if (e.target.closest('.card__btn')) {
      const cardBtn = e.target.closest('.card__btn');

      if (checkCardParams(cardBtn)) {
        addToCart(cardBtn, cartList);
        stepper();
      }
    }

    if (e.target.closest('.card__radio')) {
      const btnRadio = e.target.closest('.card__radio');

      removeErrors(btnRadio);
    }

    if (e.target.closest('[data-cart-delete]')) {
      const btnDelete = e.target.closest('[data-cart-delete]');

      removeToCart(btnDelete, cartList);
    }

    if (e.target.closest('.stepper__btn--up')) {
      const currBtn = e.target.closest('.stepper__btn--up');
      updateStepperPrice(currBtn, cartList);
    }

    if (e.target.closest('.stepper__btn--down')) {
      const currBtn = e.target.closest('.stepper__btn--down');
      updateStepperPrice(currBtn, cartList);
    }
  })

  document.addEventListener('change', (e) => {
    if (e.target.closest('.stepper__input')) {
      const currInputValue = e.target.closest('.stepper__input');
      updateStepperPrice(currInputValue, cartList);
    }
  })
})
