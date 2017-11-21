<template>
<div>
{{articles}}
</div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'adminIndex',
  layout: 'admin',
  async asyncData () {
    const {data} = await axios({
      url: '/api/admin/articles'
    })
    return {
      articles: data
    }
  },
  fetch ({store, redirect}) {
    if (!store.state.authUser) {
      return redirect('/admin/login')
    }
  }
}
</script>

<style>

</style>

