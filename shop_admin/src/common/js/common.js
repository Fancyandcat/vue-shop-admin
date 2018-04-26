// 将对象里属性清空 简单
export function resetObj (obj) {
  if (typeof obj !== 'object') {
    return
  }
  for (let k in obj) {
    obj[k] = ''
  }
}

// 将时间戳转化为年月日时分秒
export function stamp2time (val) {
  if (!val) {
    return ''
  }
  let t = new Date(val)
  let year = t.getFullYear()
  let month = t.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = t.getDate()
  day = day < 10 ? '0' + day : day
  let hour = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
  let minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
  let second = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
