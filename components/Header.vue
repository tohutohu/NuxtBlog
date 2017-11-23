<template>
<header class="my-header">
  <div class="header-container">
    <div class="blog-name">{{name}}</div>
    <div class="catch-copy">{{catchCopy}}</div>
  </div>
  <my-nav></my-nav>
</header>
</template>
<script>
import {Client} from '~/config'
import MyNav from '~/components/Nav.vue'

export default {
  name: 'MyHeader',
  data () {
    return Client.blog
  },
  components: {
    MyNav
  }
}
</script>

<style>
.my-header {
  background-color: #26272b;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.header-container {
  width: 100%;
  max-width: 766px;
  margin: 0 auto;
}

.blog-name, .catch-copy {
  color: #ffffff;
  max-width: 900px;
}

.blog-name {
  font-size: 35px;
  font-weight: 700;
  padding: 48px 12px 12px 12px;
}

.catch-copy {
  font-size: 20px;
  padding: 6px 36px 12px 180px;
}

</style>

