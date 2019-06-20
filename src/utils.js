var assign = Object.assign || function() {
  var objects = Array.prototype.map.call(arguments, function(o) {
    return typeof o === 'object' ? o : {}
  })
  return objects.reduce(function(pre, o) {
    Object.keys(o).forEach(function(k) {
      pre[k] = o[k]
    })
    return pre
  }, {})
}

var find = function(arr, callback) {
  if (Array.prototype.find) {
    return [].find.call(arr, callback)
  }
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) return arr[i]
  }
}

export {
  assign,
  find,
}