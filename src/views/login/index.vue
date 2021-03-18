<template>
  <div class="login-wraper">
    <div class="login-form">
      <div class="login-logo">
        <svg-icons icon-class="logo"></svg-icons>
        <p class="logo-text">系统名称</p>
      </div>
      <div class="login-right-form">
        <a-form
          labelAlign="left"
          ref="formRef"
          :model="formState"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="用户名">
            <a-input v-model:value="formState.username" placeholder="Username">
              <template #prefix>
                <UserOutlined style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item ref="password" label="密码" name="password">
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="Password"
            >
              <template #prefix>
                <LockOutlined style="color: #fff" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 18, offset: 3 }"
            :style="{ 'margin-top': '30px' }"
          >
            <a-button type="primary" size="large" block> 登录 </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
@Options({
  components: {
    UserOutlined,
    LockOutlined,
  },
})
export default class Login extends Vue {
  formState = {
    username: 'llgtfoo',
    password: '',
  };
  rules = {};
  labelCol = { span: 6, offset: 3 };
  wrapperCol = { span: 18, offset: 3 };
}
</script>

<style lang="scss">
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
    }
  }
  .ant-form {
    width: 100%;
  }
  .ant-form-item-label label {
    color: #fff;
  }
  .ant-input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 12px 5px 12px 20px;
    height: 30px;
    color: #fff;
    font-size: 16px;
  }
  .ant-input-affix-wrapper {
    background: transparent;
  }
}
</style>
