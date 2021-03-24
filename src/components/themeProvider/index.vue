/**
 * @name: 主题定制
 * @param {type}
 */
<template>
  <div
    class='theme-wrapper'
    :style='`--theme:${theme};`'
    v-show='themeLoaded'
  >
    <slot />
  </div>
</template>

<script>
import './theme/theme.scss'
import loadTheme from './script/loadTheme'
import { defineComponent,ref,watch } from 'vue'
export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: String,
    },
  },
  setup(props) {
    loadTheme(props.theme)
    document.body.className = ''
    document.body.classList.add(`theme-${props.theme}`)

    watch(() => props.theme,(t) => {
      loadTheme(t)
      document.body.className = ''
      document.body.classList.add(`theme-${t}`)
    })
    return {
      themeLoaded: ref(true)
    }

  }
})
</script>

<style lang="scss" scoped>
.theme-wrapper {
  width: 100%;
  height: 100%;
}
</style>
