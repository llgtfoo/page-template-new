<template>
  <div class="wrapper">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :route="route" />
    </router-view>
  </div>
</template>

<script>
import Bus from 'utils/bus';
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    add() {
      Bus.$emit('llg', 'llgtf')
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
