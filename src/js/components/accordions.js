import Accordion from 'r-accordions';
import { isTablet } from "../functions/check-viewport";
const accordionFilters = new Accordion('.accordion-list--filters');
const accordionFaq = new Accordion('.accordion-list--faq');
const accordionProduct = new Accordion('.accordion-list--product');
const accordionPayment = new Accordion('.accordion-list--form-payment', {
  autoClose: true,
});

const switchCard = (currBtn) => {
  const radio = currBtn.querySelector('[type="radio"]');
  radio.checked = true;
}

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/catalog.html') {
    if (document.querySelectorAll('.accordion-list').length) {
      const accordionItems = document.querySelectorAll('.accordion-item');

      accordionItems?.forEach(accordionItem => {
        const accordionBtn = accordionItem?.querySelector('.accordion-btn');
        const accordionContent = accordionItem?.querySelector('.accordion-content');

        accordionContent?.classList.add('show');

        setTimeout(() => {
          accordionFilters.openAccordion(accordionBtn, accordionContent);
        }, 500);

        if (isTablet()) {
          document.querySelectorAll('[data-modal]')?.forEach(btnEl => {
            btnEl?.addEventListener('click', () => {
              setTimeout(() => {
                accordionFilters.openAccordion(accordionBtn, accordionContent);
              }, 200);
            })
          })
        }
      })
    }
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.form-payment__btn')) {
      const currBtn = e.target.closest('.form-payment__btn');
      switchCard(currBtn);
    }
  })
})
