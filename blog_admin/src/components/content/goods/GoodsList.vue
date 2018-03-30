<template>
  <div class="goods-list">
    <div class="title">
      <el-row :gutter="20">
        <el-col :span="3"><h2>商品列表</h2></el-col>
        <el-col :span="3" :offset="18"><div><el-button type="success" round size="medium">添加商品</el-button></div></el-col>
      </el-row>
    </div>
    <div class="content">
      <el-table :data="tableData" :border=true
      :highlight-current-row=true v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column :resizable=false align="center" label="缩略图">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="100px">
          </template>
        </el-table-column>
        <el-table-column :resizable=false prop="title" align="center" label="名称" />
        <el-table-column :resizable=false prop="price" align="center" sortable label="价格" />
        <el-table-column :resizable=false prop="roleconst" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small">修改</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :page-size="pageMsg.pageSize" :current-page="pageMsg.pageNum" :total="pageMsg.total" @current-change="handlePageChange" layout="total,prev,pager,next,jumper"></el-pagination>
    </div>
  </div>
</template>
<script>
import { ApiGoodsCountPage, ApiGoodsList } from 'api/goods'
export default {
  data () {
    return {
      tableData: [],
      loading: true,
      pageMsg: {
        total: 1,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getPage()
    this.getList()
  },
  methods: {
    getPage () {
      ApiGoodsCountPage().then(res => {
        this.pageMsg.total = res.length
      })
    },
    getList () {
      this.loading = true
      ApiGoodsList(this.pageMsg).then(res => {
        if (Array.isArray(res)) {
          this.tableData = res.map(item => {
            return item.attributes
          })
          this.loading = false
        } else {
          console.error('goodslist', res)
        }
      })
    },
    handlePageChange (i) {
      this.pageMsg.pageNum = i
      this.getList()
    }
  }
}
</script>
<style lang="stylus" scoped>
.goods-list
  .title
    margin 20px 0
</style>
