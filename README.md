# @livelybone/touch
[![NPM Version](http://img.shields.io/npm/v/@livelybone/touch.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/touch)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/touch.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/touch)
![gzip with dependencies: 1.9kb](https://img.shields.io/badge/gzip--with--dependencies-1.9kb-brightgreen.svg "gzip with dependencies: 1.9kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for gesture

## repository
https://github.com/livelybone/touch.git

## Installation
```bash
npm i -S @livelybone/touch
```

## Global name
`Touch`

## Usage
```js
import { tap, press, swipe, pan, pinch, rotate, bind } from '@livelybone/touch'
import { Subject } from '@livelybone/simple-observer'

const element = document.getElementById('id')

const preventFn = (EventObject) => {
  EventObject.event.preventDefault()
}

const listener = (EventObject) => {
  // ...do some thing
}

// Event `tap`
/**
 * touchSubject, {subject: Subject, el: Element, preventFn: Function | null | undefined }
 * */
const touchSubject = bind(element, preventFn)

// Event `tap`
// Bind
const tapUnbindFn = tap(element, listener, preventFn)
// Unbind
tapUnbindFn()

// Event `press`
// Bind
const pressUnbindFn = press(element, listener, preventFn)
// Unbind
pressUnbindFn()

// Event `swipe`
// Bind
const swipeUnbindFn = swipe(element, listener, preventFn)
// Unbind
swipeUnbindFn()

// Event `pan`
// Bind
const panUnbindFn = pan(element, listener, preventFn)
// Unbind
panUnbindFn()

// Event `pinch`
// Bind
const pinchUnbindFn = pinch(element, listener, preventFn)
// Unbind
pinchUnbindFn()

// Event `rotate`
// Bind
const rotateUnbindFn = rotate(element, listener, preventFn)
// Unbind
rotateUnbindFn()
```

## Custom event
Your can use `bind` to customize your event

```js
import { bind } from '@livelybone/touch'
import { Observer } from '@livelybone/simple-observer'

const element = document.getElementById('id')

const preventFn = (EventObject) => {
  EventObject.event.preventDefault()
}

const listener = (EventObject) => {
  // ...do some thing
}

const touchSubject = bind(element, preventFn)
const observer = new Observer(listener)

// Bind
touchSubject.subject.addObserver(observer)

// Unbind
touchSubject.subject.removeObserver(observer)

if (touchSubject.subject.getObserversCount() < 1) {
  // unbind all listener of touch event on an native element
  touchSubject.unbind()
}
```

## PreventFn
example:
```js
function preventFn(EventObject){
  if('some condition'){
    EventObject.event.preventDefault()    
  }
}
```
This `function` param of Touch is used to set the prevent rule of native touch event

And, one element only have one prevent rule, which means the preventFn be set later will replace the previous one

## Event Object
```js
var EventObject = {
  type: '', // Event type, can be customized
  touches: TouchList,
  center: {
    clientX: 0, // Average of clientX of touches 
    clientY: 0, // Average of clientY of touches 
    pageX: 0, // Average of pageX of touches 
    pageY: 0, // Average of pageY of touches 
    screenX: 0, // Average of screenX of touches 
    screenY: 0  // Average of screenY of touches 
  },
  angle: 0, // The Angle between it and the X-axis
  distance: 0, // The distance between two touches point
  timeStamp: TouchEvent.timeStamp,
  centerDelta: {
    deltaX: 0,
    deltaY: 0,
    deltaDistance: 0,
    direction: '',  // ['left', 'right', 'top', 'bottom', 'left-bottom', 'left-top', 'right-top', 'right-bottom']
    windowScale: 1  // scale value of the whole window, calc by viewport
  },
  deltaAngle: 0,  // rotate angle
  pinchScale: 1,  // pinch scale
  event: TouchEvent
}
```

## Touch event 
Go to: http://www.xdnote.com/mobile-page-touch-event/
