<template>
  <div class="login">
    <MainLayout :showTabbar="false">
      <template #header>
        <div class="operateTitle">
          <!-- <IconLayoutLeft /> -->
          <nuxt-icon name="user/left" filled @click="handleRouteBack"/>
          <h3>登录</h3>
        </div>
      </template>
      <section class="logoSec">
        <nuxt-icon name="user/mangosteen" filled/>
        <h3>蓝莓记账</h3>
      </section>
      <section class="loginForm">
        <van-form @submit="onSubmit" @failed="onFailed" ref="refForm">
          <van-field
            v-model="formData.email"
            name="email"
            label="邮箱地址"
            placeholder="邮箱地址"
            :rules="[
              { required: true, message: '请填写邮箱地址' },
              { pattern: /.+@.+/, message: '请填写正确的邮箱地址' }
            ]"
          />
          <van-field
            v-model="formData.code"
            name="code"
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #button>
              <van-button class="validCodeBtn" :disabled="validCodeBtnState"
                size="small" color="#5c33be" @click="getValidateCode">
                {{ validCodeBtnState ? `${count}秒后可重新发送` : '发送验证码' }}
              </van-button>
            </template>
          </van-field>
          <div class="submitBtnRow">
            <van-button block native-type="submit" color="#5c33be"> 登录 </van-button>
          </div>
        </van-form>
      </section>
    </MainLayout>
  </div>
</template>
<script lang="ts" setup name="Login">
import MainLayout from '~/layouts/mainLayout.vue'
definePageMeta({
  layout: 'main-layout',
})
// // import { ref, reactive } from 'vue'
// // import MainLayout from '@/layouts/MainLayout.vue'
// import { http } from '@/shared/Http'
import { FormInstance } from 'vant'
// // import { useRoute, useRouter } from 'vue-router'
// import {useBool} from '@/hooks/useBool'

// import { useMeStore } from '@/store/useMeStore'
const formData = reactive({
  email: '',
  code: ''
})
const refForm = ref<FormInstance>()
const router = useRouter()
const route = useRoute()
// const meStore = useMeStore()
const {ref: validCodeBtnState,on: validCodeBtnDisabled, off: validCodeBtnUse} = useBool(false)
const onSubmit = () => {
  // http
  //   .post<{ jwt: string }>('/session', formData, { _autoLoading: true })
  //   .then((res) => {
  //     localStorage.setItem('jwt', res.data.jwt)
  //     meStore.refreshMe()
  //     const returnTo = route.query.return_to?.toString()
  //     router.push(returnTo || '/')
  //   })
  //   .catch((err) => {
  //     throw err
  //   })
}
const onFailed = () => {
  console.log('Login failed!')
}
const count = ref<number>(5)
const startCountDown = () => {
  validCodeBtnDisabled()
  const timer = setInterval(() => {
    if (count.value <= 0) {
      clearInterval(timer)
      validCodeBtnUse()
      count.value = 5
    } else {
      count.value--
    }
  }, 1000)
}
const getValidateCode = () => {
  console.log($fetch,'ssss🦈')
  startCountDown()
  refForm
    .value!.validate('email')
    .then((_) => {
      http.post('/api/validation_codes', { email: formData.email }, { _autoLoading: true })
    })
    .catch((err) => {
      validCodeBtnUse()
      throw err
    })
}
const handleRouteBack = () => {
  console.log('back')
  // router.back()
}
</script>
<style scoped lang="scss">
.login {
  .logoSec {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 42px;
    gap: 12px;
    :deep(.nuxt-icon) svg {
      height: 68px;
      width: 64px;
    }
    h3 {
      font-size: 32px;
      font-weight: bold;
      color: var(--app-name-color);
    }
  }
  .loginForm {
    padding-top: 32px;
    .validCodeBtn{
      width: 10em
    }
    .submitBtnRow {
      margin: 48px 16px 0 16px;
    }
  }
}
</style>
