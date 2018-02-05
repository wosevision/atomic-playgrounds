import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';

export class NavigationBar {
  constructor(el, offset) {
    this.el = el;
    this.offset = offset;
    this.navScrolled = false;

    $(document.body).scroll(event => this.handleScroll(event));
  }
  handleScroll(event) {
    if (this.navScrolled) return;
    if (document.body.scrollTop >= this.offset) {
      this.navScrolled = true;
      this.show();
    }

  }
  show() {
    TweenMax.set(this.el, {
      transformOrigin: '50% 0',
      rotationX: 70,
      y: '-105%',
      position: 'fixed'
    })
    TweenMax.to(this.el, 1, {
      ease: Bounce.easeOut,
      y: '0%',
      rotationX: 0
    });
  }
  hide() {
    TweenMax.to(this.el, 1, {
      ease: Back.easeOut.config(4),
      rotationX: 90
    });
  }
}
