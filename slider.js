/**
 * Create tiny slider with custom size
 * @param {{
 *  container: String | HTMLElement,
 *  size: {
 *    width: Number,
 *    height: Number
 *  },
 *  loop: Boolean,
 *  prevController: String | HTMLElement,
 *  nextController: String | HTMLElement,
 *  overflow: String,
 *  autoplay: Boolean
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
  const size = options.size

  let controllers = {}

  if (typeof options.prevController === 'string') {
    controllers.prevController = $(options.prevController)
  } else {
    controllers.prevController = options.prevController
  }

  if (typeof options.nextController === 'string') {
    controllers.nextController = $(options.nextController)
  } else {
    controllers.nextController = options.nextController
  }

  container.style.width = `${size.width}px`
  container.style.height = `${size.height}px`
  container.style.overflow = overflow

  slides.style.display = 'grid'
  slides.style.gridTemplateColumns = `repeat(${slideItems.length}, ${size.width}px)`
  slides.style.gridTemplateRows = `${size.height}px`

  function slidePrev() {
    if (currentPos > 0) {
      currentPos--
      slides.style.transform = `translateX(${size.width * (-currentPos)}px)`
    } else if (currentPos === 0 && loop === true) {
      currentPos = slideItems.length - 1
      slides.style.transform = `translateX(-${size.width * (slideItems.length - 1)}px)`
    }
  }

  function slideNext() {
    if (currentPos < slideItems.length - 1) {
      currentPos++
      slides.style.transform = `translateX(${size.width * (-currentPos)}px)`
    } else if (currentPos === slideItems.length - 1 && loop === true) {
      currentPos = 0
      slides.style.transform = 'translateX(0)'
    }
  }

  controllers.prevController.addEventListener('click', slidePrev)
  controllers.nextController.addEventListener('click', slideNext)

  if (autoplay === true) {
    setInterval(() => {
      slideNext()
    }, 5000)
  }
}