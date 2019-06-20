import { Subject } from '@livelybone/simple-observer'
import calcDistance from '../calc-distance'
import delta from '../delta'
import getAngle from '../get-angle'
import getCenter from '../get-center'
import { find } from '../utils'

var TouchSubjects = []

function bind(el, preventFn) {
  var touchSubject = find(TouchSubjects, function(subject) {
    return subject.el === el
  })

  // If exist, return
  if (touchSubject) {
    touchSubject.preventFn = preventFn
    return touchSubject
  }

  var subject = new Subject()
  touchSubject = { subject: subject, el: el, preventFn: preventFn }
  TouchSubjects.push(touchSubject)

  var touches = null
  var center = null
  var distance = 0
  var angle = 0

  function touchStart(ev) {
    touches = [].concat.apply([], ev.targetTouches)
    center = touches.length > 0 ? getCenter(touches[0], touches[1]) : null
    angle = touches.length > 1 ? getAngle(touches[0], touches[1]) : 0
    distance = touches.length > 1 ? calcDistance(touches[0], touches[1]) : 0
    var EventObject = {
      type: ev.type,
      touches: touches,
      center: center,
      angle: angle,
      distance: distance,
      timeStamp: ev.timeStamp,
      centerDelta: null,
      deltaAngle: 0,
      pinchScale: 1,
      event: ev,
    }
    if (typeof touchSubject.preventFn === 'function') {
      touchSubject.preventFn(EventObject)
    } else if (touchSubject.preventFn) {
      ev.preventDefault()
    }
    touchSubject.subject.notify(EventObject)
  }

  function touch(ev) {
    var changedTouches = touches
      .map(function(t) {
        return find(ev.changedTouches, function(touch) {
          return touch.identifier === t.identifier
        })
      })
      .filter(function(t) {
        return !!t
      })
    var changedCenter = changedTouches.length > 0 ? getCenter(changedTouches[0], changedTouches[1]) : null
    var changedAngle = changedTouches.length > 1 ? getAngle(changedTouches[0], changedTouches[1]) : 0
    var changedDistance = changedTouches.length > 1 ? calcDistance(changedTouches[0], changedTouches[1]) : 0
    var EventObject = {
      type: ev.type,
      touches: changedTouches,
      center: changedCenter,
      angle: changedAngle,
      distance: changedDistance,
      timeStamp: ev.timeStamp,
      centerDelta: delta(changedCenter, center),
      deltaAngle: changedAngle - angle,
      pinchScale: changedDistance / distance || 1,
      event: ev,
    }
    if (typeof touchSubject.preventFn === 'function') {
      touchSubject.preventFn(EventObject)
    } else if (touchSubject.preventFn) {
      ev.preventDefault()
    }
    touchSubject.subject.notify(EventObject)
  }

  function unbind() {
    el.removeEventListener('touchstart', touchStart)
    el.removeEventListener('touchmove', touch)
    el.removeEventListener('touchend', touch)
  }

  el.addEventListener('touchstart', touchStart)
  el.addEventListener('touchmove', touch)
  el.addEventListener('touchend', touch)

  touchSubject.unbind = unbind
  return touchSubject
}

export default bind