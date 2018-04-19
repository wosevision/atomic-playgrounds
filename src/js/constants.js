export const el = {
  HERO_MOON: document.querySelector('.hero-moon .jumbotron'),
  ROCKET_SHIP: document.getElementById('rocket_ship'),
  ROCKET_SHIP_PATH: document.getElementById('rocket_ship_path')
};

export const selector = {
  NAVBAR_EL: '#navigation-bar',
  NAVBAR_LOGO: '.nav-logo',

  HERO_MOON: '.hero-moon',
  CONTENT_BLOCK: '.content-block',

  GALLERY: '.gallery',
  GALLERY_IMAGE: '.gallery-image',

  CONTAINER: '.swiper-container',
  PAGINATION: '.swiper-pagination',
  BUTTON_NEXT: '.swiper-button-next',
  BUTTON_PREV: '.swiper-button-prev',
  LOGO_SLIDER: `.swiper-container.logo-slider`,
  CARDS_SLIDER: `.swiper-container.cards-slider`,
  DIALOG_SLIDER_TOP: `.swiper-container.dialog-slider-top`,
  DIALOG_SLIDER_BOTTOM: `.swiper-container.dialog-slider-bottom`,

  PARALLAX: '.parallax-bg',

  CONTAINER_UNDERLINE: '.form-container-underline',
  CONTROL_UNDERLINE: '.form-control-underline',
  CONTROL_LABEL: '.form-control-label'
};

export const svg = {
  ROCKET_PATH_BEZIER: [
    { x: '+=147.60680000000002', y: '+=-39.365700000000004' },
    { x: '+=151.60680000000002', y: '+=80.6343' },
    { x: '+=230.66720000000004', y: '+=136.5039' },
    { x: '+=334.9402', y: '+=149.301' },
    { x: '+=481.6068', y: '+=167.301' },
    { x: '+=569.7196', y: '+=-12.626900000000035' },
    { x: '+=568.8535', y: '+=-124.3474' },
    { x: '+=567.3446', y: '+=-319.00559999999996' },
    { x: '+=326.7825', y: '+=-276.6176' },
    { x: '+=316.2735', y: '+=-118.82659999999998' },
    { x: '+=304.7823', y: '+=53.71199999999999' },
    { x: '+=579.4164000000001', y: '+=115.58019999999999' },
    { x: '+=880', y: '+=-150' }
  ]
};
