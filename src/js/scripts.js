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

import { LogoSlider, CardsSlider } from './sliders';
import { NavigationBar } from './navigation';
import { Parallax } from './parallax';

import { el, selector, svg } from './constants';
import { swingDown } from './animations';
import { debounce } from './utils';

window.jQuery = window.jQuery || $;
$.fn.waitForImages = $.fn.waitForImages || waitForImages;
fontawesome.library.add(solid, brands);

/**
 * Tiny proxy class for more terse method chaining on GSAP animations
 * that need to be applied in parallel to one element.
 */
class Animator {
  constructor(el) { this.el = el; }
  set(opts) { TweenMax.set(this.el, opts); return this; }
  from(duration, opts) { TweenMax.from(this.el, duration, opts); return this; }
  to(duration, opts) { TweenMax.to(this.el, duration, opts); return this; }
  fromTo(duration, opts) { TweenMax.fromTo(this.el, duration, opts); return this; }
  kill() { TweenMax.killTweensOf(this.el); }
}

const moonAnimator = new Animator(el.HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);
moonAnimator.set({ opacity: 0 });

const rocketAnimator = new Animator(el.ROCKET_SHIP);
const rocketPathAnimator = new Animator(el.ROCKET_SHIP_PATH);
const rocketBezier = { values: svg.ROCKET_PATH_BEZIER, type: 'cubic', autoRotate: true };
rocketAnimator.set({ opacity: 0 });
rocketPathAnimator.set({ opacity: 0 });

/**
 * Banner image loaded - ready for animation
 */
$(selector.HERO_MOON)
  .closest(selector.CONTENT_BLOCK)
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
  if ($(selector.LOGO_SLIDER).length) {
    const logoSlider = new LogoSlider();
  }
  if ($(selector.CARDS_SLIDER).length) {
    const cardsSlider = new CardsSlider();
  }
  if ($(selector.PARALLAX).length) {
    const parallax = new Parallax();
  }

  const navigationBar = new NavigationBar(selector.NAVBAR_EL, {
    logoSelector: selector.NAVBAR_LOGO,
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
