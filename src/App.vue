<template>
  <a-config-provider :locale="locale">
    <div class="wrapper">
      <keep-alive>
        <router-view v-slot="{ Component, route }">
          <component
            :is="Component"
            :route="route"
          />
        </router-view>
      </keep-alive>
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent, ref } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
export default defineComponent({
  setup() {
    return { locale: ref(zhCN) }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>