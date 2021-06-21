<template>
  <div class="login">
    <header>
      <h1>
        <a href="#"> Edu boss管理系统</a>
      </h1>
    </header>

    <el-form ref="form"
             label-position="top"
             :model="form"
             :rules="rules"
             :class="isShaking ? 'shaking' : ''"
             label-width="80px">
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   class="login-btn"
                   :loading="isLoginLoading"
                   @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user.ts'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            // pattern: /^1\d{10}$/,
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ]
      },
      isLoginLoading: false,
      isShaking: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isShaking = false
        // 1. 表单验证
        // this.$refs.form.validate()
        await (this.$refs.form as Form).validate()
        // 登录按钮显示 loading
        this.isLoginLoading = true
        // 2. 验证通过-提交表单
        const { data } = await login(this.form)
        // 3.处理请求结果
        //   失败：给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 1. 登录成功，记录登录状态，状态需要能够全局访问，vuex
          this.$store.commit('setUser', data.content)
          // 2. 访问需要登录的页面时，判断有没有登录状态 路由守卫
          //   成功：跳转到首页
          this.$router.push((this.$route.query.redirect as string) || '/')
          this.$message.success('登录成功')
        }
      } catch (err) {
        this.isShaking = true
        this.$message.error('登录失败' + err)
      }
      // 结束登录按钮 loading
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  width: 95%;
  max-width: 22rem;
  margin: 1rem auto;

  header {
    margin-bottom: 1rem;

    h1 {
      margin: 4.5rem 0 3.5rem;
      text-align: center;
      letter-spacing: 0.1em;

      a {
        margin: 0;
        color: rgba(0, 0, 0, 0.5);
        font-size: 3rem;
        font-weight: 300;
        text-decoration: none;
        transition: text-shadow 0.3s;

        &:hover {
          text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .el-form {
    margin-bottom: 2.5rem;
    padding: 1.875rem 1.25rem;
    background: #fff;

    h2 {
      margin: 0 0 1rem;
      font-weight: 400;
      font-size: 1.5rem;
    }

    .el-button {
      margin-top: 0.5rem;
      width: 100%;
    }

    &.shaking {
      animation: shakeX 1s;
    }
  }

  footer {
    margin-bottom: 1rem;
    padding: 0.625rem;
    border: 0.0625rem solid rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @keyframes shakeX {
    from,
    to {
      transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translate3d(10px, 0, 0);
    }
  }
}
</style>
