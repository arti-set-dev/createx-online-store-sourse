import vars from "../_vars";
import { parseNumber } from "../functions/parse-number";
import products from "../functions/products";
import { renderCard } from "../functions/render-card";
import { renderNotification } from "../functions/render-notification";
import { allowNumbersOnly } from "../functions/allow-numbers-only";
import { setCheckedState } from "./wishlist";

const toggleFilters = (currBtn) => {
  const filters = currBtn?.closest('.product-filter').querySelector('.product-filter__list');
  const catalogControl = vars.catalogContentEl?.querySelector('.catalog__control');
  const catalogList = vars.catalogContentEl?.querySelector('.catalog__list');

  if (currBtn.querySelector('.btn-primary__desc').textContent === 'Hide filters') {
    currBtn.querySelector('.btn-primary__desc').textContent = 'Show filters';

    filters?.classList.add('product-filter__list--hide');
    vars.catalogContentEl?.classList.add('catalog__content--large');
    catalogControl?.classList.add('catalog__control--ml');
    catalogList?.classList.add('catalog__list--column');
  } else {
    currBtn.querySelector('.btn-primary__desc').textContent = 'Hide filters';

    filters?.classList.remove('product-filter__list--hide');
    vars.catalogContentEl?.classList.remove('catalog__content--large');
    catalogControl?.classList.remove('catalog__control--ml');
    catalogList?.classList.remove('catalog__list--column');
  }
}

const capitalizeText = (text) => {
  if (typeof text !== 'string') {
    return false;
  }

  if (text.length === 0) {
    return false;
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const getDataFilter = (currLink) => {
  const currCategory = currLink?.closest('[data-category]');
  const menuListTitle = capitalizeText(currLink?.closest('[data-category]').querySelector('.megamenu__accent').textContent);
  const currLinkText = currLink.textContent;

  if (currCategory) {
    const menuList = Array.from(currCategory.querySelectorAll('.megamenu__link'));

    const menuListTextArr = menuList.map(item => item.textContent);

    localStorage.setItem('menuListTextArr', JSON.stringify(menuListTextArr));
    localStorage.setItem('menuListTitle', menuListTitle);
    localStorage.setItem('currLinkText', currLinkText);
  }
}

const countOccurrences = (word, array) => {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === word) {
      count++;
    }
  }
  return count;
}

const renderFilters = () => {
  const menuListTextArr = JSON.parse(localStorage.getItem('menuListTextArr'));
  const currLinkText = localStorage.getItem('currLinkText');
  const filterContent = document.querySelector('.simplebar-content');
  const filterBtnDesc = document?.querySelector('.product-filter__btn-desc');

  const menuListTextArrRevesed = menuListTextArr?.toReversed();

  if (filterBtnDesc) {
    filterBtnDesc.textContent = localStorage.getItem('menuListTitle');
  }

  menuListTextArrRevesed?.forEach((item) => {
    filterContent?.insertAdjacentHTML('afterbegin', `
    <li class="product-filter__content-item">
      <label class="label product-filter__label">
        <input type="checkbox" value="${item}" class="input-reset check-mark" ${item === currLinkText ? 'checked' : ''} data-filter-item>
        <span class="product-filter__desc">
          ${item}
          <span class="product-filter__count">(<span data-filter-count>${countOccurrences(item, products.map(product => product.category))}</span>)</span>
        </span>
      </label>
    </li>
    `)
  });
}

const filterInit = () => {
  const dataFilter = {};
  dataFilter.checkboxArr = [];

  renderFilters();
  filterCheckbox(dataFilter);

  return dataFilter;
}

const filterCheckbox = (dataFilter) => {
  const defaultCheckbox = localStorage.getItem('currLinkText');

  if (defaultCheckbox) dataFilter.checkboxArr.push(defaultCheckbox);

  let filteredProducts = products.filter(product => dataFilter.checkboxArr.includes(product.category));

  dataFilter.filteredProducts = filteredProducts.length !== 0 ? filteredProducts : products;

  if (filteredProducts.length === 0 && dataFilter.checkboxArr.length !== 0) {
    dataFilter.filteredProducts = products.filter(product => dataFilter.checkboxArr.includes(product.category));
  }

  filterPrice(dataFilter);
}

const updateFilterCheckbox = (dataFilter, currCheckbox) => {
  const defaultCheckbox = localStorage.getItem('currLinkText');
  const currCheckboxValue = currCheckbox.value;

  if (currCheckbox.checked) {
    dataFilter.checkboxArr.push(currCheckboxValue);
  } else {
    const currIndex = dataFilter.checkboxArr.indexOf(currCheckboxValue);
    dataFilter.checkboxArr.splice(currIndex, 1);
    if (currCheckboxValue === defaultCheckbox) {
      localStorage.removeItem('currLinkText');
    }
  }

  if (dataFilter.checkboxArr.length === 0) {
    dataFilter.filteredProducts = products;
  }

  filterCheckbox(dataFilter);
}

const filterPrice = (dataFilter) => {
  const rangeSliderStart = dataFilter.rangeSliderStart !== undefined ? dataFilter.rangeSliderStart : vars.rangeSliderEl?.noUiSlider.options.start;

  if (rangeSliderStart) {
    const filteredRangeProducts = dataFilter.filteredProducts?.filter(product => parseNumber(product.currPrice) >= rangeSliderStart[0] && parseNumber(product.currPrice) <= rangeSliderStart[1])

    dataFilter.filteredRangeProducts = filteredRangeProducts;
    dataFilter.rangeSliderStart = rangeSliderStart;
  }

  filterSort(dataFilter);
}

const updateFilterPrice = (dataFilter, unencoded) => {
  dataFilter.rangeSliderStart = unencoded;

  filterPrice(dataFilter, unencoded);
}

const filterSort = (dataFilter) => {
  const selectValue = dataFilter.selectSortValue === undefined ? document.querySelector('[name="sorting"]')?.querySelector('option').value : dataFilter.selectSortValue;
  const sortedProducts = dataFilter.filteredRangeProducts?.toSorted((a, b) => b[selectValue] - a[selectValue]);
  dataFilter.sortedProducts = sortedProducts;

  filterQuantity(dataFilter);
}

const updateSort = (dataFilter, selectSortValue) => {
  dataFilter.selectSortValue = selectSortValue;

  filterSort(dataFilter);
}

const filterQuantity = (dataFilter) => {
  const selectValue = dataFilter.selectQuantityValue === undefined ? document.querySelector('[name="quantity"]')?.querySelector('option').value : dataFilter.selectQuantityValue;
  document.querySelectorAll('.catalog__item')?.forEach(item => item?.remove());

  let productRevers = dataFilter.sortedProducts?.toReversed();

  const addition = productRevers?.length - selectValue;

  for (let index = 0; index < selectValue; index++) {
    const product = productRevers[index + addition];

    if (product) {
      renderCard(document.querySelector('.catalog__list'), 'catalog__item', product);
    }
  }

  document.querySelector('.notification-text')?.remove();
  if (productRevers?.length === 0) {
    renderNotification(document.querySelector('.catalog__list'), 'No products found');
  }

  const wishList = JSON.parse(localStorage.getItem('wishList'));
  setCheckedState(wishList);
}

const updateQuantity = (dataFilter, selectQuantityValue) => {
  dataFilter.selectQuantityValue = selectQuantityValue;

  filterQuantity(dataFilter);
}

document.addEventListener('DOMContentLoaded', () => {
  const dataFilter = filterInit();

  document.addEventListener('click', (e) => {
    if (e.target.closest('.megamenu__link')) {
      const currBtn = e.target.closest('.megamenu__link');
      getDataFilter(currBtn);
    }

    if (e.target.closest('.product-filter__btn-primary')) {
      const currBtn = e.target.closest('.product-filter__btn-primary');
      toggleFilters(currBtn);
    }

    if (e.target.closest('[data-filter-item]')) {
      const currCheckbox = e.target.closest('[data-filter-item]');
      updateFilterCheckbox(dataFilter, currCheckbox);
    }
  })

  vars.rangeSliderEl?.noUiSlider.on('change', (values, handle, unencoded) => {
    updateFilterPrice(dataFilter, unencoded);
  });

  document.addEventListener('change', function(e) {
    if (e.target.closest('[name="sorting"]')) {
      const selectValue = e.target.closest('[name="sorting"]')?.querySelector('option').value;
      updateSort(dataFilter, selectValue);
    }

    if (e.target.closest('[name="quantity"]')) {
      const selectValue = e.target.closest('[name="quantity"]')?.querySelector('option').value;
      updateQuantity(dataFilter, selectValue);
    }

    if (e.target.closest('.product-filter__input')) {
      const currValuePrice = vars.rangeSliderEl?.noUiSlider.get([this.value]);
      updateFilterPrice(dataFilter, currValuePrice);
    }
  })

  document.addEventListener('keypress', (e) => {
    if (e.target.closest('.product-filter__input')) {
      allowNumbersOnly(e);
    }
  })
})
