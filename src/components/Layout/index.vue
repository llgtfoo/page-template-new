/**
*@name: 系统导航栏 即一级菜单导航栏
* @param {type}
*/
<template>
  <div class="system-nav">
    <a-layout-header class="header">
      <div class="logo">
        系统名称
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        :style="{ lineHeight: '55px' }"
        @click="selectNav"
      >
        <a-menu-item
          :key="nav.cnameKey"
          v-for="nav in menusJson"
        >
          {{nav.cname}}
        </a-menu-item>
      </a-menu>
      <div class="system-time">
        <date-time v-slot:default="slotProps">
          {{slotProps.data.year}}年 {{slotProps.data.month}}月
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
          <a-avatar class="messages">
            <template #icon>
              {{userInfo.name}}
              <CaretDownFilled />
            </template>
          </a-avatar>
          <template #overlay>
            <a-menu
              theme="light"
              mode="inline"
              @click="infoChange"
              v-model:selectedKeys="current"
              style="width: 150px"
            >
              <a-menu-item>
                <setting-outlined />
                一键换肤
              </a-menu-item>
              <ul :style="{display:'flex','justify-content':'space-around'}">
                <li
                  v-for="item in themeButton"
                  :key="item.key"
                  @click="handleTheme(item.key)"
                  :style="{
                      background:item.color,
                      width:'20px',
                      height:'20px',
                      display:'flex',
                      'justify-content':'center',
                      'align-items': 'center',
                      color: '#fff'}"
                >
                  <CheckOutlined v-if="current[0]===item.key" />
                </li>
              </ul>
              <a-menu-item key="setting">
                <UserOutlined />账户设置
              </a-menu-item>
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
  UserOutlined, CaretDownFilled, CheckOutlined,
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Layout',
  components: {
    UserOutlined,
    SettingOutlined,
    CaretDownFilled,
    CheckOutlined,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      menusJson, //菜单mock
      selectedKeys: [route.matched[0].path], //选中菜单
      visible: false,
      current: [],
      themeButton: [
        {
          key: 'default',
          name: '蓝色',
          color: '#1890ff',
        },
        {
          key: 'red',
          name: '红色',
          color: '#bf291b',
        },
        {
          key: 'green',
          name: '绿色',
          color: 'green',
        },
        {
          key: 'deepBlue',
          name: '深蓝色',
          color: '#003580',
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
      return store.getters['common/user/userTheme']
    })
    //获取用户信息
    const userInfo = computed(() => {
      return store.getters['common/user/userInfo']
    })
    onMounted(() => {
      const current = state.themeButton.filter((v) => v.key === currentTheme.value)
      state.current = [current.length > 0 ? current[0].key : '']
      console.log(state.current)
    })
    // 用户菜单设置
    const infoChange = function (e) {
      if (e.key === 'setting') {
      } else if (e.key === 'loginOut') {
        localStorage.removeItem('token')
        router.push('/login')
      } else {
        return
      }
    }
    //换肤设置
    const handleTheme = (value) => {
      state.current = [value]
      store.dispatch('common/user/doSetTheme', value)
    }
    return {
      ...toRefs(state),
      selectNav,
      infoChange,
      userInfo,
      handleTheme,
    }
  },
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
      letter-spacing: 3px;
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
      position: relative;
      .messages {
        // width: 60px;
        letter-spacing: 3px;
        width: max-content;
        padding: 0 20px 0 10px;
        box-sizing: border-box;
        border-radius: 1px;
        background: rgba(130, 173, 236, 0.2);
        position: relative;
        /deep/.anticon-caret-down {
          position: absolute;
          right: 1px;
          top: 8px;
          opacity: 0.5;
        }
      }
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