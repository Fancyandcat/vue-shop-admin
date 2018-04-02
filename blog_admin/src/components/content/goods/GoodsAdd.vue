<template>
  <div class="goods-add">
    <div class="title">
      <el-row :gutter="20">
        <el-col :span="3"><h2>添加商品</h2></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option-group
              v-for="group in categoryData"
              :key="group.title"
              :label="group.title">
              <el-option
                v-for="item in group.children"
                :key="item.title"
                :label="item.title"
                :value="item.objectId">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="是否新品">
          <el-switch v-model="form.isNew"></el-switch>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-switch v-model="form.isHot"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
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
      options3: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]
    }
  },
  created () {
    this.getGoodsCategory()
  },
  methods: {
    getGoodsCategory () {
      this.categoryData = ApiGoodsCategory()
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
</style>
