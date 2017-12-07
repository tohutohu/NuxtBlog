<template>
  <section class="container">
    <h1 class="title">
      POSTS
    </h1>
    <div>
      <div class="top" v-for="article in articles">
        <nuxt-link :to="'/posts/' + article.id">
          <div class="top-article-title">{{article.title}}</div>
        </nuxt-link>
        <div class="article-tags" v-for="tag in article.tags" v-if="article.tags.length > 0">
          <div>{{tag}}</div>
        </div>
        <div class="date">
          {{article.published | date}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'
import {Client} from '~/config'

export default {
  transition: 'slide-fade',
  async asyncData ({payload}) {
    if (payload) {
      return payload
    }
    let { data } = await axios.get('/api/articles')
    return data
  },
  head () {
    return {
      title: Client.blog.name
    }
  },
  filters: {
    date (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  }
}
</script>

<style >
.container
{
  width: 100%;
  max-width: 765px;
  padding: 60px 0 !important;
}

.top {
  padding: 12px 24px 18px 12px;
  width: 100%;
  max-width: 765px;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.top-article-title {
  margin: 24px;
  margin-bottom: 6px;
  font-size: 18px;
}

.title {
  padding-bottom: 24px;
}

</style>
