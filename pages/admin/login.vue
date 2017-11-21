<template>
<div>
  <input type="text" name="user" v-model="form.user">
  <input type="password" name="pass" v-model="form.pass">
  <input type="submit" @click="login" value="$t('loginButton')">
</div>
</template>

<script>
export default {
  name: 'login',
  layout: 'none',
  fetch ({store, redirect}) {
    if (store.state.authUser) {
      return redirect('/admin')
    }
  },
  async asyncData () {
    return {
      form: {
        user: '',
        pass: ''
      }
    }
  },
  methods: {
    async login () {
      await this.$store.dispatch('login', this.form)
      if (this.$store.state.authUser) {
        this.$router.push('/admin')
      }
    }
  }
}
</script>

<style>

</style>

