export default function(cb) {
  return function(el, callback, preventFn) {
    if (typeof el === 'function') {
      preventFn = callback || null
      callback = el
      el = window
    }
    return cb(el, callback, preventFn)
  }
}