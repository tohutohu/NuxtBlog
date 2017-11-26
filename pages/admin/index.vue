<template>
<div>
  <div class="admin-article-list" v-for="article in articles">
    <nuxt-link :to="'/admin/edit/'+article.id">
      <div>{{article.id}}</div>
      <div>{{article.title || 'No title'}}</div>
      <div>{{article.state}}</div>
      <div>{{article.published | dateFormatter}}</div>
    </nuxt-link>
  </div>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'

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
    if (!process.env.NODE_ENV === 'production' && !store.state.authUser) {
      return redirect('/admin/login')
    }
  },
  filters: {
    dateFormatter (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style>

</style>

