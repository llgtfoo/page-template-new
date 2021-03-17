<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/imgs/logo.png" />
    <!-- <loading></loading> -->
    <!-- <not-data></not-data> -->
    <!-- <not-found></not-found> -->
    <div class="drag" v-drag></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  async mounted() {
    // this.$http.post('/api/list').then((res: any) => {
    //   this.features = res.data
    // })
    // this.$axios.get('/api/list').then((res: any) => {
    //   this.features = res.data
    // })
    console.log(this, this.axios, this.$http, 'home')
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.drag {
  width: 100px;
  height: 100px;
  border: 1px solid red;
  position: absolute;
  background: cyan;
}
</style>
