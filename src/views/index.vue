<template>
  <div>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    />
    {{store.state.email}}
    index
    <not-data></not-data>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped>
</style>