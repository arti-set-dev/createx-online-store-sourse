import noUislider from 'nouislider';
import vars from "../_vars";

const setValueInput = (unencoded) => {
  const leftInput = document.querySelector('.product-filter__input--left');
  const rightInput = document.querySelector('.product-filter__input--right');

  leftInput.value = unencoded[0].toFixed(0);
  rightInput.value = unencoded[1].toFixed(0);
}

if (vars.rangeSliderEl) {
  noUislider?.create(vars.rangeSliderEl, {
    start: [5, 500],
    connect: true,
    tooltips: true,
    range: {
      'min': 0,
      'max': 999
    },
    format: {
      to: function (value) {
        return '$' + parseFloat(value).toFixed(0);
      },
      from: function (value) {
        return parseFloat(value.replace('$', ''));
      }
    }
  });
}


vars.rangeSliderEl?.noUiSlider.on('update', (values, handle, unencoded) => {
  setValueInput(unencoded);
});

document.querySelector('.product-filter__input--left')?.addEventListener('change', function () {
  vars.rangeSliderEl?.noUiSlider.set([this.value, null]);
})

document?.querySelector('.product-filter__input--right')?.addEventListener('change', function () {
  vars.rangeSliderEl?.noUiSlider.set([null, this.value]);
})
