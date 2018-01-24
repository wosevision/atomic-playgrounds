import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';

window.jQuery = window.jQuery || $;

const HERO_MOON = document.querySelector('.hero-moon');

const moonFall = TweenMax.from(HERO_MOON, 2, { ease: Bounce.easeOut, y: '-100%' }); //Elastic.easeOut.config(1.5, 1)
const moonSway = TweenMax.from(HERO_MOON, 6, {
  ease: Elastic.easeOut.config(3, 0.4), x: 75, transformOrigin: '0 -200%'
});
// const moonSway = TweenMax.fromTo(HERO_MOON, 6, {
//   ease: Elastic.easeIn.config(6), x: 100, transformOrigin: '0 -200%'
// }, {
//   ease: Elastic.easeOut.config(6), x: -50, transformOrigin: '0 -200%'
// });
