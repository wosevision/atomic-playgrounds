export const swingOrigin = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom'
};
export const swingDirection = {
  FORWARD: 'forward',
  BACKWARD: 'backward'
};

const swingTransformOrigin = {
  [swingOrigin.TOP]: '50% 0%',
  [swingOrigin.MIDDLE]: '50% 50%',
  [swingOrigin.BOTTOM]: '50% 100%'
}
const swingRotateDirection = {
  [swingDirection.FORWARD]: -90,
  [swingDirection.BACKWARD]: 90
}

export function swingDown(el, {
  direction = swingDirection.FORWARD,
  origin = swingOrigin.TOP,
  duration = 2.5
} = {}) {
  TweenMax.set(el, {
    rotationX: swingRotateDirection[direction],
    transformOrigin: swingTransformOrigin[origin]
  });
  TweenMax.to(el, duration, {
    ease: Elastic.easeOut.config(1, 0.3),
    rotationX: 0
  });
}
