import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';
import MEDIA, { MediaAwareListener } from './media-query';

window.jQuery = window.jQuery || $;

/**
 * Tiny proxy class for more terse method chaining on GSAP animations
 * that need to be applied in parallel to one element.
 */
class Animator {
  constructor(el) { this.el = el; }
  set(opts) { TweenMax.set(this.el, opts); return this; }
  from(duration, opts) { TweenMax.from(this.el, dur, opts); return this; }
  to(duration, opts) { TweenMax.to(this.el, dur, opts); return this; }
  fromTo(duration, opts) { TweenMax.fromTo(this.el, dur, opts); return this; }
}

const HERO_MOON = document.querySelector('.hero-moon .jumbotron');
const moonAnimator = new Animator(HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);

const mq = new MediaAwareListener(window, $);

mq.on(MEDIA.SM_UP, () => {
  moonAnimator
    .from(2, { ease: Bounce.easeOut, transformOrigin: '50% 50%', y: '-150%' })
    .from(6, { ease: moonSwayEase, transformOrigin: '0 -150%', x: 75 })
    .from(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15, });

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
