/** 
*@name: 系统导航栏 
* @param {type}
*/
<template>
  <a-layout-header class="layout-header-nav">
    <menu-unfold-outlined
      v-if="collapsed"
      :style="{ color: '#fff', fontSize: '25px' }"
      class="trigger"
      @click="$emit('update:collapsed', !collapsed)"
    />
    <menu-fold-outlined
      v-else
      class="trigger"
      :style="{ color: '#fff', fontSize: '25px' }"
      @click="$emit('update:collapsed', !collapsed)"
    />
    <div class="system-name">
      {{ systemName }}
    </div>
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
            <a-menu-item key="loginOut">
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
                <a-menu-item
                  v-for="item in themeButton"
                  :key="item.key"
                >{{
                  item.name
                }}</a-menu-item>
              </a-menu-item-group>
            </a-sub-menu>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  getCurrentInstance,
  watch
} from "vue"
import { useRouter } from "vue-router"
import {
  SettingOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue"
export default defineComponent({
  name: 'SystemNav',
  props: {
    collapsed: {
      type: Boolean,
    },
    systemName: {
      type: String,
    },
  },
  components: {
    MenuFoldOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
  },
  setup(props) {
    const _this = getCurrentInstance().proxy
    const router = useRouter()
    const state = reactive({
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
    //当前主题
    const currentTheme = computed(() => {
      return _this.$store.getters["common/user/userTheme"]
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
        _this.$store.dispatch("common/user/doSetTheme",e.key)
      }
    }

    return {
      ...toRefs(state),
      infoChange,
      currentTheme,
    }
  },
})
</script>


<style lang='scss' scoped>
.ant-layout-header {
  align-items: center;
  height: 50px;
  display: flex;
  padding: 0px;
  min-width: 800px;
  line-height: 64px;
  background: var(--header-top-bg-color);
  padding-left: 10px;
  .system-name {
    color: rgb(255, 255, 255);
    font-size: 20px;
    margin-left: 30px;
    height: 35px;
    line-height: 35px;
    padding: 0 20px;
    border-radius: 3px;
    letter-spacing: 5px;
    text-align: center;
    background: var(--primary-color);
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
.ant-dropdown-menu-item-selected {
  background: var(--primary-color);
  color: #fff;
}
</style>
