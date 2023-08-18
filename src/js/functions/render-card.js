import { calculateDiscount } from "./calculate-discount"
import { parseNumber } from "./parse-number"
import { renderRating } from "./render-rating"

export const renderCard = (target, cardWrapper, props) => {
  target.insertAdjacentHTML('afterbegin', `
  <li class="${cardWrapper}">
    <article class="card card--white card--abs wishlist__card">
      <div class="card__top">
        <a href="/createx-online-store/product.html" aria-label="Go to product page" class="card__link">
          <picture class="picture card__picture">
            <source srcset="${props.image}.avif" type="image/avif">
            <source srcset="${props.image}.webp" type="image/webp">
            <img loading="lazy" src="${props.image}.jpg" class="image" width="390" height="440" alt="${props.title}">
          </picture>
        </a>
        ${(props.oldPrice !== undefined && props.oldPrice !== null && props.oldPrice !== '$NaN') ? `<span class="discount card__discount">-${calculateDiscount(parseNumber(props.currPrice), parseNumber(props.oldPrice).toFixed(0))}%</span>` : ''}
        ${props.rating !== null ?
          `<ul class="list-reset rating card__rating">
            ${renderRating(props.rating)}
          </ul>` : ''}
        <input type="checkbox" name="wishlist" class="input-reset checkbox-wishlist card__wishlist" aria-label="Add to wishlist" ${location.pathname === '/wishlist.html' ? 'checked' : ''}>
      </div>
      <div class="card__bottom">
        <div class="card__head">
          <a href="/createx-online-store/product.html" aria-label="Go to product page" class="card__link card__link--title">
            <h3 class="title card__title">${props.title}</h3>
          </a>
          <span class="card__price price price--red ${location.pathname === '/catalog.html' ? '' : 'price--big'}" data-old-price="${'$' + parseNumber(props.oldPrice)?.toFixed(2)}">${'$' + parseNumber(props.currPrice)?.toFixed(2)}</span>
        </div>
        <div class="card__additional">
          <div class="card__options">
            <fieldset class="fieldset-reset card__fieldset">
              <input type="radio" name="size" value="36" class="input-reset radio-size card__radio">
              <input type="radio" name="size" value="37" class="input-reset radio-size card__radio">
              <input type="radio" name="size" value="38" class="input-reset radio-size card__radio">
              <input type="radio" name="size" value="39" class="input-reset radio-size card__radio">
            </fieldset>
            <fieldset class="fieldset-reset card__fieldset">
              <input type="radio" name="color" value="black" class="input-reset radio-color radio-color--black card__radio">
              <input type="radio" name="color" value="brown" class="input-reset radio-color radio-color--brown card__radio">
              <input type="radio" name="color" value="turquoise" class="input-reset radio-color radio-color--turquoise card__radio">
            </fieldset>
          </div>
          <button class="btn-reset btn-primary card__btn">
            <svg class="svg btn-primary__icon">
              <use xlink:href="img/sprite.svg#cart"></use>
            </svg>
            Add to&nbsp;cart
          </button>
        </div>
      </div>
    </article>
  </li>
  `)
}
