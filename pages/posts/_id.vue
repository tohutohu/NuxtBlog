<template>
<div class="article-container">
  <h1 class="article-title">{{article.title}}</h1>
  <div class="content" v-html="parseMarkdown(article.body)"></div>
  <nuxt-link v-if="$store.state.authUser" :to="'/admin/edit/' + $route.params.id">Edit</nuxt-link>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
}).use(prism, {})

export default {
  name: 'Post',
  transition: 'slide-fade',
  validate ({params}) {
    return !isNaN(params.id)
  },
  async asyncData ({params, payload, error}) {
    if (payload) {
      return payload
    }

    try {
      const { data } = await axios.get('/api/articles/' + params.id)
      return data
    } catch (err) {
      error({statusCode: 404})
    }
  },
  head () {
    return {
      title: this.article.title + ' | とーふとふのブログ'
    }
  },
  methods: {
    parseMarkdown (body) {
      return md.render(body)
    }
  }
}
</script>

<style>
.article-container {
  padding: 12px 24px 18px 24px;
  width: 100%;
  max-width: 765px;
}

.article-title {
  margin: 24px;
}

.content {
  max-width: 765px;
  line-height: 1.55em;
  font-size:18px;
}

img {
  max-width: 90%;
}

</style>

