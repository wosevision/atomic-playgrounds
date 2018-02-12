import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';

export const NAVBAR_EL = '#navigation-bar';
export const NAVBAR_LOGO = '.nav-logo';

export class NavigationBar {
  constructor(elSelector, {
    logoSelector = null,
    offset = 0
  } = {}) {
    this.el = document.querySelector(elSelector);
    this.logo = document.querySelector(logoSelector);
    this.svg = this.logo.querySelector('svg');
    this.offset = offset;

    this.navScrolled = false;
    this.navVisible = true;

    this.hideDelay = null;
    this.lastPosition = 0;

    $(document.body).scroll(event => this.handleScroll(event));
  }
  handleScroll(event) {
    const scrollTop = document.body.scrollTop;
    if (!this.navScrolled && scrollTop >= this.offset) {
      this.navScrolled = true;
      this.show();
    }
    if (this.navScrolled) {
      if (scrollTop < this.offset) {
        this.hide(() => this.attach());
        this.navScrolled = false;
      } else if (!this.hideDelay && this.navVisible && this.lastPosition < scrollTop) {
        this.hide();
      } else if (!this.navVisible && this.lastPosition > scrollTop) {
        this.show();
      }
    }
    this.lastPosition = scrollTop;
  }
  show(onComplete) {
    this.el.classList.add(NavigationBar.SCROLLED_CLASS);
    TweenMax.set(this.el, {
      transformOrigin: '50% 0',
      rotationX: 70,
      y: '-105%',
      position: 'fixed'
    });
    TweenMax.to(this.el, 1, {
      ease: Bounce.easeOut,
      y: '0%',
      rotationX: 0,
      onComplete
    });
    this.navVisible = true;
    this.hideDelay = setTimeout(() => this.hideDelay = null, 3000);
    this.svg.setAttribute('viewBox', '0 0 130 130');
  }
  hide(onComplete) {
    TweenMax.to(this.el, 1, {
      ease: Back.easeOut.config(4),
      rotationX: 90,
      onComplete
    });
    this.navVisible = false;
  }
  attach(onComplete) {
    TweenMax.set(this.logo, {
      y: '-100%',
      rotationX: 90,
      transformOrigin: '50% 0%'
    });
    TweenMax.to(this.logo, 1.5, {
      ease: Bounce.easeOut,
      y: '0%'
    });
    TweenMax.to(this.logo, 2.5, {
      ease: Elastic.easeOut.config(1, 0.3),
      rotationX: 0,
      delay: 0.5
    });
    TweenMax.to(this.el, 1, {
      ease: Bounce.easeOut,
      y: '0%',
      rotationX: 0,
      position: 'absolute',
      onComplete
    });
    this.el.classList.remove(NavigationBar.SCROLLED_CLASS);
    this.svg.setAttribute('viewBox', '0 0 370 130');
  }
}

NavigationBar.SCROLLED_CLASS = 'navbar-scrolled';

export default {
  NAVBAR_EL,
  NAVBAR_LOGO
};
