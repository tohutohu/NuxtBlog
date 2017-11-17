<template>

</template>

<script>
export default {
  name: 'adminIndex',
  fetch ({store, redirect}) {
    if (!store.state.authUser) {
      return redirect('/admin/login')
    }
  }
}
</script>

<style>

</style>

