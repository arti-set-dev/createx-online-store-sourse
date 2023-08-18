import { parseImageSrc } from "./parse-image-src";
import { parseNumber } from "./parse-number";

export const getCartItem = (cardBtn) => {
  const currCard = cardBtn?.closest('.card');
  const image = parseImageSrc(currCard?.querySelector('img').getAttribute('src'));
  const title = currCard?.querySelector('.title').textContent;
  const defaultPrice = currCard?.querySelector('.price').textContent;
  const currPrice = currCard?.querySelector('.price').textContent;
  const oldPrice = currCard?.querySelector('.price').dataset.oldPrice;
  const size = currCard?.querySelector('[name="size"]:checked')?.value;
  const color = currCard?.querySelector('[name="color"]:checked')?.value;
  const count = '1';
  const discount = currCard?.querySelector('.discount')?.textContent;
  const rating = (currCard?.querySelector('.rating')) ? currCard?.querySelectorAll('.rating__star--noted')?.length : null;

  return {
    image: image,
    title: title,
    defaultPrice: defaultPrice,
    currPrice: currPrice,
    oldPrice: oldPrice,
    size: size,
    color: color,
    count: count,
    discount: discount,
    rating: rating
  }
}
