module.exports = function (cb) {
  return function (el, callback, preventRule) {
    if (typeof el === 'function') {
      preventRule = callback || null
      callback = el
      el = window
    }
    cb(el, callback, preventRule)
  }
}