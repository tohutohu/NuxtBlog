<template>
<div>
  <mavon-editor 
    v-if="show" 
    :ijhljs="false" 
    language="en"
    @imgAdd="uploadImage"
    @save="makeArticle"
    v-model="article.body"
  ></mavon-editor>
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
    console.log(this)
  },
  methods: {
    makeArticle () {
      let url = '/api/admin/articles'
      if (this.$route.params.id) {
        url += '/' + this.$route.params.id
      }
      axios.post(url, this.article)
        .then(() => {
          this.$toast.success('saved!')
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(JSON.stringify(err))
        })
    },
    uploadImage (pos, file) {
      const formdata = new FormData()
      formdata.append('image', file)
      axios({
        url: '/api/admin/image',
        method: 'POST',
        data: formdata,
        headers: {'Content-Type': 'multipart/form-data'}
      })
        .then(res => {
          console.log(res)
          this.$children[0].$img2Url(pos, res.data.path)
        })
    }
  }
}
</script>

<style>

</style>

