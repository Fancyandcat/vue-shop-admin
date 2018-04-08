<template>
  <div class="goods-add">
    <div class="title">
      <el-row :gutter="20">
        <el-col :span="3"><h2>添加商品{{form.category}}</h2></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-form ref="addForm" :model="form" label-width="80px" :rules="rules" >
        <el-form-item label="商品名称" prop="name">
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
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-switch v-model="form.isNew"></el-switch>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-switch v-model="form.isHot"></el-switch>
        </el-form-item>
        <el-form-item label="产品图">
          <input type="file">
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
import { ApiGoodsCategory } from 'api/goods'
export default {
  data () {
    return {
      form: {
        title: '',
        price: 0,
        isNew: false,
        isHot: false,
        category: ''
      },
      categoryData: [],
      rules: {
        name: [{required: true, message: '请输入商品名', trigger: 'blur'}],
        category: [{required: true, message: '请定义商品类型', trigger: 'blur'}],
        price: [{required: true, message: '请输入商品价格', trigger: 'blur', type: 'number'}]
      },
      imageUrl: ''
    }
  },
  created () {
    this.getGoodsCategory()
    this.ceshi()
  },
  methods: {
    getGoodsCategory () {
      ApiGoodsCategory().then(res => {
        this.categoryData = res
        console.log(this.categoryData)
      })
    },
    ceshi () {
      // http://fancyandcat.leanapp.cn/upload/avatar
      this.$post('http://fancyandcat.leanapp.cn/uploadImg/getToken').then((res) => {
        console.log('token', res)
      })
    },
    // 关于上传图片的操作
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
