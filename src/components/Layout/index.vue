/** 
*@name: 系统导航栏 即一级菜单导航栏
* @param {type}
*/
<template>
  <div class='system-nav'>
    <a-layout-header class="header">
      <div class="logo">
        系统名称
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '55px' }"
        @click='selectNav'
      >
        <a-menu-item
          :key="nav.cnameKey"
          v-for='nav in menusJson'
        >{{nav.cname}}</a-menu-item>
      </a-menu>
      <div class="system-time">
        <date-time v-slot:default="slotProps">
          {{ slotProps.data.year }}年 {{ slotProps.data.month }}月
          {{ slotProps.data.day }}日&nbsp;&nbsp;&nbsp;
          {{ slotProps.data.week }}&nbsp;&nbsp;&nbsp;
          {{ slotProps.data.time }}
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
              theme="light"
              mode="inline"
              @click="infoChange"
              v-model:selectedKeys="current"
            >
              <a-menu-item key="setting">
                <UserOutlined />账户设置
              </a-menu-item>
              <a-sub-menu>
                <template #title>
                  <span class="submenu-title-wrapper">
                    <setting-outlined />
                    一键换肤
                  </span>
                </template>
                <a-menu-item-group>
                  <a-menu-item
                    v-for="item in themeButton"
                    :key="item.key"
                  >{{
                  item.name
                }}</a-menu-item>
                </a-menu-item-group>
              </a-sub-menu>
              <a-menu-item key="loginOut">
                <UserOutlined />退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <div class="system-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import menusJson from 'mock/menus/index.json'
import { defineComponent, reactive, ref, toRefs, watchEffect, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons-vue"
export default defineComponent({
  name: 'Layout',
  components: {
    UserOutlined,
    SettingOutlined,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      menusJson,//菜单mock
      selectedKeys: [route.matched[0].path],//选中菜单
      visible: false,
      current: [],
      themeButton: [
        {
          key: "default",
          name: "蓝色",
        },
        {
          key: "red",
          name: "红色",
        },
        {
          key: "green",
          name: "绿色",
        },
        {
          key: "deepBlue",
          name: "深蓝色",
        },
      ], //换肤类型
    })

    //监测路由变化获取选中菜单和存储二级菜单
    watchEffect(() => {
      state.selectedKeys = [route.matched[0].path]
      //存储二级菜单
      const menus = state.menusJson.filter(ele => {
        return ele.cnameKey === route.matched[0].path
      })
      //存储二级菜单c
      store.dispatch('common/user/doCurrentMenu', menus[0])
    })
    //点击一级菜单导航
    function selectNav({ item, key, keyPath }) {
      router.push(key)
      const menus = state.menusJson.filter(ele => {
        return ele.cnameKey === key
      })
      //存储二级菜单
      store.dispatch('common/user/doCurrentMenu', menus[0])
    }
    //当前主题
    const currentTheme = computed(() => {
      return store.getters["common/user/userTheme"]
    })
    onMounted(() => {
      const current = state.themeButton.filter((v) => v.key === currentTheme.value)
      state.current = [current.length > 0 ? current[0].key : ""]
    })
    // 换肤事件
    const infoChange = function (e) {
      if (e.key === "setting") {
      } else if (e.key === "loginOut") {
        localStorage.removeItem("token")
        router.push("/login")
      } else {
        state.current = [e.key]
        store.dispatch("common/user/doSetTheme", e.key)
      }
    }
    return {
      ...toRefs(state),
      selectNav,
      infoChange
    }
  }
})
</script>

<style scoped lang='scss'>
.system-nav {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  .ant-layout-header {
    height: 55px;
    line-height: 55px;
    display: flex;
    align-items: center;
    background: var(--header-top-bg-color);
    padding: 0;
    .ant-menu-item {
      letter-spacing: 2px;
      color: #fff;
    }
    .ant-menu-dark {
      background: var(--header-top-bg-color);
    }
    .logo {
      color: #fff;
      font-weight: bolder;
      font-size: 22px;
      // margin-right: 50px;
      width: 200px;
      text-align: center;
      // background: #001529;
    }
    .system-time {
      color: #fff;
      margin-left: auto;
      margin-right: 60px;
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
  .system-content {
    height: calc(100% - 55px);
  }
  .ant-menu-item-selected {
    font-weight: bold;
    letter-spacing: 2px;
  }
  .ant-dropdown-menu-item-selected {
    background: var(--primary-color);
    color: #fff;
  }
}
</style>