import { ApiGoodsProUpload } from 'api/goods'
export const uploadImg = {
  data () {
    return {
      tempProjectImgs: [],
      tempDescriptionImgs: []
    }
  },
  methods: {
    handleProSubmit () {
      this.handleAsyncUpload(this.tempProjectImgs, this.form.images)
    },
    handleDesSubmit () {
      this.handleAsyncUpload(this.tempDescriptionImgs, this.form.detail)
    },
    handleAsyncUpload (fileList, fileUrlArr) {
      async function submitProjectImg (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          let file = fileList[i]
          await ApiGoodsProUpload(file.name, file.raw).then(res => {
            // TODO 写成对象，供不同接口调用
            fileUrlArr.push(res)
          })
        }
        window.Message.successMessage('上传成功')
      }
      submitProjectImg(fileList)
    },
    handleProChange (file, fileList) {
      this.tempProjectImgs = fileList
    },
    handleDesChange (file, fileList) {
      this.tempDescriptionImgs = fileList
    }
  }
}
