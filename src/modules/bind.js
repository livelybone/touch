var calcDistance = require('../calc-distance')
var getAngle = require('../get-angle')
var delta = require('../delta')
var getCenter = require('../get-center')
var Observer = require('@livelybone/simple-observer').Observer

function unbind(touchObserver) {
  touchObserver.destroy()
}

function bind(el) {
  var next = null

  if (!window.TouchObservers) {
    window.TouchObservers = []
  }

  var touchObserver = window.TouchObservers.find(function (ob) {
    return ob.el === el
  })
  if (!touchObserver) {
    touchObserver = {
      Observer: new Observer(function (n) {
        next = n
      }),
      el: el
    }
    window.TouchObservers.push(touchObserver)
  } else {
    return touchObserver
  }

  var touches = null
  var center = null
  var distance = 0
  var angle = 0

  function touchStart(ev) {
    touches = Array.prototype.map.call(ev.targetTouches, function (touch) {
      return touch
    })
    center = touches.length > 0 ? getCenter(touches[0], touches[1] || {}) : null
    angle = touches.length > 1 ? getAngle(touches[0], touches[1]) : 0
    distance = touches.length > 1 ? calcDistance(touches[0], touches[1]) : 0
    next({
      type: ev.type,
      touches: touches,
      center: center,
      angle: angle,
      distance: distance,
      timeStamp: ev.timeStamp,
      centerDelta: null,
      deltaAngle: 0,
      pinchScale: 1,
      event: ev
    })
  }

  function touch(ev) {
    var changedTouches = touches.map(function (t) {
      return Array.prototype.find.call(ev.changedTouches, function (touch) {
        return touch.identifier === t.identifier
      })
    }).filter(function (t) {
      return !!t
    })
    var changedOrigin = changedTouches.length > 0 ? getCenter(changedTouches[0], changedTouches[1] || {}) : null
    var changedAngle = changedTouches.length > 1 ? getAngle(changedTouches[0], changedTouches[1]) : 0
    var changedDistance = changedTouches.length > 1 ? calcDistance(changedTouches[0], changedTouches[1]) : 0
    next({
      type: ev.type,
      touches: changedTouches,
      center: changedOrigin,
      angle: changedAngle,
      distance: changedDistance,
      timeStamp: ev.timeStamp,
      centerDelta: delta(changedOrigin, center),
      deltaAngle: changedAngle - angle,
      pinchScale: changedDistance / distance || 1,
      event: ev
    })
  }

  function unbind() {
    el.removeEventListener('touchstart', touchStart)
    el.removeEventListener('touchmove', touch)
    el.removeEventListener('touchend', touch)
  }

  el.addEventListener('touchstart', touchStart)
  el.addEventListener('touchmove', touch)
  el.addEventListener('touchend', touch)

  touchObserver.destroy = function () {
    unbind()
    var index = Object.keys(window.TouchObservers).find(function (i) {
      return window.TouchObservers[i].el === el
    })
    window.TouchObservers.splice(index, 1)
  }
  return touchObserver
}

module.exports = bind