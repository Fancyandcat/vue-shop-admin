<template>
  <el-card class="goods-list">
    <div slot="header">
      <el-row :gutter="20">
        <el-col :span="2"><div>商品列表</div></el-col>
        <el-col :span="6"><div><el-autocomplete placeholder="搜索商品" icon="search" v-model="searchObj.keyword" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete></div></el-col>
        <el-col :span="2" :offset="14"><div><el-button type="success" round size="medium" @click="goGoodsEdit">添加商品</el-button></div></el-col>
      </el-row>
    </div>
    <div class="content">
      <goods-table :data="tableData" v-loading="loading" @getList="getList"></goods-table>
      <el-pagination :page-size="pageMsg.pageSize" :current-page="pageMsg.pageNum" :total="pageMsg.total" @current-change="handlePageChange" layout="total,prev,pager,next,jumper"></el-pagination>
    </div>
    <el-dialog
      title="搜索"
      :visible.sync="dialogVisible"
      width="70%">
      <span slot="footer" class="dialog-footer">
        <goods-table :data="aGoodsData"></goods-table>
        <el-button type="primary" @click="handleCloseDialog">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import { ApiGoodsCountPage, ApiGoodsList, ApiGoodsAutocomplete, ApiGoodsQuery } from 'api/goods'
import { mapMutations } from 'vuex'
import GoodsTable from './GoodsTable'
export default {
  components: {
    GoodsTable
  },
  data () {
    return {
      tableData: [],
      loading: true,
      aGoodsData: [],
      pageMsg: {
        total: 1,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      searchObj: {
        keyword: ''
      },
      timeout: null
    }
  },
  created () {
    this.resetGoodsId()
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
            return {
              ...item.attributes,
              id: item.id,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt
            }
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
    },
    resetGoodsId () {
      this.setGoodsId('')
    },
    goGoodsEdit () {
      this.$router.push({name: 'goods-edit'})
    },
    querySearchAsync (queryString, cb) {
      console.log(queryString, 0)
      if (queryString !== '') {
        ApiGoodsAutocomplete(queryString).then((res) => {
          let data = []
          res.forEach(element => {
            data.push({'value': element.get('title'), 'objectId': element.get('objectId')})
          })
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            cb(data)
          }, 500)
        })
      }
    },
    handleSelect (item) {
      ApiGoodsQuery(item.objectId).then(res => {
        let tempArr = []
        tempArr.push({
          ...res.attributes,
          id: res.id,
          createdAt: res.createdAt,
          updatedAt: res.updatedAt
        })
        this.aGoodsData = tempArr
      })
      this.dialogVisible = true
    },
    handleCloseDialog () {
      this.dialogVisible = false
      this.searchObj.keyword = ''
    },
    ...mapMutations('Goods', {
      'setGoodsId': 'SET_GOODS_ID'
    })
  }
}
</script>
<style lang="stylus" scoped>
.goods-list
  .title
    margin 20px 0
</style>
