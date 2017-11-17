<template>

</template>

<script>
export default {
  name: 'adminIndex',
  layout: 'admin',
  fetch ({store, redirect}) {
    if (!store.state.authUser) {
      return redirect('/admin/login')
    }
  }
}
</script>

<style>

</style>

