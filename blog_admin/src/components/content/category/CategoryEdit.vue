<template>
  <el-card class="category-edit">
    <div slot="header">
      <el-row :gutter="20">
        <el-col :span="2"><div>编辑列表</div></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="form" label-width="80px" :rules="rules" >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择" @change="changeCategory">
            <el-option
              v-for="item in categoryData"
              :key="item.objectId"
              :label="item.title"
              :value="item.objectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类图" prop="images" v-if="form.category!==tempKey">
          <el-button style="margin: 10px;" size="small" type="success" @click="handleProSubmit">上传到服务器</el-button>
          <el-upload
            ref="projectImgs"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handleAsyncUpload"
            :on-change="handleProChange"
            list-type="picture-card"
            :limit="1"
            multiple
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="横幅图" prop="detail" v-if="form.category===tempKey">
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
  </el-card>
</template>
<script>
import { ApiGoodsTopCategory } from 'api/goods'
import { ApiCategoryAdd } from 'api/category'
import { uploadImg } from 'common/js/mixinCommon'
const TEMP_KEY_TOP_LEVEL = 'tempKeyTopLevel'
export default {
  mixins: [uploadImg],
  data () {
    return {
      categoryData: [],
      tempKey: TEMP_KEY_TOP_LEVEL,
      form: {
        title: '',
        category: '',
        images: [],
        detail: []
      },
      rules: {
        title: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        category: [{required: true, message: '请定义商品类型', trigger: 'change'}],
        images: [{required: true, message: '请上传分类图', trigger: 'blur'}]
      },
      rulesRepertory: {
        avatar: [{required: true, message: '请上传分类图', trigger: 'blur'}],
        banner: [{required: true, message: '请上传横幅图', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.getGoodsTopCategory()
  },
  methods: {
    getGoodsTopCategory () {
      ApiGoodsTopCategory().then(res => {
        this.setCategoryData(res)
      })
    },
    changeCategory () {
      if (this.form.category !== TEMP_KEY_TOP_LEVEL) {
        delete this.rules.detail
        this.rules.images = this.rulesRepertory.avatar
      } else {
        delete this.rules.images
        this.rules.detail = this.rulesRepertory.banner
      }
    },
    setCategoryData (res) {
      let topCategory = {
        title: '顶级分类',
        objectId: TEMP_KEY_TOP_LEVEL
      }
      this.categoryData = res
      this.categoryData.unshift(topCategory)
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
      let params = {}
      params.title = this.form.title
      if (this.form.category !== TEMP_KEY_TOP_LEVEL) {
        params.avatar = this.form.images.length > 0 ? this.form.images[0] : null
        params.parent = this.form.category
      } else {
        params.banner = this.form.detail.length > 0 ? this.form.detail[0] : null
      }
      this.submitParams(params)
    },
    submitParams (params) {
      ApiCategoryAdd(params).then(res => {
        window.Message.successMessage('创建成功')
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
.category-edit
  .content
    width 50%
</style>
