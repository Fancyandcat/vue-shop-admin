<template>
  <div class="goods-table">
    <el-table :data="this.data" :border="true"
      :highlight-current-row="true"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column :resizable="false" align="center" label="缩略图">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="100px">
        </template>
      </el-table-column>
      <el-table-column :resizable="false" prop="title" align="center" label="名称" />
      <el-table-column :resizable="false" prop="price" align="center" sortable label="价格" />
      <el-table-column :resizable="false" prop="category.attributes.title" align="center" label="分类" />
      <el-table-column :resizable="false" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.isNew">新品</el-tag>
          <el-tag type="danger" v-if="scope.row.isHot">热卖</el-tag>
        </template>
      </el-table-column>
      <el-table-column :resizable="false" prop="createdAt" align="center" label="创建时间" :formatter="getMatterCreatedDate"/>
      <el-table-column :resizable="false" prop="updatedAt" align="center" label="更新时间" :formatter="getMatterUpdatedAtDate"/>
      <el-table-column :resizable="false" prop="roleconst" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { stamp2time } from 'common/js/common'
import { ApiGoodsDelete } from 'api/goods'
import { mapMutations } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tableData: this.data
    }
  },
  methods: {
    getMatterCreatedDate (row, column) {
      let date = new Date(row.createdAt)
      return stamp2time(date.getTime())
    },
    getMatterUpdatedAtDate (row, column) {
      let date = new Date(row.updatedAt)
      return stamp2time(date.getTime())
    },
    goGoodsEdit () {
      this.$router.push({name: 'goods-edit'})
    },
    handleDelete (id) {
      let that = this
      window.Message.confirmDeleteMessage().then(() => {
        ApiGoodsDelete(id).then(res => {
          window.Message.successMessage('删除成功')
          that.$emit('getList')
        }).catch(() => {
          window.Message.errorMessage('删除失败')
        })
      })
    },
    handleEdit (id) {
      this.setGoodsId(id)
      this.goGoodsEdit()
    },
    ...mapMutations('Goods', {
      'setGoodsId': 'SET_GOODS_ID'
    })
  }
}
</script>
