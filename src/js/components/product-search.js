import vars from "../_vars";
import products from "../functions/products";

const filterArrayByInput = (array, inputValue) => {
  return array.filter(item => item.title.toLowerCase().includes(inputValue));
}

const renderSuggest = (target, props) => {
  target?.insertAdjacentHTML('afterbegin', `
  <li class="suggest__item">
    <a href="/createx-online-store/product.html" class="suggest__link" aria-label="Go to product page">
      <picture class="picture suggest__picture">
        <source srcset="${props.image}.avif" type="image/avif">
        <source srcset="${props.image}.webp" type="image/webp">
        <img loading="lazy" src="${props.image}.jpg" class="image" width="80" height="80" alt="${props.title}">
      </picture>
      <div class="suggest__content">
        <span class="suggest__accent">${props.title}</span>
        <span class="price price--red suggest__price" data-old-price="${props.oldPrice}">${props.currPrice}</span>
      </div>
    </a>
  </li>
  `)
}

const productSearch = (inputValue) => {
  let suggestArr = [];

  const suggestEl = document.querySelector('.suggest');

  if (inputValue !== '') {
    suggestArr = filterArrayByInput(products, inputValue);

    suggestEl?.classList.add('suggest--show');

    if (suggestArr.length !== 0) {
      suggestEl?.querySelector('.suggest__not-found')?.classList.remove('suggest__not-found--show');
    } else {
      suggestEl?.querySelector('.suggest__not-found')?.classList.add('suggest__not-found--show');
      vars.searchInputEl?.setAttribute('aria-label', 'Product not found');
    }

    document.querySelectorAll('.suggest__item')?.forEach(item => item?.remove());

    const suggestArrReverse = suggestArr.toReversed();

    suggestArrReverse.map(suggest => {
      renderSuggest(document.querySelector('.suggest__list'), suggest);
    })
  } else {
    suggestEl?.classList.remove('suggest--show');
  }
}

const showSuggest = (searchInput) => {
  if (searchInput.value !== '') {
    document.querySelector('.suggest')?.classList.add('suggest--show');
  }
}

const hideSuggest = () => {
  document.querySelector('.suggest')?.classList.remove('suggest--show');
}

const suggestSroll = (nextIndex, suggestItems) => {
  const suggestEl = document.querySelector('.suggest');
  const suggestCoord = suggestEl?.getBoundingClientRect().bottom;
  const suggestItemHeight = document.querySelector('.suggest__item--active')?.offsetHeight;
  const suggestItemAciveCoord = document.querySelector('.suggest__item--active')?.getBoundingClientRect().bottom;

  if (suggestItemAciveCoord > suggestCoord) {
    suggestEl.scrollTop += suggestItemHeight;
  } else {
    suggestEl.scrollTop -= suggestItemHeight;
  }

  if (nextIndex === 0) {
    suggestEl.scrollTop = 0;
  }

  if (nextIndex === suggestItems.length - 1) {
    suggestEl.scrollTop = suggestEl.scrollHeight;
  }
}

const switchToSuggest = (currCode) => {
  const suggestItems = Array.from(document.querySelectorAll('.suggest__item'));

  if (vars.searchInputEl.value !== '' && suggestItems.length) {
    let currIndex = suggestItems?.findIndex(item => item?.classList.contains('suggest__item--active'));
    let nextIndex;

    if (currCode === 'ArrowDown') {
      nextIndex = (currIndex === suggestItems.length - 1) ? nextIndex = 0 : currIndex + 1;
    }

    if (currCode === 'ArrowUp') {
      nextIndex = (currIndex === 0) ? nextIndex = suggestItems.length - 1 : currIndex - 1;
    }

    if (currCode === 'ArrowDown' || currCode === 'ArrowUp') {
      suggestItems[currIndex]?.classList.remove('suggest__item--active');
      suggestItems[nextIndex]?.classList.add('suggest__item--active');

      const suggestTitle = suggestItems[nextIndex]?.querySelector('.suggest__accent').textContent;
      vars.searchInputEl?.setAttribute('aria-label', suggestTitle);
      vars.searchInputEl.value = suggestTitle;

      setTimeout(() => {
        vars.searchInputEl.selectionStart = vars.searchInputEl.selectionEnd = vars.searchInputEl.value.length;
      }, 0);

      suggestSroll(nextIndex, suggestItems);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  vars.searchInputEl.addEventListener('keyup', (e) => {
    if (e.code !== 'ArrowDown' && e.code !== 'ArrowUp') {
      const inputValue = vars.searchInputEl?.value.toLowerCase();
      productSearch(inputValue);
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
      const currCode = e.code;
      switchToSuggest(currCode);
    }
  })

  vars.searchInputEl?.addEventListener('focus', (e) => {
    showSuggest(vars.searchInputEl);
  })

  vars.searchInputEl?.addEventListener('blur', (e) => {
    hideSuggest(vars.searchInputEl);
  })
})
