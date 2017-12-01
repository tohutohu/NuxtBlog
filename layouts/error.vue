<template>
  <div>
    <my-header></my-header>
    <div class="main">
      <section class="container">
        <h1 class="title">
          お探しのページは見つかりませんでした
        </h1>
        <nuxt-link to="/">Topへ</nuxt-link>
      </section>
    </div>
    <my-footer/>
  </div>
</template>
<script>
import MyFooter from '~/components/Footer.vue'
import MyHeader from '~/components/Header.vue'

export default {
  props: ['error'],
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style>
.main {
  display: flex;
  justify-content: center;
}
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
</script>

