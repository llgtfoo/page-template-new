<template>
  <div class="wrapper">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  text-align: center;
}
</style>
