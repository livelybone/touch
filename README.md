# @livelybone/touch
A module for gesture

An element corresponds to an observer, this rule runs throughout the whole module

## repository
https://github.com/livelybone/touch.git

## Demo
https://github.com/livelybone/touch#readme

## Register
```js
import Touch from '@livelybone/touch'

// Event `tap`
Touch.tap(document.getElementById('id'), (EventObject)=>{})

// Event `press`
Touch.press(document.getElementById('id'), (EventObject)=>{})

// Event `swipe`
Touch.swipe(document.getElementById('id'), (EventObject)=>{})

// Event `pan`
Touch.pan(document.getElementById('id'), (EventObject)=>{})

// Event `pinch`
Touch.pinch(document.getElementById('id'), (EventObject)=>{})

// Event `rotate`
Touch.rotate(document.getElementById('id'), (EventObject)=>{})
```

## Unregister
```js
// unregister one event listener
var touchRes = Touch.tap(document.getElementById('id'), (EventObject)=>{})
touchRes.unsubscribe()

// unregister all touch event of an element
touchRes.touchObserver.destroy()
```
## Custom event
Your can use `bind.js` to customize your event

```js
// Register
const touchObserver = Touch.bind(document.getElementById('id'))

const unsubscribe = touchObserver.Observer.subscribe((EventObject)=>{}).unsubscribe

// Unregister

// just this event listener
unsubscribe()

// unregister all touch event of an element
touchObserver.destory()
```

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
Go to: https://www.xdnote.com/mobile-page-touch-event/