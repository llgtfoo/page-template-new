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

<script>
import { defineComponent,ref,computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const store = useRoute()
    const theme = computed(() => {
      return store.getters['common/user/userTheme']
    })
    return { locale: ref(zhCN),theme }
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