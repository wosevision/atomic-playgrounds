import { TweenMax, Back, Bounce, Elastic, TimelineLite } from 'gsap';
import $ from 'jquery';
import waitForImages from 'jquery.waitforimages';
import 'bootstrap';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import brands from '@fortawesome/fontawesome-free-brands';

import { FloatingLabelInput } from './floating-label';
import { LogoSlider, CardsSlider } from './sliders';
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
 * Ready to initialize.
 */
$(document).ready(() => {
  const $logoSliders = $(selector.LOGO_SLIDER);
  if ($logoSliders.length) {
    [...$logoSliders].forEach(slider => new LogoSlider(slider));
  }

  const $cardsSliders = $(selector.CARDS_SLIDER);
  if ($cardsSliders.length) {
    [...$cardsSliders].forEach(slider => new CardsSlider(slider));
  }

  const $galleries = $(`${selector.GALLERY}`);
  if ($galleries.length) {
    [...$galleries].forEach(gallery => new Gallery(gallery));
  }

  const $inputs = $(selector.CONTAINER_UNDERLINE).filter(`:has(${selector.CONTROL_LABEL})`);
  if ($inputs.length) {
    $inputs.find(selector.CONTROL_UNDERLINE).each((_, input) => new FloatingLabelInput(input));
  }

  const navigationBar = new NavigationBar(selector.NAVBAR_EL, {
    logoSelector: selector.NAVBAR_LOGO,
    offset: 400
  });

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
