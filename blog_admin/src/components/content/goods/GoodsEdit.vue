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
import { ApiGoodsCategory, ApiGoodsQuery, ApiGoodsEdit } from 'api/goods'
import { mapGetters } from 'vuex'
import { uploadImg } from 'common/js/mixinCommon'
// TODO 图片删除操作
export default {
  mixins: [uploadImg],
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
      this.form.images = this.form.images.map(image => {
        return image.url()
      })
      this.form.detail = this.form.detail.map(det => {
        return det.url()
      })
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
