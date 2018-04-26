<template>
  <div class="index-home">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="card-goods box-card">
          <div slot="header">
            <span>在线商品</span>
          </div>
          <div class="card-chart" id="goods-chart"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ApiGoodsCategory } from 'api/goods'
import { OptionGoodsCard } from 'common/js/echartConfig'
var echarts = require('echarts')
export default {
  data () {
    return {
      categoryData: []
    }
  },
  created () {
    this.initCard()
  },
  methods: {
    initCard () {
      this.setGoodsCard()
    },
    setGoodsCard () {
      ApiGoodsCategory().then(res => {
        let tempArr = []
        res.forEach(cate => {
          tempArr.push({
            value: cate.children.length,
            name: cate.title
          })
        })
        this.categoryData = tempArr
        this.$nextTick(() => {
          try {
            let option = OptionGoodsCard(this.categoryData.sort(function (a, b) { return a.value - b.value }))
            this.drawGoodsCate(option)
          } catch (err) {
            console.log('echart', err)
          }
        })
      })
    },
    drawGoodsCate (option) {
      var myChart = echarts.init(document.getElementById('goods-chart'))
      console.log('启动')
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="stylus" scoped>
.index-home
  .box-card
    margin 10px
    .card-chart
      width 100%
      height 300px
</style>
