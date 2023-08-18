import JustValidate from 'just-validate';
import Inputmask from "inputmask";
// import MaskPhone from 'r-phonemask';

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    // console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+1 (999) 999-9999');
    inputMask.mask(telSelector);
    // const maskPhone = new MaskPhone('.tel');

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
            // const phone = form.querySelector('.tel');
            // let length;

            // if (phone.getAttribute('maxlength') == 18) {
            //   length = 18;
            // }
            // if (phone.getAttribute('maxlength') == 17) {
            //   length = 17;
            // }

            // if (phone.getAttribute('maxlength') == 13) {
            //   length = 13;
            // }
            // return phone.value.length === length;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  const validation = new JustValidate(selector, {
    errorLabelStyle: {
      color: '#FF4242'
    },
  });

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    let formData = new FormData(ev.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  })
};
