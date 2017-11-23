<template>
<nav class="my-nav">
  <ul>
    <li>
      <router-link class="my-nav-menu" to="/">Top</router-link>
    </li>
  </ul>
</nav>
</template>

<style>
.my-nav {
  display: flex;
  margin: 0 auto;
  background-color: #33363b;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #3b4045;
  border-bottom: none;
  padding: 0 20px;
}

.my-nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

.my-nav-menu {
  padding: 19px 18px;
  color: #C8C9CA !important;
  text-decoration: none;
}

</style>

