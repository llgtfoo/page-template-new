/**
 * @name:系统菜单
 * @param {type}
 */
<template>
  <a-layout style="height:100%">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="menu-layout"
    >
      <!--系统logo-->
      <div class="logo">
        <p v-if="!collapsed">系统管理</p>
        <icon-font
          v-else
          type="icon-feeds-fill"
          style="color:#fff;fontSize:40px"
        ></icon-font>
      </div>
      <a-menu
        mode="inline"
        theme="dark"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :inlineCollapsed="collapsed"
        @click="selectedItem"
        @openChange="onOpenChange"
      >
        <template v-for="v in menusJson">
          <template v-if="!v.children">
            <a-menu-item :key="v.cnameKey">
              <icon-font
                :type="v.icon"
                v-if="v.icon"
              />
              <span>{{v.cname}}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <sub-menu
              :menuInfo="v"
              :key="v.cnameKey"
            />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class='layout-header-nav'>
        <menu-unfold-outlined
          v-if="collapsed"
          :style="{color:'#fff',fontSize:'25px'}"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          :style="{color:'#fff',fontSize:'25px'}"
          @click="() => (collapsed = !collapsed)"
        />
        <div class="system-name">
          {{sysName}}
        </div>
        <div class="system-time">
          <date-time v-slot:default='slotProps'>
            {{slotProps.data.year}}年
            {{slotProps.data.month}}月
            {{slotProps.data.day}}日&nbsp;&nbsp;&nbsp;
            {{slotProps.data.week}}&nbsp;&nbsp;&nbsp;
            {{slotProps.data.time}}
          </date-time>
        </div>
        <div class="login-userInfo">
          <a-dropdown
            placement="bottomRight"
            :trigger="['click']"
            v-model="visible"
          >
            <a-avatar style="backgroundcolor: #87d068">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <template #overlay>
              <a-menu
                mode="vertical"
                @click='infoChange'
                v-model:selectedKeys="current"
              >

                <a-menu-item :key='1'>
                  <UserOutlined />账户设置
                </a-menu-item>
                <a-menu-item :key='2'>
                  <UserOutlined />退出登录
                </a-menu-item>
                <a-sub-menu>
                  <template #title>
                    <span class="submenu-title-wrapper">
                      <setting-outlined />
                      一键换肤
                    </span>
                  </template>
                  <a-menu-item-group>
                    <a-menu-item key="setting:1">蓝色</a-menu-item>
                    <a-menu-item key="setting:2">红色</a-menu-item>
                    <a-menu-item key="setting:3">橙色</a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        class="layout-content"
        :style="{margin: '10px'}"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import menusJson from 'mock/menus/index.json'
import {
  createFromIconfontCN,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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

export default defineComponent({
  name: 'Layout',
  components: {
    SettingOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    'sub-menu': SubMenu,
    'icon-font': IconFont,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    // console.log(route, router, route.fullPath)
    const state = reactive({
      current: ['setting:1'],
      visible: false,
      menusJson, //mock数据
      collapsed: false,
      openKeys: [route.matched[0].path], //根据路由打开菜单
      selectedKeys: [route.fullPath], //根据路由选中菜单
    })
    //当前选择菜单名称
    const sysName = computed(() => {
      return route.meta.name
    })
    //监测菜单收缩
    watch(() => state.collapsed, (newVal) => {
      if (newVal) {
        state.openKeys = []
      } else {
        state.openKeys = [route.matched[0].path]
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

    const infoChange = function (e) {
      console.log(e, 'e')
      state.current = [e.key]
    }
    return {
      sysName,
      onOpenChange,
      selectedItem,
      infoChange,
      ...toRefs(state),
    }
  },
})
</script>
<style lang='scss' scoped>
.layout-content {
  background: #fff;
  padding: 20px;
  margin: 0;
  overflow: hidden;
  min-width: 1000px;
  padding-bottom: 0px;
}
.ant-layout-header {
  align-items: center;
  height: 50px;
  display: flex;
  padding: 0px;
  line-height: 64px;
  background: #001529;
  padding-left: 10px;
  .system-name {
    color: rgb(255, 255, 255);
    font-size: 20px;
    margin-left: 30px;
    background: rgba(15, 131, 247, 0.8);
    height: 35px;
    line-height: 35px;
    padding: 0 20px;
    border-radius: 3px;
    letter-spacing: 5px;
    text-align: center;
  }
  .system-time {
    color: #fff;
    margin-left: auto;
    margin-right: 100px;
    font-size: 20px;
    font-weight: bolder;
    height: 50px;
    line-height: 50px;
  }
  .login-userInfo {
    margin-right: 20px;
    cursor: pointer;
  }
}
.ant-layout-sider {
  background: #001529;
}
.menu-layout {
  /deep/.ant-layout-sider-trigger {
    background: rgba(24, 144, 255, 0.8);
  }
  .logo {
    height: 50px;
    background: #1890ff;
    // margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin-bottom: 0px;
      font-size: 16px;
      font-weight: bolder;
      color: #fff;
    }
  }
}
</style>
<style>
.menu-layout .anticon {
  margin-right: 6px !important;
  font-size: 20px !important;
  vertical-align: -0.185em !important;
}
.logo .anticon {
  font-size: 40px !important;
}
</style>