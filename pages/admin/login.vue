<template>
<div class="login-page">
  <div class="login-form">
    <div class="login-form-item title">Admin Login</div>
    <div class="login-form-item">
      <label for="user" class="login-form-label">User:</label>
      <input type="text" name="user" v-model="form.user">
    </div>
    <div class="login-form-item">
      <label for="pass" class="login-form-label">Pass:</label>
      <input type="password" name="pass" v-model="form.pass">
    </div>
    <div class="login-form-item login-button">
      <input type="submit" @click="login" value="Login" class="square-button black">
    </div>
  </div>
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
.login-page {
  display: flex;
  justify-content: center;
}

.login-form {
  margin-top: 48px;
}

.login-form-item {
  padding-bottom: 12px;
  display: flex;
  justify-content: center;
}

.login-form-label {
  margin-right: 6px;
}

.login-button {
  padding-top: 6px;
}

.title {
  font-size: 36px;
  padding-bottom: 18px;
}
</style>

