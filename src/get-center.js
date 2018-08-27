module.exports = function (t1, t2) {
  function average(k) {
    return (+t1[k] + (+t2[k] || 0)) / 2
  }

  return {
    clientX: average('clientX'),
    clientY: average('clientY'),
    pageX: average('pageX'),
    pageY: average('pageY'),
    screenX: average('screenX'),
    screenY: average('screenY'),
  }
}
