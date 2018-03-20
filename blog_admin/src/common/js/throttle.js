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
    // console.log(window.firstTimeThrottle)
    if (obj.timeFlag) {
      _self.apply(_me, arguments)
      obj.timeFlag = false
      return
    }
    if (obj.throttleTimer) {
      // console.log('计时器存在')
      return false
    }
    obj.throttleTimer = setTimeout(function () {
      clearTimeout(obj.throttleTimer)
      obj.throttleTimer = null
      // console.log('这里需要延迟执行');
      _self.apply(_me, args)
    }, interval)
  })()
}
