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
    if (!this.navScrolled && document.body.scrollTop >= this.offset) {
      this.navScrolled = true;
      this.show();
    }
    if (this.navScrolled) {
      if (document.body.scrollTop === 0) {
        this.attach();
        this.navScrolled = false;
      } else if (!this.hideDelay && this.navVisible && this.lastPosition < scrollTop) {
        this.hide();
      } else if (!this.navVisible && this.lastPosition > scrollTop) {
        this.show();
      }
    }
    this.lastPosition = scrollTop;
  }
  show() {
    this.el.classList.add('navbar-scrolled');
    TweenMax.set(this.el, {
      transformOrigin: '50% 0',
      rotationX: 70,
      y: '-105%',
      position: 'fixed'
    });
    TweenMax.to(this.el, 1, {
      ease: Bounce.easeOut,
      y: '0%',
      rotationX: 0
    });
    this.navVisible = true;
    this.hideDelay = setTimeout(() => this.hideDelay = null, 3000);
    this._onShow && this._onShow();
  }
  hide() {
    TweenMax.to(this.el, 1, {
      ease: Back.easeOut.config(4),
      rotationX: 90
    });
    this.navVisible = false;
    this._onHide && this._onHide();
  }
  attach() {
    TweenMax.to(this.el, 1, {
      ease: Bounce.easeOut,
      y: '0%',
      rotationX: 0,
      position: 'absolute'
    });
    this.el.classList.remove('navbar-scrolled');
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
