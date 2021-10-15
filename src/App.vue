<template>
  <theme-provider id="app" :theme="theme">
    <a-config-provider :locale="locale">
      <div class="wrapper">
        <router-view v-slot="{ Component, route }">
          <keep-alive v-if="Component && Object.keys(Component).length > 0">
            <component :is="Component" :route="route"> </component>
          </keep-alive>
          <loading v-else></loading>
        </router-view>
      </div>
    </a-config-provider>
  </theme-provider>
</template>

<script setup>
import { defineComponent, ref, computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useStore } from 'vuex'
const store = useStore()
const theme = computed(() => {
  return store.getters['common/user/userTheme']
})
const locale = ref(zhCN)

</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
