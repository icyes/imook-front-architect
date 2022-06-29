<template>
<div class="login-page">
  <a-row>
    <a-col :span="12" class="aside">
      <div class="aside-inner">
        <router-link to="/">
          <img alt="慕课乐高" src="../assets/logo2.png" class="logo-img">
        </router-link>
        <h2>这是我用过的最好的建站工具</h2>
        <span class="text-white-70">王铁锤, Google</span>
      </div>
    </a-col>
    <a-col :span="12" class="login-area">
      <a-form layout="vertical" :model="form" :rules="rules" ref="loginForm">
        <h2>欢迎回来</h2>
        <p class="subTitle">使用手机号码和验证码登录到慕课乐高</p>
        <a-form-item label="手机号码" required name="cellphone">
          <a-input placeholder="手机号码" v-model:value="form.cellphone">
            <template v-slot:prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
          </a-input>
        </a-form-item>
        <a-form-item label="验证码" required name="verifyCode">
          <a-input placeholder="四位验证码" v-model:value="form.verifyCode">
            <template v-slot:prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" @click="login" :loading="isLoginLoading">
            登录
          </a-button>
          <a-button size="large"
            :style="{ marginLeft: '20px' }"
            :disabled="codeButtonDisable"
            @click="getCode"
          >
            {{ counter === 60 ? '获取验证码' : `${counter}秒后重发` }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, Ref, computed, watch } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm } from '@ant-design-vue/use'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { Rule } from 'ant-design-vue/es/form/interface'
import { GlobalDataProps } from '../store/index'
interface RuleFormInstance {
  validate: () => Promise<any>;
}
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const isLoginLoading = computed(() => store.getters.isOpLoading('login'))
    const router = useRouter()
    const counter = ref(60)
    let timer = 0
    const loginForm = ref() as Ref<RuleFormInstance>
    const form = reactive({
      cellphone: '',
      verifyCode: ''
    })
    const codeButtonDisable = computed(() => {
      return !/^1[3-9]\d{9}$/.test(form.cellphone.trim()) || (counter.value < 60)
    })
    const startCounter = () => {
      counter.value--
      timer = window.setInterval(() => {
        counter.value--
      }, 1000)
    }
    watch(counter, (newValue) => {
      if (newValue === 0) {
        clearInterval(timer)
        counter.value = 60
      }
    })
    const cellnumberValidator = (rule: Rule, value: string) => {
      return new Promise((resolve, reject) => {
        const passed =  /^1[3-9]\d{9}$/.test(value.trim())
        setTimeout(() => {
          if (passed) {
            resolve('')
          } else {
            reject('手机号码格式不正确')
          }
        }, 500)
      })
    }
    const rules = reactive({
      cellphone: [
        { required: true, message: '手机号码不能为空', trigger: 'blur' },
        // { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        { asyncValidator: cellnumberValidator, trigger: 'blur' }
      ],
      verifyCode: [
        { required: true, message: '验证码不能为空', trigger: 'blur' }
      ]
    })

    const { validate, resetFields } = useForm(form, rules)
    const login = () => {
      validate().then(() => {
        const payload = {
          phoneNumber: form.cellphone,
          veriCode: form.verifyCode
        }
        store.dispatch('loginAndFetch', { data: payload }).then(() => {
          message.success('登录成功 2秒后跳转首页')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
      })
    }
    const getCode = () => {
      axios.post('/users/genVeriCode', { phoneNumber: form.cellphone}).then(() => {
        message.success('验证码已发送，请注意查收', 5)
        startCounter()
      })
    }
    return {
      form,
      rules,
      loginForm,
      login,
      codeButtonDisable,
      getCode,
      counter,
      isLoginLoading
    }
  }
})
</script>
<style>
.logo-area {
  position: absolute;
  top: 30px;
  width: 150px;
}
.aside {
  height: 100vh;
  background-color: #1a1919;
  background-size: cover;
  background-repeat: no-repeat;
}
.aside .logo-img {
  width: 200px;
  margin-bottom: 20px;
}
.aside h2 {
  color: #CCCCCC;
  font-size: 29px;
}
.aside-inner {
  width: 60%;
  text-align: center;
}
.login-area {
  height: 100vh;
}
.login-area .ant-form {
  width: 350px;
}
.text-white-70 {
  color: #999;
  display: block;
  font-size: 19px;
}
.aside, .login-area {
  display: flex !important;
  align-items: center;
  justify-content: center;
}
.login-area h2 {
  color: #333333;
  font-size: 29px;
}
.login-area .subTitle {
  color: #666666;
  font-size: 19px;
}
.login-area .ant-form-item-label {
  display: none;
}
.login-area .ant-input-prefix {
  left: auto;
  right: 30px;
  font-size: 19px;
}
.login-area .ant-input {
  font-size: 17px;
  padding: 20px 45px 20px 30px;
}
</style>
