<template>
  <div class="goods-add">
    <div class="title">
      <el-row :gutter="20">
        <el-col :span="3"><h2>修改商品</h2></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="form" label-width="80px" :rules="rules" >
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option-group
              v-for="group in categoryData"
              :key="group.title"
              :label="group.title">
              <el-option
                v-for="item in group.children"
                :key="item.objectId"
                :label="item.title"
                :value="item.objectId">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-switch v-model="form.isNew"></el-switch>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-switch v-model="form.isHot"></el-switch>
        </el-form-item>
        <el-form-item label="产品图" prop="images">
          <el-button style="margin: 10px;" size="small" type="success" @click="handleProSubmit">上传到服务器</el-button>
          <el-upload
            ref="projectImgs"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handleAsyncUpload"
            :on-change="handleProChange"
            list-type="picture-card"
            :limit="5"
            multiple
            :auto-upload="false"
            :file-list="tempProjectList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述图" prop="detail">
          <el-button style="margin: 10px;" size="small" type="success" @click="handleDesSubmit">上传到服务器</el-button>
          <el-upload
            ref="descriptionImgs"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handleAsyncUpload"
            :on-change="handleDesChange"
            list-type="picture-card"
            :limit="5"
            multiple
            :auto-upload="false"
            :file-list="tempDescriptionList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ApiGoodsCategory, ApiGoodsProUpload, ApiGoodsQuery, ApiGoodsEdit } from 'api/goods'
import { mapGetters } from 'vuex'
// TODO 图片删除操作
export default {
  data () {
    return {
      form: {
        title: '',
        price: null,
        isNew: false,
        isHot: false,
        category: '',
        images: [],
        detail: []
      },
      rules: {
        title: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        category: [{required: true, message: '请定义商品类型', trigger: 'change'}],
        price: [{required: true, message: '请输入商品价格', trigger: 'blur'}],
        images: [{required: true, message: '请上传产品图', trigger: 'blur'}],
        detail: [{required: true, message: '请上传描述图', trigger: 'blur'}]
      },
      categoryData: [],
      tempProjectImgs: [],
      tempProjectList: [],
      tempDescriptionImgs: [],
      tempDescriptionList: []
    }
  },
  created () {
    this.getGoodsCategory()
    this.initCurrentInfo()
  },
  methods: {
    initCurrentInfo () {
      ApiGoodsQuery(this.goodsId).then(res => {
        this.formatGoodsData(res.attributes)
      })
    },
    getGoodsCategory () {
      ApiGoodsCategory().then(res => {
        this.categoryData = res
      })
    },
    formatGoodsData (data) {
      this.form = data
      this.form.category = data.category.id
      console.log('this.form', this.form)
      this.form.images.forEach(url => {
        this.tempProjectList.push({name: '', url: url})
      })
      this.form.detail.forEach(url => {
        this.tempDescriptionList.push({name: '', url: url})
      })
      console.log(this.tempProjectList, this.tempDescriptionList)
    },
    goGoodsList () {
      this.$router.push({name: 'goods-list'})
    },
    // 关于上传图片的操作
    handleProChange (file, fileList) {
      this.tempProjectImgs = fileList
    },
    handleProSubmit () {
      this.handleAsyncUpload(this.tempProjectImgs, this.form.images)
    },
    handleDesChange (file, fileList) {
      this.tempDescriptionImgs = fileList
    },
    handleDesSubmit () {
      this.handleAsyncUpload(this.tempDescriptionImgs, this.form.detail)
    },
    handleAsyncUpload (fileList, fileUrlArr) {
      async function submitProjectImg (fileList) {
        for (let i = 0; i < fileList.length; i++) {
          let file = fileList[i]
          await ApiGoodsProUpload(file.name, file.raw).then(res => {
            fileUrlArr.push(res.url())
          })
        }
        window.Message.successMessage('上传成功')
      }
      submitProjectImg(fileList)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formatParams()
        } else {
          window.Message.errorMessage('请仔细检查参数')
          return false
        }
      })
    },
    formatParams () {
      let avatar = this.form.images.length > 0 ? this.form.images[0] : null
      this.form.price = Number(this.form.price)
      this.form.avatar = avatar
      this.submitParams()
    },
    submitParams () {
      ApiGoodsEdit(this.form, this.goodsId).then(res => {
        window.Message.successMessage('更新成功')
        this.goGoodsList()
      })
    }
  },
  computed: {
    ...mapGetters([
      'goodsId'
    ])
  }
}
</script>
<style lang="stylus" scoped>
</style>
