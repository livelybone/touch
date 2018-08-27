var assign = require('../merge-obj')
var bind = require('./bind')
var capitalize = require('../capitalize')

function rotate(el, callback) {
  var endCount = 0
  return bind(el).Observer.subscribe(function (ev) {
    if (ev.type === 'touchend' && endCount === 0) {
      callback(assign(ev, { type: 'rotateEnd' }))
      endCount++
      return
    }
    var valid = ev.touches.length >= 2
    if (!valid) return
    callback(assign(ev, { type: 'rotate' + capitalize(ev.type.replace('touch', '')) }))
    endCount = 0
  })
}

module.exports = require('../args-deal')(rotate)