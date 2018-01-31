import Swiper from 'swiper';

export const CONTAINER = '.swiper-container';
export const PAGINATION = '.swiper-pagination';

export const LOGO_SLIDER = `${CONTAINER}.logo-slider`;
export const CARDS_SLIDER = `${CONTAINER}.cards-slider`;

export class LogoSlider extends Swiper {
  constructor() {
    super(LOGO_SLIDER, {
      autoplay: { delay: 0 },
      freeMode: true,
      slidesPerView: 6,
      spaceBetween: 50,
      speed: 3000,
      breakpoints: {
        992: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        }
      },
      lazy: true,
      loop: true
    })
  }
};

export class CardsSlider extends Swiper {
  constructor() {
    super(CARDS_SLIDER, {
      speed: 1000,
      loop: true,
      pagination: {
        el: PAGINATION,
        dynamicBullets: true,
      }
    })
  }
}

export default {
  CONTAINER,
  PAGINATION,
  LOGO_SLIDER,
  CARDS_SLIDER
};
