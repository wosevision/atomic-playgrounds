import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';
import waitForImages from 'jquery.waitforimages';
import 'bootstrap';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';

import MEDIA, { MediaAwareListener } from './media-query';
import svg, { Animator } from './animation';
import sliders, { LogoSlider, CardsSlider } from './sliders';
import nav, { NavigationBar } from './navigation';

import { debounce } from './utils';

window.jQuery = window.jQuery || $;
$.fn.waitForImages = $.fn.waitForImages || waitForImages;
fontawesome.library.add(solid, brands);

const HERO_MOON = document.querySelector('.hero-moon .jumbotron');
const moonAnimator = new Animator(HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);
moonAnimator.set({ opacity: 0 });

const ROCKET_SHIP = document.getElementById('rocket_ship');
const ROCKET_SHIP_PATH = document.getElementById('rocket_ship_path');
const rocketAnimator = new Animator(ROCKET_SHIP);
const rocketPathAnimator = new Animator(ROCKET_SHIP_PATH);
const rocketBezier = { values: svg.ROCKET_PATH_BEZIER, type: 'cubic', autoRotate: true };
rocketAnimator.set({ opacity: 0 });
rocketPathAnimator.set({ opacity: 0 })

// const mq = new MediaAwareListener();

/**
 * Banner image loaded - ready for animation
 */
$('.hero-moon')
  .closest('.content-block')
  .waitForImages(() => {
    const $body = $(document.body);
    $body.addClass('loaded');
    setTimeout(() => $body.removeClass('loading loaded'), 600);

    moonAnimator
      .set({ opacity: 1 })
      .from(2, { ease: Bounce.easeOut, transformOrigin: '50% 50%', y: '-150%' })
      .from(6, { ease: moonSwayEase, transformOrigin: '0 -150%', x: 75 })
      .from(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15, });

    rocketAnimator
      .to(0.5, { opacity: 1, delay: 1.5, ease: Linear.easeNone })
      .to(2, { bezier: rocketBezier, ease: Linear.easeNone, delay: 1.5 });

    rocketPathAnimator
      .to(4, { opacity: 1, delay: 2, ease: Linear.easeNone });

    const restartTweens = () => TweenMax.getAllTweens().map(tween => tween.restart());
    const debouncedRestart = debounce(restartTweens);
    $(window).on('resize', debouncedRestart);
  });

/**
 * Ready to initialize.
 */
$(document).ready(() => {
  if ($(sliders.LOGO_SLIDER).length) {
    const logoSlider = new LogoSlider();
  }
  if ($(sliders.CARDS_SLIDER).length) {
    const cardsSlider = new CardsSlider();
  }

  const navigationBar = new NavigationBar(nav.NAVBAR_EL, {
    logoSelector: nav.NAVBAR_LOGO,
    offset: 400
  });
});

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

$('#btnNext').on('click', function(e) {
  e.preventDefault();
  let stepContainer = this.parentNode;
  stepContainer.classList.add('inactive');
  stepContainer.classList.remove('active');
  stepContainer.nextElementSibling.classList.add('active');
})
