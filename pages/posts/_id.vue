<template>
<div class="article-container">
  <h1>{{article.title}}</h1>
  <vue-markdown :source="article.body"></vue-markdown>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Post',
  async asyncData ({params}) {
    const { data } = await axios.get('/api/articles/' + params.id)
    return data
  },
  components: {
    VueMarkdown
  }
}
</script>

<style>
.article-container {
  padding: 10px 45px 20px 45px;
}

</style>

