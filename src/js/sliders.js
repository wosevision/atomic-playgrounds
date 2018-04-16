import Swiper from 'swiper';
import $ from 'jquery';

import { selector } from './constants';

const UI_DEFAULTS = {
  keyboard: {
    enabled: true
  },
  grabCursor: true
}

export class LogoSlider extends Swiper {
  constructor() {
    super(selector.LOGO_SLIDER, {
      ...UI_DEFAULTS,
      autoplay: { delay: 0 },
      freeMode: true,
      slidesPerView: 6,
      spaceBetween: 50,
      speed: 3000,
      breakpoints: {
        992: {
          slidesPerView: 5,
          spaceBetween: 40
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 30
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      },
      lazy: true,
      loop: true
    });
  }
}

export class CardsSlider extends Swiper {
  constructor() {
    super(selector.CARDS_SLIDER, {
      ...UI_DEFAULTS,
      speed: 1000,
      loop: true,
      pagination: {
        el: selector.PAGINATION,
        dynamicBullets: true
      }
    });
    this.on('touchStart', () => {
      const grabbedIndex = this.activeIndex;
      const grabbedSlide = this.slides[grabbedIndex];
      const slideImg = grabbedSlide.querySelector('.card-img');
      const contentBlock = $(slideImg).closest('.content-block')[0];

      slideImg.style.transition = null;
      const onProgress = progress => {
        const numOfSlides = this.slides.length;
        const activeProgress = progress * (numOfSlides - 1) - grabbedIndex;
        slideImg.style.transform = `
            translateX(${activeProgress * -100}%)
            translateY(${Math.abs(activeProgress * 100) * -1}px)
            translateZ(${Math.abs(activeProgress * 200)}px)
            rotateY(${activeProgress * 180}deg)
          `;
        slideImg.style.opacity = 1 - Math.abs(activeProgress);
        contentBlock.style.backgroundPosition = `${50 * activeProgress}%`;
      };

      this.on('progress', onProgress);
      this.on('touchEnd', () => {
        slideImg.style.transition = '0.6s ease-in-out';
        slideImg.style.transform = slideImg.style.opacity = null;
        this.off('progress', onProgress);
      });
    });
  }
}

export class DialogSlider {
  constructor() {
    this.top = new Swiper(selector.DIALOG_SLIDER_TOP, {
      ...UI_DEFAULTS,
      spaceBetween: 10,
      navigation: {
        nextEl: `${selector.DIALOG_SLIDER_TOP} .swiper-button-next`,
        prevEl: `${selector.DIALOG_SLIDER_TOP} .swiper-button-prev`
      },
      observer: true,
      observeParents: true
    });
    this.bottom = new Swiper(selector.DIALOG_SLIDER_BOTTOM, {
      ...UI_DEFAULTS,
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true
    });

    this.top.controller.control = this.bottom;
    this.bottom.controller.control = this.top;
  }
}
