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
    this.navVisible = true;

    this.hideDelay = null;
    this.lastPosition = 0;

    this._onShow = null;
    this._onHide = null;
    this._onAttach = null;

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
    this._onShow && this._onShow();
  }
  hide(onComplete) {
    TweenMax.to(this.el, 1, {
      ease: Back.easeOut.config(4),
      rotationX: 90,
      onComplete
    });
    this.navVisible = false;
    this._onHide && this._onHide();
  }
  attach(onComplete) {
    TweenMax.to(this.el, 1, {
      ease: Bounce.easeOut,
      y: '0%',
      rotationX: 0,
      position: 'absolute',
      onComplete
    });
    this.el.classList.remove(NavigationBar.SCROLLED_CLASS);
    this._onAttach && this._onAttach();
  }
  onShow(callback) {
    this._onShow = callback;
  }
  onHide(callback) {
    this._onHide = callback;
  }
  onAttach(callback) {
    this._onAttach = callback;
  }
}

NavigationBar.SCROLLED_CLASS = 'navbar-scrolled';
