import Swiper from 'swiper';
import $ from 'jquery';

import { DialogSlider } from './sliders';
import { selector } from './constants';

export class Gallery {
  constructor(el) {
    this.el = el;
    this.$el = $(el);

    this.images = this.initImages();
    this.$modal = this.initModal();
    this.$gallery = null;

    this.attachGalleryHandlers();
  }

  initImages() {
    const $images = this.$el.find(selector.GALLERY_IMAGE);
    if ($images.length) {
      return [...$images].map(el => this.addImage(el));
    }
  }

  addImage(el) {
    const src = el.href;
    el.style.backgroundImage = `url('${src}')`;
    return { el, src };
  }

  initModal() {
    const $modal = $(this.renderModalMarkup());
    $modal.appendTo(document.body);
    return $modal;
  }

  attachGalleryHandlers() {
    this.images.forEach(image => {
      const $image = $(image.el);
      const slideIndex = $image.data('slide');
      $image.click(event => {
        event.preventDefault();
        if (!this.$gallery) {
          this.$gallery = this.initGallery();
        }
        this.openGalleryModalTo(slideIndex);
      });
    });
  }

  initGallery() {
    const $gallery = $(this.renderGalleryMarkup());
    const $galleryContainer = this.$modal.find('.gallery-container');
    $gallery.appendTo($galleryContainer);
    const top = $galleryContainer.find(selector.DIALOG_SLIDER_TOP);
    const bottom = top.next(selector.DIALOG_SLIDER_BOTTOM);
    return new DialogSlider({ top, bottom });
  }

  openGalleryModalTo(index) {
    this.$modal.modal().on('shown.bs.modal', () => this.$gallery.top.slideTo(index));
  }

  renderModalMarkup() {
    return `<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="fas fa-times"></span>
            </button>
            <div class="row">
              <div class="col-12 gallery-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  renderGalleryMarkup() {
    return `<div class="swiper-container dialog-slider-top">
      <div class="swiper-wrapper">
        ${ this.renderSlides() }
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="swiper-container dialog-slider-bottom">
      <div class="swiper-wrapper">
        ${ this.renderSlides() }
      </div>
    </div>
    `
  }

  renderSlides() {
    return this.images.map(({ src }) => `<div class="swiper-slide" style="background-image:url(${ src })"></div>`).join('\n');
  }
}
