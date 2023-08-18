// Данный файл - лишь собрание подключений готовых компонентов.
// Рекомендуется создавать отдельный файл в папке components и подключать все там

// Определение операционной системы на мобильных
import { mobileCheck } from "./functions/mobile-check";
console.log(mobileCheck())

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Реализация бургер-меню
import { burger } from './functions/burger';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();

// import ModalWindow from 'r-modalwindow';
// const modal = new ModalWindow([data-modal]);

// fslightbox
// require("fslightbox")

// const gallery = new FsLightbox();


// плагин menuAutofocus
// import MenuAutofocus from 'r-menuautofocus';
// const menuAutofocus = new MenuAutofocus('[data-burger]');

import menuAutofocus from "./functions/menu-autofocus";

// Плагин динамического адаптива
// import DynamicAdaptive from 'r-dynamicadaptive';
// const dynamicAdaptive = new DynamicAdaptive('[data-dynamic-state]');

// Реализация табов
// import GraphTabs from 'graph-tabs';
// const tabs = new GraphTabs('tab');
// Реализация табов (с поддержкой вертикальности)
// import GraphTabs from 'r-graph-tabs';
// const tabs = new GraphTabs('tab');

// Фиксированная шапка
import { headerFixed } from "./functions/header-fixed";

// Плагин аккордеонов
// import Accordion from 'r-accordions';
// const accordionList = new Accordion('.accordion-list');

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Подключение плагина кастом-скролла
import simpleBar from './functions/custom-scroll';

// Подключение плагина для позиционирования тултипов
// import { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// Подключение свайпера
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper(el, {
//   slidesPerView: 'auto',
// });

// плагин noUislider
// import noUislider from 'nouislider';
// const slider = document.querySelector('.slider');
// noUiSlider.create(slider, {
//   start: 50,
//   step: 1,
//   connect: [true, false],
//   range: {
//     'min': 10,
//     'max': 1000
//   },
// });

// плагин декоративных стрелочек leader-line
// import LeaderLine from 'leader-line-new';
// new LeaderLine(
//   document.getElementById('element-1'),
//   document.getElementById('element-2')
// );

// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();

import './functions/anim-scroll';

// video.js
// import videojs from 'video.js';
// const player = videojs(document.querySelector('.video-js'));

// Плагин choices.js
// import Choices from 'choices.js';
// const element = document.querySelector('.js-choice');
// const choices = new Choices(element);

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

import parallax from "./functions/parallax";

// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

import { smoothSrooll } from './functions/smooth-srooll';

// Вводятся только цифры
import { enterOnlyNumbers } from "./functions/enter-only-numbers";

// Показать/скрыть пароль
import { visiblePassword } from "./functions/visible-password";

// переключение активного класса
import { switchMenu } from "./functions/switch-menu";
// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// Удалить ошибки валидации
// import { removeValidation } from './functions/remove-validation';

import { validateForms } from './functions/validate-forms';

const emailRule = {
  ruleSelector: '.input--email',
  rules: [{
    rule: 'required',
    errorMessage: 'Fill in the field.',
  },
  {
    rule: 'email',
    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    errorMessage: 'Invalid address.',
  },]
}

const passwordRule = {
  ruleSelector: '.input--password',
  rules: [{
    rule: 'required',
    errorMessage: 'Fill in the field.',
  },]
}

const nameRule = {
  ruleSelector: '.input--empty',
  rules: [{
    rule: 'required',
    errorMessage: 'Fill in the field.',
  }]
}

const phoneRule = {
  ruleSelector: '.input--tel',
  tel: true,
  rules: [{
    rule: 'required',
    value: true,
    errorMessage: 'Fill in the field.',
  }]
}

const subjectRule = {
  ruleSelector: '.input--subject',
  rules: [{
    rule: 'required',
    errorMessage: 'Fill in the field.',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'At least 3 characters',
  }]
}

const zipcodeRule = {
  ruleSelector: '.input--zipcode',
  rules: [{
    rule: 'required',
    errorMessage: 'Fill in the field.',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'At least 3 characters',
  }]
}

const registrationRules = [
  nameRule,
  emailRule,
  {
    ruleSelector: '.input--password',
    rules: [{
      rule: 'required',
      errorMessage: 'Fill in the field.',
    },
    {
      rule: 'minLength',
      value: 8,
      errorMessage: 'Password is too short',
    },
    {
      rule: 'customRegexp',
      value: /[a-z]/gi,
      errorMessage: 'Weak password.',
    },]
  },
  {
    ruleSelector: '.input--passcon',
    rules: [{
      rule: 'required',
      errorMessage: 'Fill in the field.',
    },
    {
      validator: (value, fields) => {
        if (
          fields['.input--password'] &&
          fields['.input--password'].elem
        ) {
          const repeatPasswordValue =
            fields['.input--password'].elem.value;

          return value === repeatPasswordValue;
        }

        return true;
      },
      errorMessage: 'Passwords should be the same',
    },]
  },
];

const subscribeRules = [emailRule];
const authorizationRules = [emailRule, passwordRule];
const contactsRules = [nameRule, emailRule, phoneRule, subjectRule];
const checkoutRules = [nameRule, nameRule, emailRule, phoneRule];

const afterForm = () => {
  // console.log('Произошла отправка, тут можно писать любые действия');
};

validateForms('.arrivals__form', subscribeRules, afterForm);
validateForms('.subscribe__form', subscribeRules, afterForm);
validateForms('.modal__form--login', authorizationRules, afterForm);
validateForms('.modal__form--registration', registrationRules, afterForm);
validateForms('.contacts__form', contactsRules, afterForm);
validateForms('.checkout__form', checkoutRules, afterForm);
