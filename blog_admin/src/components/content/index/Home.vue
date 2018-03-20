<template>
  <div>
    <button @click="addData">click</button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created () {
  },
  methods: {
    addData () {
      var todo = window.AV.Object.createWithoutData('TestObject', '5ab0b77c75657116a39210f5')
      todo.destroy().then(function (success) {
        console.log('成功', success)
      }, function (error) {
        console.error(error)
      })
    }
  }
}
</script>
