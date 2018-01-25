import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';

window.jQuery = window.jQuery || $;

class Animator {
  constructor(el) { this.el = el; }
  run(dur, opts) { TweenMax.from(this.el, dur, opts); return this; }
}

const HERO_MOON = document.querySelector('.hero-moon .jumbotron');
const moonAnimator = new Animator(HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);
moonAnimator
  .run(2, { ease: Bounce.easeOut, y: '-100%' })
  .run(6, { ease: moonSwayEase, transformOrigin: '0 -200%', x: 75 })
  .run(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15, });
