<template>
  <theme-provider
    id='app'
    :theme='theme'
  >
    <a-config-provider :locale="locale">
      <div class="wrapper">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component
              :is="Component"
              :route="route"
            />
          </keep-alive>
        </router-view>
      </div>
    </a-config-provider>
  </theme-provider>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
  setup() {
    const proxy: any = getCurrentInstance().proxy//获取App全局变量

    const theme = computed(() => {
      return proxy.$store.getters['common/user/userTheme']
    })

    return { locale: ref(zhCN), theme }
  }
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

