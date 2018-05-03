import { TweenMax, Back, Bounce, Elastic, TimelineLite } from 'gsap';
import $ from 'jquery';
import waitForImages from 'jquery.waitforimages';
import 'bootstrap';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';

import { FloatingLabelInput } from './floating-label';
import { LogoSlider, CardsSlider, DialogSlider } from './sliders';
import { NavigationBar } from './navigation';
import { Parallax } from './parallax';
import { Gallery } from './gallery';

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
  constructor(el) {
    this.el = el;
  }
  set(opts) {
    TweenMax.set(this.el, opts);
    return this;
  }
  from(duration, opts) {
    TweenMax.from(this.el, duration, opts);
    return this;
  }
  to(duration, opts) {
    TweenMax.to(this.el, duration, opts);
    return this;
  }
  fromTo(duration, opts) {
    TweenMax.fromTo(this.el, duration, opts);
    return this;
  }
  kill() {
    TweenMax.killTweensOf(this.el);
  }
}

/** Waits on finicky load timing for animation */
const onReadyToAnimate = () => {
  const $body = $(document.body);
  $body.addClass('loaded');
  setTimeout(() => $body.removeClass('loading loaded'), 600);
};

const $heroMoon = $(selector.HERO_MOON);

if ($heroMoon.length) {
  const moonAnimator = new Animator(el.HERO_MOON);
  const moonSwayEase = Elastic.easeOut.config(3, 0.4);
  moonAnimator.set({ opacity: 0 });

  const rocketAnimator = new Animator(el.ROCKET_SHIP);
  const rocketPathAnimator = new Animator(el.ROCKET_SHIP_PATH);
  const rocketBezier = {
    values: svg.ROCKET_PATH_BEZIER,
    type: 'cubic',
    autoRotate: true
  };
  rocketAnimator.set({ opacity: 0 });
  rocketPathAnimator.set({ opacity: 0 });

  /**
   * Starts rocket and moon animation and sets up listeners
   * to ensure animation is replayed on resize, debounced.
   **/
  const animateHero = () => {
    onReadyToAnimate();

    moonAnimator
      .set({ opacity: 1 })
      .from(2, { ease: Bounce.easeOut, transformOrigin: '50% 50%', y: '-150%' })
      .from(6, { ease: moonSwayEase, transformOrigin: '0 -150%', x: 75 })
      .from(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15 });

    rocketAnimator
      .to(0.5, { opacity: 1, delay: 1.5, ease: Linear.easeNone })
      .to(2, { bezier: rocketBezier, ease: Linear.easeNone, delay: 1.5 });

    rocketPathAnimator.to(4, { opacity: 1, delay: 2, ease: Linear.easeNone });

    const restartTweens = () => TweenMax.getAllTweens().map(tween => tween.restart());
    const debouncedRestart = debounce(restartTweens);
    $(window).on('resize', debouncedRestart);
  };

  /** Banner image loaded - ready for animation */
  $heroMoon.closest(selector.CONTENT_BLOCK).waitForImages(animateHero);
} else {
  /** No hero present – just remove white overlay */
  onReadyToAnimate();
}

/**
 * Checks if a collection of elements is on a page and runs init
 * functions for all elements if any are found.
 */
const initIfAvailable = (items, initFn) => items.length && [...items].forEach(initFn);

/**
 * Ready to initialize.
 */
$(document).ready(() => {
  /** Rotating client logos */
  const $logoSliders = $(selector.LOGO_SLIDER);
  initIfAvailable($logoSliders, slider => new LogoSlider(slider));

  /** Whole-panel slider with text card */
  const $cardsSliders = $(selector.CARDS_SLIDER);
  initIfAvailable($cardsSliders, slider => new CardsSlider(slider));

  /** Sliders in modal dialogs */
  const $dialogSliders = $(selector.DIALOG_SLIDER)
    .map((_, slider) => ({
      top: $(slider).find(selector.DIALOG_SLIDER_TOP),
      bottom: $(slider).find(selector.DIALOG_SLIDER_BOTTOM)
    }));
  initIfAvailable($dialogSliders, slider => new DialogSlider(slider));

  /** Photo galleries + generated dialogs/sliders */
  const $galleries = $(selector.GALLERY);
  initIfAvailable($galleries, gallery => new Gallery(gallery));

  /** Floating-label inputs */
  const $inputs = $(selector.CONTAINER_UNDERLINE)
    .filter(`:has(${selector.CONTROL_LABEL})`)
    .find(selector.CONTROL_UNDERLINE);
  initIfAvailable($inputs, input => new FloatingLabelInput(input));

  /** Main site navigation bar */
  const navigationBar = new NavigationBar(selector.NAVBAR_EL, {
    logoSelector: selector.NAVBAR_LOGO,
    offset: 400
  });

  /** Items in background for parallax effect */
  const parallaxItems = [...document.querySelectorAll(selector.PARALLAX)];
  if (parallaxItems.length) {
    const parallax = new Parallax(parallaxItems);
  }
});

$('#btnNext').on('click', function(e) {
  e.preventDefault();
  let stepContainer = this.parentNode;
  stepContainer.classList.add('inactive');
  stepContainer.classList.remove('active');
  stepContainer.nextElementSibling.classList.add('active');
});
