<template>
  <div class='llgtfoo'>
    home
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const that = getCurrentInstance()
console.log(that,'this',axios)
</script>

<style lang="scss" scoped>
</style>