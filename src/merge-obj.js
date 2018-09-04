var assign = Object.assign || function () {
  var objects = Array.prototype.map.call(arguments, function (o) {
    return typeof o === 'object' ? o : {}
  })
  return objects.reduce(function (pre, o) {
    Object.keys(o).forEach(function (k) {
      pre[k] = o[k]
    })
    return pre
  }, {})
}

export default assign