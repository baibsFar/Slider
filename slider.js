/**
 * Create tiny slider with custom size
 * @param {{
 *  container: String | HTMLElement,
 *  size: {
 *    width: Number | String,
 *    height: Number | String
 *  },
 *  loop: Boolean,
 *  overflow: String,
 *  autoplay: Boolean,
 *  transition: {
 *    duration: Number,
 *    timingFunction: String
 * }
 * }} options 
 */
function Slider(options) {
  const $ = (selector) => document.querySelector(selector)

  let currentPos = 0
  let container
  if (typeof options.container === 'string') {
    container = $(options.container)
  } else {
    container = options.container
  }

  let loop
  if (!options.loop) {
    loop = false
  } else {
    loop = options.loop
  }

  let overflow
  if (!options.overflow) {
    overflow = 'hidden'
  } else {
    overflow = options.overflow
  }

  let autoplay
  if (!options.autoplay) {
    autoplay = false
  } else {
    autoplay = options.autoplay
  }

  const slides = container.querySelector('.slides')
  const slideItems = slides.querySelectorAll('.slide')
  const size = {
    width: typeof options.size.width === 'number' ? `${options.size.width}px` : options.size.width,
    height: typeof options.size.height === 'number' ? `${options.size.height}px` : options.size.height
  }
  let transition = {}
  if (!options.transition) {
    transition.duration = 500
    transition.timingFunction = 'ease-in-out'
  } else {
    transition.duration = options.transition.duration
    transition.timingFunction = options.transition.timingFunction
  }

  container.style.width = size.width + ''
  container.style.height = size.height + ''
  container.style.overflow = overflow

  slides.style.transition = `transform ${transition.duration}ms ${transition.timingFunction}`
  slides.style.display = 'grid'
  slides.style.gridTemplateColumns = `repeat(${slideItems.length}, ${size.width})`
  slides.style.gridTemplateRows = size.height + ''

  /**
   * Move the slide to previous slide
   */
  function slidePrev() {
    if (currentPos > 0) {
      currentPos--
    } else if (currentPos === 0 && loop === true) {
      currentPos = slideItems.length - 1
    }
    slides.style.transform = `translateX(calc(${size.width} * ${-currentPos}))`
  }

  /**
   * Move the slide to the next slide
   */
  function slideNext() {
    if (currentPos < slideItems.length - 1) {
      currentPos++
    } else if (currentPos === slideItems.length - 1 && loop === true) {
      currentPos = 0
    }
    slides.style.transform = `translateX(calc(${size.width} * ${-currentPos}))`
  }

  if (autoplay === true) {
    setInterval(() => {
      slideNext()
    }, 5000)
  }

  /**
   * Move the slide to target position. Target position begin at 0
   * @param {Number} targetPos 
   */
  function slideTo(targetPos) {
    if (targetPos > 0 && targetPos <= slideItems.length) {
      currentPos = targetPos - 1
      slides.style.transform = `translateX(calc(${size.width} * ${-currentPos}))`
    }
  }

  return {
    slidePrev,
    slideNext,
    slideTo
  }
}