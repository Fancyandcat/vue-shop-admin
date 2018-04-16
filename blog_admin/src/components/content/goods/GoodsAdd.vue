<template>
  <div class="goods-add">
    <div class="title">
      <el-row :gutter="20">
        <el-col :span="3"><h2>添加商品</h2></el-col>
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
            :auto-upload="false">
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
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addForm')">立即创建</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// project 产品 description 描述
import { ApiGoodsCategory, ApiGoodsProUpload, ApiGoodsAdd } from 'api/goods'
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
      categoryData: [],
      rules: {
        title: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        category: [{required: true, message: '请定义商品类型', trigger: 'change'}],
        price: [{required: true, message: '请输入商品价格', trigger: 'blur'}],
        images: [{required: true, message: '请上传产品图', trigger: 'blur'}],
        detail: [{required: true, message: '请上传描述图', trigger: 'blur'}]
      },
      tempProjectImgs: [],
      tempDescriptionImgs: []
    }
  },
  created () {
    this.getGoodsCategory()
  },
  methods: {
    getGoodsCategory () {
      ApiGoodsCategory().then(res => {
        this.categoryData = res
        console.log('categoryData', this.categoryData)
      })
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
      ApiGoodsAdd(this.form).then(res => {
        window.Message.successMessage('创建成功')
        this.goGoodsList()
      })
    },
    goGoodsList () {
      this.$router.push({name: 'goods-list'})
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.resetUpload()
    },
    resetUpload () {
      this.$refs.projectImgs.clearFiles()
      this.$refs.descriptionImgs.clearFiles()
    }
  }
}
</script>
<style lang="stylus" scoped>
.goods-add
  .title
    margin 20px 0
  .content
    width 50%
  .avatar-uploader .el-upload
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden
  .avatar-uploader .el-upload:hover
    border-color #409EFF
  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 178px
    height 178px
    line-height 178px
    text-align center
  .avatar
    width 178px
    height 178px
    display block
</style>
