var bind = require('./bind')
var assign = require('../merge-obj')
var capitalize = require('../capitalize')

function pan(el, callback) {
  return bind(el).Observer.subscribe(function (ev) {
    var valid = ev.touches.length === 1
    if (!valid) return
    callback(assign(ev, { type: 'pan' + capitalize(ev.type.replace('touch', '')) }))
  })
}

module.exports = require('../args-deal')(pan)