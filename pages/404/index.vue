<template>
  <section class="container">
    <h1 class="title">
      お探しのページは見つかりませんでした
    </h1>
    <nuxt-link to="/">Topへ</nuxt-link>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: 'Not found'
    }
  }
}
</script>

<style>

</style>

