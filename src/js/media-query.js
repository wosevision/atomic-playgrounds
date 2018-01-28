import { debounce } from './utils';

export class MediaAwareListener {
  constructor(window, $) {
    /**
     * Map of function arrays by media query.
     * @example { '(min-width: 576px)': [fn, ...], ... }
     */
    this.fnMap = new Map();

    this.matchMedia = window.matchMedia.bind(window);

    const reInit = debounce(this.checkAll, 400).bind(this);
    $(window).on('resize load', reInit);
  }
  on(mq, fn) {
    this.fnMap.set(mq, [...(this.fnMap[mq] || []), fn]);
  }
  checkAll() {
    for (const [mq, fnList] of this.fnMap) {
      this.checkMatchMedia(mq, fnList);
    }
  }
  checkMatchMedia(mq, fnList) {
    this.matchMedia(mq).matches && fnList.forEach(fn => fn());
  }
}

export default {
  XS: '(max-width: 575.98px)',
  SM: '(min-width: 576px) and (max-width: 767.98px)',
  MD: '(min-width: 768px) and (max-width: 991.98px)',
  LG: '(min-width: 992px) and (max-width: 1199.98px)',
  XL: '(min-width: 1200px)',

  SM_UP: '(min-width: 576px)',
  MD_UP: '(min-width: 768px)',
  LG_UP: '(min-width: 992px)',
  XL_UP: '(min-width: 1200px)',

  XS_DOWN: '(max-width: 575.98px)',
  SM_DOWN: '(max-width: 767.98px)',
  MD_DOWN: '(max-width: 991.98px)',
  LG_DOWN: '(max-width: 1199.98px)'
};
