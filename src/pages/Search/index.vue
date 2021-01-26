<template>
  <div>
      Search
      <!-- {{$route.params.keyword}} -->
      {{$route.query.keyword1}}
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