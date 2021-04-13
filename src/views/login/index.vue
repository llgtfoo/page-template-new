<template>
  <div class="login-wraper">
    <div class="login-form">
      <div class="login-logo">
        <svg-icons icon-class="logo"></svg-icons>
        <p class="logo-text">系统名称</p>
      </div>
      <div class="login-right-form">
        <a-row style="width: 100%">
          <a-col
            :span="4.5"
            :offset="3"
          >
            <div class="form-title">账号登录</div>
          </a-col>
        </a-row>

        <a-form
          labelAlign="left"
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item
            label="用户名"
            name="username"
          >
            <a-input
              v-model:value="formState.username"
              placeholder="请输入用户名"
              autocomplete="off"
            >
              <template #prefix>
                <UserOutlined style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            label="密码"
            name="password"
          >
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <LockOutlined style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="type">
            <a-checkbox
              :disabled="formState.username === ''"
              @change="onChnage"
              v-model:checked="formState.checked"
              style="color: #fff"
            >
              记住用户名
            </a-checkbox>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
            <a-button
              type="primary"
              size=" large"
              block
              @click="onSubmit"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent,reactive,ref,onMounted,watch } from "vue"
import { UserOutlined,LockOutlined } from "@ant-design/icons-vue"
import { useRoute,useRouter } from "vue-router"
const labelCol = { span: 6,offset: 3 }
const wrapperCol = { span: 18,offset: 3 }
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const route = useRoute()
onMounted(() => {
  if (localStorage.getItem("username")) {
    formState.checked = true
    formState.username = localStorage.getItem("username")
  }
})
const formRef = ref(null) //$refs获取组件实例
const formState = reactive({
  username: "lltfoo",
  password: "1111",
  checked: false,
})
watch(
  () => formState.username,
  (newValue) => {
    if (newValue === "") {
      formState.checked = false
    }
  },
)
//   // 用户名自定义规则
// eslint-disable-next-line no-unused-vars
const validateUsername = async (rule,value) => {
  if (value === "") {
    return Promise.reject("用户名不能为空")
  } else {
    return Promise.resolve()
  }
}
// 密码自定义规则
// eslint-disable-next-line no-unused-vars
const validatePassword = async (rule,value) => {
  if (value === "") {
    return Promise.reject("密码不能为空")
  } else {
    return Promise.resolve()
  }
}
//校验规则
const rules = {
  username: [{ validator: validateUsername,trigger: "change" }],
  password: [{ validator: validatePassword,trigger: "change" }],
}
//记住用户名操作
const onChnage = function (e) {
  if (e.target.checked && formState.username !== "") {
    localStorage.setItem("username",formState.username)
  } else {
    localStorage.removeItem("username")
  }
}
//登录
const onSubmit = function () {
  const root = formRef.value //$refs
  console.log(root,"root")
  root
    .validate()
    .then(() => {
      console.log("values",formState)
      localStorage.setItem("token","llgtfoo")
      router.push("/home")
    })
    .catch((error) => {
      console.log("error",error)
    })
}
</script>

<style lang="scss" scoped>
.login-wraper {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/login.png") no-repeat;
  .login-form {
    display: flex;
    width: 740px;
    height: 460px;
    box-shadow: 0 2px 9px 0 #0b1e3f;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login-logo {
      width: 280px;
      height: 460px;
      background: #132e54;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .logo-text {
        font-size: 20px;
        font-weight: 400;
        color: #8bafd3;
        margin: 0 auto;
        margin-top: 40px;
        white-space: nowrap;
      }
      .svg-icon {
        width: 10em;
        height: 10em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
    .login-right-form {
      width: 460px;
      background-color: #102a4e;
      height: 460px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .form-title {
        color: #fff;
        font-size: 20px;
        font-weight: bolder;
        align-self: start;
        box-sizing: border-box;
        border-bottom: 3px solid #fff;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

<style lang="scss">
.login-wraper {
  .ant-form {
    width: 100%;
  }
  .ant-form-item-label label,
  .ant-form-item-children span {
    color: #fff;
  }
  .ant-input {
    background: transparent !important;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 20px;
    height: 30px !important;
    color: #fff;
    font-size: 16px;
  }
  .ant-input-affix-wrapper {
    background: transparent !important;
  }
}
</style>
