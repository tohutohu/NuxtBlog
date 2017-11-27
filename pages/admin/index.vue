<template>
<div>
  <div class="admin-article-list" v-for="article in articles">
    <nuxt-link class="admin-article-list-item" :to="'/admin/edit/'+article.id">
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
      url: '/api/admin/articles',
      method: 'GET',
      withCredentials: true
    })
    return {
      articles: data
    }
  },
  fetch ({store, redirect}) {
    if (!store.state.authUser) {
      return redirect('/admin/login')
    }
  },
  filters: {
    dateFormatter (val) {
      if (!moment(val).isValid()) {
        return 'Not publish'
      }
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style>
.admin-article-list-item {
  display: flex;
  margin-bottom: 12px;
}

</style>

