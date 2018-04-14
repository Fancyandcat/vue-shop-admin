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
  confirmDeleteMessage () {
    return this.that.$alert('是否确认删除', '提示', {
      confirmButtonText: '确定'
    })
  }
}
