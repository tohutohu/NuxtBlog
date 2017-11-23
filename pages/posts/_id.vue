<template>
<div class="article-container">
  <h1 class="article-title">{{article.title}}</h1>
  <vue-markdown :source="article.body" class="content"></vue-markdown>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Post',
  transition: 'slide-fade',
  async asyncData ({params, payload}) {
    if (payload) {
      return payload
    }
    const { data } = await axios.get('/api/articles/' + params.id)
    return data
  },
  head () {
    return {
      title: this.article.title + ' | とーふとふのブログ'
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style>
.article-container {
  padding: 10px 25px 20px 25px;
}

.article-title {
  margin: 24px;
}

.content {
  max-width: 765px;
  line-height: 1.55em;
  font-size:18px;
}

</style>

