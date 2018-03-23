export function ApiLoginIn () {
  return window.AV.User.logIn.apply(this, arguments)
}

export function ApiLoginOut () {
  window.AV.User.logOut()
}

export function ApiLoginStatic () {
  return !!window.AV.User.current()
}
