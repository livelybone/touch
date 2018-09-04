import MetaScale from '@livelybone/meta-scale'

export default function (target, origin) {
  var scale = MetaScale()
  if (!target || !origin) {
    return {
      deltaX: 0,
      deltaY: 0,
      deltaDistance: 0,
      direction: '',
      windowScale: scale,
    }
  }
  var x = target.pageX - origin.pageX
  var y = target.pageY - origin.pageY
  var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  var directionX = Math.abs(x) <= 30 / scale ? '' : x > 0 ? 'right' : 'left'
  var directionY = Math.abs(y) <= 30 / scale ? '' : y > 0 ? 'bottom' : 'top'
  return {
    deltaX: x,
    deltaY: y,
    deltaDistance: distance,
    direction: directionX + (directionX && directionY ? '-' : '') + directionY,
    windowScale: scale
  }
}