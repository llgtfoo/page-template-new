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

<script lang='ts'>
import './theme/theme.scss'
import loadTheme from './script/loadTheme'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: {
      type: String,
    },
  },
  setup(props) {
    const count = ref(1)
    loadTheme(props.theme, count.value, () => {
      count.value++
    })
    document.body.className = ''
    document.body.classList.add(`theme-${props.theme}`)

    watch(() => props.theme, (t) => {
      loadTheme(t, count.value, () => {
        count.value++
      })
      document.body.className = ''
      document.body.classList.add(`theme-${t}`)
    })
    return {
      themeLoaded: ref(true),
      count
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
