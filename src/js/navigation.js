import {
  TweenMax,
  Back,
  Bounce,
  Elastic,
  TimelineLite
} from 'gsap';
import $ from 'jquery';

import { swingDown } from './animations';

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

    $(window).scroll(event => this.handleScroll(event));

    const dropdownMenus = document.querySelectorAll(`${elSelector} .dropdown-menu`);
    const dropdowns = document.querySelectorAll(`${elSelector} .dropdown`);
    $(dropdowns).on('show.bs.dropdown', () => swingDown(dropdownMenus, true))
  }
  handleScroll(event) {
    const scrollTop = window.scrollY;
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
    swingDown(this.logo);
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
