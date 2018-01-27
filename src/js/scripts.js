import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';
import * as Media from './media-queries';
import { debounce } from './utils';

window.jQuery = window.jQuery || $;

class Animator {
  constructor(el) { this.el = el; }
  run(dur, opts) { TweenMax.from(this.el, dur, opts); return this; }
}

class MediaAwareInit {
  constructor(window, $) {
    this.matchMedia = window.matchMedia.bind(window);
    this.initFnMap = {};
    const reInit = debounce(this.checkAll, 400).bind(this);
    $(window).on('resize load', reInit);
  }
  on(mq, initFn) {
    this.initFnMap[mq] = initFn;
  }
  checkAll() {
    console.log('checkAll')
    for (const mq in this.initFnMap) {
      this.checkMatchMedia(mq);
    }
  }
  checkMatchMedia(mq) {
    this.matchMedia(mq).matches && this.initFnMap[mq]();
  }
}

const HERO_MOON = document.querySelector('.hero-moon .jumbotron');
const moonAnimator = new Animator(HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);

const mediaAwareInit = new MediaAwareInit(window, $);

mediaAwareInit.on(Media.SM_UP, () => {
  moonAnimator
    .run(2, { ease: Bounce.easeOut, transformOrigin: '50% 50%', y: '-150%' })
    .run(6, { ease: moonSwayEase, transformOrigin: '0 -150%', x: 75 })
    .run(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15, });
});
