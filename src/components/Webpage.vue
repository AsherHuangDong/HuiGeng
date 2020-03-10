<template>
  <div v-html="content" />
</template>

<script>
export default {
  data() {
    return {
      content:''
    }
  },
  mounted() {
    this.getDescription()
  },
  methods: {
    getDescription() {
      this.$get('/api/bg/projectDesc/all').then(res => {
        console.log(res.data)
        this.content = res.data.info[0].projectDesc
      })
    }
  }
}
</script>

<style scoped>

</style>