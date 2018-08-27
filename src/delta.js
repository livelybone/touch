var getScale = require('@livelybone/meta-scale')

module.exports = function (target, origin) {
  var scale = getScale()
  if (!target || !origin) {
    return {
      x: 0,
      y: 0,
      distance: 0,
      direction: '',
      scale: scale,
    }
  }
  var x = target.pageX - origin.pageX
  var y = target.pageY - origin.pageY
  var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  var directionX = Math.abs(x) <= 30 / scale ? '' : x > 0 ? 'right' : 'left'
  var directionY = Math.abs(y) <= 30 / scale ? '' : y > 0 ? 'bottom' : 'top'
  return {
    x: x,
    y: y,
    distance: distance,
    direction: directionX + (directionX && directionY ? '-' : '') + directionY,
    scale: scale
  }
}