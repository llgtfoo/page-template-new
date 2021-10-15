/**
 * @name: 列表自定义显示项
 * @param {type}
 */
<template>
  <div class="list-custom-list">
    <a-dropdown placement="topLeft" :trigger="['click']" v-model="visible">
      <div @click="(e) => e.preventDefault()">
        <UnorderedListOutlined />
        <span style="margin-left: 5px">列表自定义</span>
      </div>
      <template #overlay>
        <a-menu>
          <a-checkbox
            v-for="(v, i) in columns"
            :key="i"
            :checked="v.show"
            @change="(e) => onChange(e, v)"
            :disabled="v.show && disabled"
          >
            {{ v.title }}
          </a-checkbox>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'ListCustom',
  props: {
    columns: {
      type: Array,
      default: () => [],
    }, //列表项
    showNumber: {
      type: Number,
      default: 5,
    }, //最少显示多少项
  },
  components: {
    UnorderedListOutlined
  },
  setup(props, context) {
    let visible = ref(false)
    let disabled = ref(false)
    function onChange(e, data) {
      data.show = e.target.checked
      context.emit('changeColumns', props.columns)
      if (props.columns.filter((v: any) => v.show).length <= props.showNumber) {
        disabled.value = true
      } else {
        disabled.value = false
      }
    }
    return {
      visible,
      disabled,
      onChange
    }
  }
})
</script>

<style lang="scss" scoped>
.list-custom-list {
  position: absolute;
  cursor: pointer;
  left: 0;
  bottom: 25px;
  > span {
    margin-left: 10px;
  }
}
.list-columns {
  margin: 0;
  padding: 4px 0;
  text-align: left;
  list-style-type: none;
  background-color: cyan;
  background-clip: padding-box;
  border-radius: 4px;
  outline: none;
  // box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
}
.ant-dropdown-menu {
  display: flex;
  flex-direction: column;
  // align-items: center;
  max-height: 215px !important;
  overflow-y: auto !important;
  .ant-checkbox-wrapper {
    &:first-of-type {
      margin-left: 8px;
    }
  }
}
</style>