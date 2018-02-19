import $ from 'jquery';

import { selector } from './constants';

export class Parallax {
  constructor() {
    this.lastScrollY = 0;
    this.elMap = new Map([
      ...document.querySelectorAll(selector.PARALLAX)
    ].map(el => [el, 0]));

    $(window).scroll(() => this.handleParallax());
  }
  handleParallax() {
    const { scrollY, innerHeight } = window;
    const windowBottom = scrollY + innerHeight;
    this.elMap.forEach((offset, el) => {
      const { top, height } = el.getBoundingClientRect();
      const bgTop = top + scrollY;
      const bgBottom = bgTop + height;

      if (bgTop > windowBottom || bgBottom < scrollY) return;

      const delta = scrollY - this.lastScrollY;
      offset += delta;

      window.requestAnimationFrame(() => this.handleAnimationFrame(offset, el));
      this.elMap.set(el, offset);
    });
    this.lastScrollY = scrollY;
  }

  handleAnimationFrame(offset, el) {
    el.style.transform = `translateY(${offset / 6}px)`;
  }
}
