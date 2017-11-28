<template>
<div>
  <div>
    <div class="table-header">
      <div class="table-article-id">ID</div>
      <div class="table-article-title">Title</div>
      <div class="table-article-state">State</div>
      <div class="table-article-published">Published</div>
    </div>
    <div class="table-content" v-for="article in articles">
      <div class="table-article-id">{{article.id}}</div>
      <div class="table-article-title">
        <nuxt-link class="admin-article-list-item" :to="'/admin/edit/'+article.id">
          {{article.title || 'No title'}}
        </nuxt-link>
      </div>
      <div class="table-article-state">{{article.state}}</div>
      <div class="table-article-published">{{article.published | dateFormatter}}</div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'

export default {
  name: 'adminIndex',
  layout: 'admin',
  middleware: 'authenticated',
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

.table-header, 
.table-content {
  display: flex;
  justify-content: center;
  min-height: 36px;
  margin-left: 24px;
  margin-right: 24px;
}

.table-article-id {
  width: 10%;
  max-width: 72px;
  min-width: 36px;
  border: solid 1px #ccc;
  display: flex;
  justify-content: center;
  content-align: center;
  box-sizing: border-box;
  padding: 3px;
}

.table-article-title{
  width: 50%;
  min-width: 120px;
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding: 3px;
}

.table-article-state {
  width: 20%;
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding: 3px;
}

.table-article-published{
  width: 30%;
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding: 3px;
}
</style>

