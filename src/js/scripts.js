import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';
import MEDIA, { MediaAwareListener } from './media-query';
import SVG, { Animator } from './animation';

window.jQuery = window.jQuery || $;

const HERO_MOON = document.querySelector('.hero-moon .jumbotron');
const moonAnimator = new Animator(HERO_MOON);
const moonSwayEase = Elastic.easeOut.config(3, 0.4);

const mq = new MediaAwareListener(window, $);

mq.on(MEDIA.SM_UP, () => {
  moonAnimator
    .from(2, { ease: Bounce.easeOut, transformOrigin: '50% 50%', y: '-150%' })
    .from(6, { ease: moonSwayEase, transformOrigin: '0 -150%', x: 75 })
    .from(6, { ease: moonSwayEase, transformOrigin: '50% 0', rotationX: 15, });

  TweenMax.to('#rocket_ship', 2, {
    bezier: {
      values: SVG.ROCKET_PATH_BEZIER,
      type:'cubic',
      autoRotate: true
    },
    ease: Linear.easeNone
  });
});
