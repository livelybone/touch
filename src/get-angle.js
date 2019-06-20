export default function(t1, t2) {
  return Math.atan((t1.pageY - t2.pageY) / (t1.pageX - t2.pageX)) / Math.PI * 180
}