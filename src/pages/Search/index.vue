<template>
  <div>
      <!-- {{$route.params.keyword}} -->
      <!-- {{$route.query.keyword1}} -->
      <TypeNav></TypeNav>
  </div>
</template>

<script>
export default {
    name:'Search',
    mounted(){
      console.log(this)
    }

}
</script>

<style scoped>

</style>