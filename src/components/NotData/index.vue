/**
 * @name: 无数据页面
 * @param {type}
 */
<template>
  <div class="page page-notData">
    <img
      class="img-notData"
      src="./assets/not-data.png"
      alt="notData"
    />
    <p class="msg-notData">暂无数据</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NotData',
})
</script>

<style lang="scss" scoped>
.page-notData {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9999;
  .img-notData {
    width: 300px;
    height: 165px;
    transform: translateX(24px);
  }
  .msg-notData {
    font-size: 18px;
    color: #666;
    margin: 16px 0 24px;
  }
}
</style>
