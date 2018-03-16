import $ from 'jquery';

import { selector } from './constants';

export class FloatingLabelInput {
  constructor(el) {
    this.el = el;
    this.checkValue = this.checkValue.bind(this);

    this.checkPlaceholder();
    $(this.el).blur(this.checkValue);
    this.checkValue();
  }

  /**
   * Marks empty inputs for label floating.
   */
  checkValue() {
    const value = this.el.value;
    if (value && value !== '') {
      this.el.removeAttribute('data-input-empty');
    } else {
      this.el.setAttribute('data-input-empty', '');
    }
  }

  /**
   * Removes placeholders that conflict with floating labels.
   */
  checkPlaceholder() {
    const placeholder = this.el.getAttribute('placeholder');
    if (placeholder && placeholder !== '') {
      this.el.removeAttribute('placeholder');
    }
  }
}
