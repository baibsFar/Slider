# Slider
Slider is a tiny and simple slider made from scratch by VanillaJS. It is simple to use and you can customize it however you want.

# Usage
- Import slide JS&CSS file to your project
- Code:
```html
<div class="main__slide__container" id="first-slider">
  <div class="slides">
    <div class="slide">A</div>
    <div class="slide">B</div>
    <div class="slide">C</div>
    <div class="slide">D</div>
  </div>
</div>
<div id="first-controller">
  <button class="prev">Previous</button>
  <button class="next">Next</button>
</div>
```
```js
Slider({
  container: '#first-slider',
  size: {
    width: 500,
    height: 300
  },
  loop: true,
  prevController: "#first-controller>.prev",
  nextController: "#first-controller>.next",
  overflow: 'hidden',
  autoplay: true
})
```

Happy Hacking XD