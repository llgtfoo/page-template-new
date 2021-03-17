<template>
  <div :class="styles.loadingWarp">
    <div :class="styles.loading">
      <div :class="styles.dot"></div>
      <div :class="styles.dot"></div>
      <div :class="styles.dot"></div>
      <div :class="styles.dot"></div>
      <div :class="styles.dot"></div>
    </div>
  </div>
</template>
<script lang="ts">
import styles from './index.module.scss';
import { Options, Vue } from 'vue-class-component';
@Options({})
export default class Loading extends Vue {
  styles: any = styles;
}
</script>
