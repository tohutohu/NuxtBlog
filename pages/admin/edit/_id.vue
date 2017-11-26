<template>
<div>
  <mavon-editor v-if="show" :ijhljs="true" v-model="article.body"></mavon-editor>
  <input type="text" placeholder="title" v-model="article.title">
  <select v-model="article.state">
    <option value="publish">publish</option>
    <option value="draft">draft</option>
  </select>
  <input type="text" placeholder="category" v-model="article.category">
  <button @click="makeArticle">djfaosdijfa</button>
</div>
</template>

<script>
import Vue from 'vue'
import axios from '~/plugins/axios.js'
if (process.browser) {
  const mavonEditor = require('mavon-editor')
  require('mavon-editor/dist/css/index.css')
  Vue.use(mavonEditor)
}
export default {
  name: 'adminEdit',
  layout: 'admin',
  async asyncData ({params}) {
    const data = {
      show: false,
      article: {
        title: '',
        category: '',
        tags: [],
        body: '',
        thumbnailURL: '',
        published: null,
        state: 'draft',
        lastModified: null
      }
    }

    if (params.id) {
      const res = await axios.get('/api/admin/articles/' + params.id)
      data.article = Object.assign(data.article, res.data[0])
    }

    return data
  },
  fetch ({store, redirect}) {
    if (process.env.NODE_ENV === 'production' && !store.state.authUser) {
      return redirect('/admin/login')
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    makeArticle () {
      let url = '/api/admin/articles'
      if (this.$route.params.id) {
        url += '/' + this.$route.params.id
      }
      axios.post(url, this.article)
        .then(() => {
          this.$toast.success(this.$t('poi'))
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(JSON.stringify(err))
        })
    }
  }
}
</script>

<style>

</style>

