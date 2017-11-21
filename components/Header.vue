<template>
<header class="my-header">
<div class="blog-name">{{name}}</div>
<div class="catch-copy">{{catchCopy}}</div>
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
  height: 240px;
  background-color: #26272b;
}

.blog-name, .catch-copy {
  color: #ffffff;
  max-width: 900px;
}

.blog-name {
  font-size: 35px;
  font-weight: 700;
  padding: 50px 0 30px 18px;
  padding-left: 13%;
}

.catch-copy {
  font-size: 20px;
  padding: 0 0 20px 150px;
  padding-left: 22%;
}

</style>

