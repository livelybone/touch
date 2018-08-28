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
Touch.tap(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)

// Event `press`
Touch.press(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)

// Event `swipe`
Touch.swipe(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)

// Event `pan`
Touch.pan(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)

// Event `pinch`
Touch.pinch(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)

// Event `rotate`
Touch.rotate(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)
```

## Unregister
```js
// unregister one event listener
var touchRes = Touch.tap(document.getElementById('id'), (EventObject)=>{}, preventRuleFn)
touchRes.unsubscribe()

// unregister all touch event of an element
touchRes.touchObserver.destroy()
```
## Custom event
Your can use `bind.js` to customize your event

```js
// Register
const touchObserver = Touch.bind(document.getElementById('id'), preventRuleFn)

const unsubscribe = touchObserver.Observer.subscribe((EventObject)=>{}).unsubscribe

// Unregister

// just this event listener
unsubscribe()

// unregister all touch event of an element
touchObserver.destory()
```

## PreventRuleFn
example:
```js
function preventRuleFn(EventObject){
  if('some condition'){
    EventObject.event.preventDefault()    
  }
}
```
This `function` param of Touch is used to set the prevent rule of native touch event

And, one element only have one prevent rule, which means the preventRuleFn be set later will replace the previous one

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