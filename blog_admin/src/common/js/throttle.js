/**
 * throttle
 * 节流函数
 * @author Tokei revised from JS设计模式
 * @param obj
 * @props obj.timeFlag = true, obj.throttleTimer = null;
 * @param fn
 * @param interval = 1000
 */

export const throttle = (obj, fn, interval = 300) => {
  let _self = fn
  return (function () {
    let args = arguments
    let _me = this
    if (obj.timeFlag) {
      _self.apply(_me, args)
      obj.timeFlag = false
      obj.throttleTimer = setTimeout(function () {
        clearTimeout(obj.throttleTimer)
        obj.throttleTimer = null
        obj.timeFlag = true
      }, interval)
    }
  })()
}
