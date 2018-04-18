<template>
  <el-card class="category-list">
    <div slot="header">
      <el-row :gutter="20">
        <el-col :span="2"><div>分类列表</div></el-col>
        <el-col :span="2" :offset="20"><div><el-button type="success" round size="medium" @click="goCategoryEdit">添加分类</el-button></div></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-collapse v-model="activeNames" class="content-collapse">
        <el-collapse-item :name="index" v-for="(category, index) in categoryData" :key="category.objectId">
          <template slot="title">
            <el-row :gutter="20">
              <el-col :span="2"><div>{{category.title}}</div></el-col>
              <el-col :span="2" :offset="10"><div><el-button size="mini" @click.stop="handleEdit">编辑</el-button></div></el-col>
              <el-col :span="2"><div><el-button size="mini" type="danger" :disabled="category.children.length!==0" @click.stop="handleDelete(category.objectId)">删除</el-button></div></el-col>
            </el-row>
          </template>
          <el-table
            :data="category.children"
            border
            align="center"
            style="width: 80%"
            class="category-list-table">
            <el-table-column
              label="缩略图"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px"><img :src="scope.row.images"></span>
              </template>
            </el-table-column>
            <el-table-column
              label="品名"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.objectId)"
                  >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>
<script>
import { ApiGoodsCategory } from 'api/goods'
import { ApiCategoryDelete } from 'api/category'
export default {
  data () {
    return {
      categoryData: [],
      activeNames: '1'
    }
  },
  created () {
    this.getGoodsCategory()
  },
  methods: {
    getGoodsCategory () {
      ApiGoodsCategory().then(res => {
        this.categoryData = res
      })
    },
    goCategoryEdit () {
      this.$router.push({name: 'category-edit'})
    },
    handleEdit () {
      console.log('编辑页面')
    },
    handleDelete (id) {
      window.Message.confirmDeleteMessage().then(() => {
        ApiCategoryDelete(id).then(res => {
          window.Message.successMessage('删除成功')
          this.getGoodsCategory()
        }).catch(() => {
          window.Message.errorMessage('删除失败')
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.category-list-table
  img
    width 140px
    height 140px
</style>
