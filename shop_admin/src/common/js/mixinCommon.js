import { ApiGoodsProUpload, ApiGoodsCountPage } from 'api/goods'
import { mapMutations, mapGetters } from 'vuex'
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
export const initPage = {
  data () {
    return {
      pageMsg: {
        total: 1,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    initPage () {
      ApiGoodsCountPage().then(res => {
        this.pageMsg.total = res.length
      }).then(() => {
        this.getPage()
        this.getList()
      })
    },
    getPage () {
      if (this.vxQueryObj[this.$route.name] && this.vxQueryObj[this.$route.name].page) {
        this.pageMsg.pageNum = this.vxQueryObj[this.$route.name].page
      }
    },
    handlePageChange (i) {
      this.pageMsg.pageNum = i
      this.setQueryObj({ path: this.$route.name, query: { page: i } })
      this.getList()
    },
    ...mapMutations('Basic', {
      'setQueryObj': 'SET_QUERY_OBJ'
    })
  },
  computed: {
    ...mapGetters('Basic', [
      'vxQueryObj'
    ])
  }
}
