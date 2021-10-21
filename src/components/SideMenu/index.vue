<template>
  <a-layout style="height: 100%">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      class="menu-layout"
    >
      <a-menu
        mode="inline"
        theme="dark"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :collapsed="collapsed"
        @click="selectedItem"
        @openChange="onOpenChange"
      >
        <template v-for="v in currentMenu">
          <template v-if="!v.children">
            <a-menu-item :key="v.cnameKey">
              <icon-font :type="v.icon" v-if="v.icon" />
              <span>{{ v.cname }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu :menuInfo="v" :key="v.cnameKey" />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 10px; margintop: 0px">
        <a-breadcrumb style="margin: 7px 0px">
          <a-breadcrumb-item v-for="v in breadcrumb" :key="v.path">
            {{ v.title }}</a-breadcrumb-item
          >
        </a-breadcrumb>
        <div class="main" :style="{}">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
//阿里图标库引用
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2287282_0cednzk5tnru.js',
})
//菜单无限循环生成
const SubMenu = {
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    'icon-font': IconFont,
  },
  template: `
   <a-sub-menu :key="menuInfo.cnameKey" v-bind="$attrs">
     <template #title>
        <span>
        <icon-font :type="menuInfo.icon" v-if='menuInfo.icon'/>
         <span>{{menuInfo.cname }}</span>
        </span>
      </template>
     <template v-for="v in menuInfo.children" :key="v.cnameKey">
        <template v-if="!v.children">
         <a-menu-item :key="v.cnameKey">
         <icon-font :type="v.icon" v-if='v.icon'/>
            <span>{{v.cname}}</span>
          </a-menu-item>
        </template>
        <template v-else>
         <sub-menu :menu-info="v" :key="v.cnameKey" />
        </template>
    </template>
    </a-sub-menu>
  `,
}
import {
  createFromIconfontCN,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, reactive, ref, toRefs, computed, onMounted, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'SideMenu',
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    'sub-menu': SubMenu,
    'icon-font': IconFont,
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      collapsed: false,
      openKeys: [route.matched[1].path], //根据路由打开菜单
      selectedKeys: [route.fullPath], //根据路由选中菜单
      breadcrumb: [], //面包屑
    })
    //获取当前二级菜单
    const currentMenu = computed(() => {
      return store.getters['common/user/getCurrentMenu']['children']
    })
    onMounted(() => {
      getBreadcrumb(route.matched)
    })
    //监听路由变化，菜单选项变更
    watchEffect(() => {
      if (route.matched.length > 2) {
        state.openKeys = [route.matched[1].path] //根据路由打开菜单
      }
      state.selectedKeys = [route.fullPath]//根据路由选中菜单
      getBreadcrumb(route.matched)//根据路由获取面包屑
    })
    //获得面包屑数组
    function getBreadcrumb(list) {
      const set = new Set()
      list.forEach(v => {
        if (!v.meta.title) {
          return
        }
        set.add({ title: v.meta.title, path: v.path })
      })
      state.breadcrumb = Array.from(set)

    }
    //监测菜单收缩
    watch(() => state.collapsed, (newVal) => {
      if (newVal) {
        // state.openKeys = []
      } else {
        state.openKeys = [route.matched[1].path]
      }
    })
    //控制只打开一个菜单组
    const onOpenChange = (openKeys) => {
      if (openKeys.length !== 0) {
        state.openKeys = [openKeys[1]]
      } else {
        state.openKeys = ['']
      }
    }
    //点击跳转
    // eslint-disable-next-line no-unused-vars
    const selectedItem = ({ item, key, keyPath }) => {
      router.push(key)
    }
    return {
      ...toRefs(state),
      currentMenu,
      selectedItem,
      onOpenChange,
    }
  }
});
</script>
<style scoped lang='scss'>
.main {
  padding: 10px;
  overflow: hidden;
  background: #fff;
  height: calc(100% - 34px);
  padding-bottom: 0px;
  border-radius: 3px;
}
/deep/.ant-layout-sider-trigger {
  background: var(--header-top-bg-color);
}
/deep/.iconfont {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 24px;
  vertical-align: middle;
  display: inline-block;
}
</style>
<style>
.menu-layout .anticon {
  margin-right: 6px !important;
  font-size: 20px !important;
  vertical-align: -0.185em !important;
}
</style>