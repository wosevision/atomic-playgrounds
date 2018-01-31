import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';
import Swiper from 'swiper';

import MEDIA, { MediaAwareListener } from './media-query';
import SVG, { Animator } from './animation';

window.jQuery = window.jQuery || $;
import 'bootstrap';


/**
 * Ready to initialize.
 */
$(document).ready(() => {
  const SWIPER = '.swiper-container';
  const LOGO_SLIDER = `${SWIPER}.logo-slider`;
  const logoSlider = new Swiper(LOGO_SLIDER, {
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
    loop: true,
    navigation: {
      nextEl: `${LOGO_SLIDER} .swiper-button-next`,
      prevEl: `${LOGO_SLIDER} .swiper-button-prev`,
    }
  });
});

/**
 * All page contents loaded.
 */
$(window).on('load', () => {
  const $body = $(document.body);
  $body.addClass('loaded');
  setTimeout(() => $body.removeClass('loading loaded'), 600);
});

const HERO_MOON = document.querySelector('.hero-moon .jumbotron');
const moonAnimator = new Animator(HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);
moonAnimator.set({ opacity: 0 });

const ROCKET_SHIP = document.getElementById('rocket_ship');
const ROCKET_SHIP_PATH = document.getElementById('rocket_ship_path');
const rocketAnimator = new Animator(ROCKET_SHIP);
const rocketPathAnimator = new Animator(ROCKET_SHIP_PATH);
const rocketBezier = { values: SVG.ROCKET_PATH_BEZIER, type: 'cubic', autoRotate: true };
rocketAnimator.set({ opacity: 0 });
rocketPathAnimator.set({ opacity: 0 })

const mq = new MediaAwareListener(window, $);

mq.on(MEDIA.SM_UP, () => {
  moonAnimator
    .set({ opacity: 1 })
    .from(2, { ease: Bounce.easeOut, transformOrigin: '50% 50%', y: '-150%' })
    .from(6, { ease: moonSwayEase, transformOrigin: '0 -150%', x: 75 })
    .from(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15, });

  rocketAnimator
    .to(0.5, { opacity: 1, delay: 1.5, ease: Linear.easeNone })
    .to(2, { bezier: rocketBezier, ease: Linear.easeNone, delay: 1.5 });

  rocketPathAnimator.to(4, { opacity: 1, delay: 2, ease: Linear.easeNone });

  // $('.card-hover').on('mouseenter', function() {
  //   let box = this.querySelector('.card-hover-box')
  //   TweenMax.set(box, {
  //     fill: '#ffffff',
  //     attr: {
  //       d: 'M400,25.27c0,0-178.21,0-200,0s-200,0-200,0V400h400V25.27z'
  //     }
  //   })
  //   TweenMax.to(box, 1, {
  //     fill: '#0696fb',
  //     attr: {
  //       d: 'M400,25.27c0,0-57.72-15.27-200-15.27S0,25.27,0,25.27V400h400V25.27z'
  //     }
  //   })
  // });
});
