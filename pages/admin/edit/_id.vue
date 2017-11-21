<template>
<div>
  <mavon-editor v-if="show" :ijhljs="true" v-model="article.body"></mavon-editor>
  <input type="text" placeholder="title" v-model="article.title">
  <input type="text" placeholder="state" v-model="article.state">
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
  asyncData () {
    return {
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
  },
  fetch ({store, redirect}) {
    if (!store.state.authUser) {
      return redirect('/admin/login')
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    makeArticle () {
      axios.post('/api/admin/articles', this.article)
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

