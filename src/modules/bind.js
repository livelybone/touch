var calcDistance = require('../calc-distance')
var getAngle = require('../get-angle')
var delta = require('../delta')
var getCenter = require('../get-center')
var Observer = require('@livelybone/simple-observer').Observer

function bind(el) {
  var next = null

  if (!window.TouchObserver) {
    window.TouchObserver = {
      Observer: new Observer(function (n) {
        next = n
      })
    }
  } else {
    return window.TouchObserver
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
      scale: 1,
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
      scale: changedDistance / distance || 1,
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

  window.TouchObserver.destroy = function () {
    unbind()
    window.TouchObserver = null
  }


  return window.TouchObserver
}

module.exports = bind