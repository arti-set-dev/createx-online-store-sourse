import vars from '../_vars';
import Swiper, { Navigation, A11y, Pagination, EffectFade, Thumbs, Autoplay, Parallax } from 'swiper';
Swiper.use([Navigation, A11y, Pagination, EffectFade, Thumbs, Autoplay, Parallax]);

new Swiper(vars.promoSliderEl, {
  loop: true,
  autoplay: true,
  spaceBetween: 15,

  navigation: {
    nextEl: ".header__control--next",
    prevEl: ".header__control--prev",
  },
});

new Swiper(vars.heroSliderEl, {
  effect: 'fade',
  speed: 900,
  parallax: true,

  navigation: {
    nextEl: ".hero__control--next",
    prevEl: ".hero__control--prev",
  },

  pagination: {
    el: ".hero__pagination",
    clickable: true,
  },
});

new Swiper(vars.arrivalsSliderEl, {
  slidesPerView: location.pathname === '/product.html' ? 2 : 6,
  spaceBetween: 30,

  navigation: {
    nextEl: ".arrivals__control--next",
    prevEl: ".arrivals__control--prev",
  },

  pagination: {
    el: ".arrivals__slider-pagination",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: location.pathname === '/product.html' ? 1 : 1,
    },
    576: {
      slidesPerView: location.pathname === '/product.html' ? 2 : 2,
      spaceBetween: 16,
    },
    577: {
      slidesPerView: location.pathname === '/product.html' ? 1 : 2,
      spaceBetween: 16,
    },
    945: {
      slidesPerView: location.pathname === '/product.html' ? 2 : 3,
      spaceBetween: 16,
    },
    1119: {
      slidesPerView: location.pathname === '/product.html' ? 2 : 4,
      spaceBetween: 16,
    },
    1120: {
      slidesPerView: location.pathname === '/product.html' ? 2 : 4,
      spaceBetween: 16,
    },
    1400: {
      slidesPerView: location.pathname === '/product.html' ? 2 : 5,
      spaceBetween: 16,
    },
    1760: {
      slidesPerView: location.pathname === '/product.html' ? 2 : 6,
      spaceBetween: 30,
    },
  }
});

vars.productSliderElems?.forEach(productSliderEl => {
  new Swiper(productSliderEl, {
    slidesPerView: location.pathname === '/product.html' ? 4 : 3,
    spaceBetween: 30,
    slideToClickedSlide: false,

    navigation: {
      nextEl: ".products__control--next",
      prevEl: ".products__control--prev",
    },

    breakpoints: {
      0: {
        slidesPerView: location.pathname === '/product.html' ? 1 : 1,
      },
      576: {
        slidesPerView: location.pathname === '/product.html' ? 2 : 2,
        spaceBetween: 16,
      },
      850: {
        slidesPerView: location.pathname === '/product.html' ? 3 : 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: location.pathname === '/product.html' ? 3 : 3,
        spaceBetween: location.pathname === '/product.html' ? 15 : 15,
      },
      1200: {
        slidesPerView: location.pathname === '/product.html' ? 4 : 3,
        spaceBetween: location.pathname === '/product.html' ? 30 : 30,
      },
    }
  });
})

vars.cardSliderElems?.forEach(cardSliderEl => {
  new Swiper(cardSliderEl, {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    nested: true,

    navigation: {
      nextEl: ".card__control--next",
      prevEl: ".card__control--prev",
    },
  });
})

const thumbsSlider = new Swiper(vars.thumbsSliderEl, {
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,

  breakpoints: {
    0: {
      spaceBetween: 10,
    },
    769: {
      spaceBetween: 20,
    },
  }
});
new Swiper(vars.gallerySliderEl, {
  spaceBetween: 20,
  navigation: {
    nextEl: ".product__control--next",
    prevEl: ".product__control--prev",
  },
  thumbs: {
    swiper: thumbsSlider,
  },
});
