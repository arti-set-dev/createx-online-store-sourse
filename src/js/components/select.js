import Choices from 'choices.js';
const selectElems = document.querySelectorAll('.select');
selectElems?.forEach(select => {
  new Choices(select, {
    allowHTML: true,
    searchEnabled: false,
  });
})
