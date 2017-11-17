<template>
<div>
  <input type="text" name="user" v-model="form.user">
  <input type="password" name="pass" v-model="form.pass">
  <input type="submit" @click="$store.dispatch('login', form)" value="$t('loginButton')">
</div>
</template>

<script>
export default {
  name: 'login',
  layout: 'none',
  async asyncData () {
    return {
      form: {
        user: '',
        pass: ''
      }
    }
  }
}
</script>

<style>

</style>

