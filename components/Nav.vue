<template>
<nav class="my-nav">
  <div class="my-nav-container">
    <ul>
      <li>
        <router-link class="my-nav-menu" to="/">Top</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<style>
.my-nav {
  display: flex;
  margin: 0 auto;
  background-color: #33363b;
  align-items: center;
  justify-content: center;
  border: 1px solid #3b4045;
  border-bottom: none;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

.my-nav-container {
  max-width: 766px;
  width:100%;
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

