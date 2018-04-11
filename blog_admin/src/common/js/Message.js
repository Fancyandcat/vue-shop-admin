export default class Message {
  constructor (option) {
    this._init(option)
  }
  _init (option) {
    this.that = option.source
    console.log(this.that)
  }
  errorMessage (info) {
    this.that.$message({
      type: 'error',
      message: info
    })
  }
  successMessage (info) {
    this.that.$message({
      type: 'success',
      message: info
    })
  }
}
