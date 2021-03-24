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
  //   data() {
  //     return {
  //       themeLoaded: true,
  //       styleDom: document.createElement('style'),
  //     }
  //   },
  //   watch: {
  //     theme(t) {
  //       loadTheme(t)
  //       document.body.className = ''
  //       document.body.classList.add(`theme-${t}`)
  //     },
  //   },
  //   async created() {
  //     loadTheme(this.theme)
  //     document.body.className = ''
  //     document.body.classList.add(`theme-${this.theme}`)
  //   },
})
</script>

<style lang="scss" scoped>
.theme-wrapper {
  width: 100%;
  height: 100%;
}
</style>
