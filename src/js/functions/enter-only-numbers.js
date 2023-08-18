import { allowNumbersOnly } from "../functions/allow-numbers-only";

export const enterOnlyNumbers = (className) => {
  const input = document.querySelector(className);

  input?.addEventListener('keypress', (e) => {
    allowNumbersOnly(e);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  enterOnlyNumbers('.input--zipcode');
})
//
