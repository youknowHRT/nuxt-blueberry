<template>
  <div class="welcomePage">
    <header>
      <nuxt-icon name="user/mangosteen" filled/>
      <h1>蓝莓记账</h1>
    </header>
    <main ref="main">
      <Transition name="slide-fade">
        <section v-if="refMode === 1">
          <nuxt-icon name="user/pig" filled/>
          <h2>会挣钱<br />还要会省钱</h2>
        </section>
        <section v-else-if="refMode === 2">
          <nuxt-icon name="user/clock" filled/>
          <h2>每日提醒<br />不遗漏每一笔账单</h2>
        </section>
        <section v-else-if="refMode === 3">
          <nuxt-icon name="user/chart" filled/>
          <h2>数据可视化<br />收支一目了然</h2>
        </section>
        <section v-else>
          <!-- <IconSvgCloud /> -->
          <nuxt-icon name="user/cloud" filled/>
          <h2>云备份<br />再也不怕数据丢失</h2>
        </section>
      </Transition>
    </main>
    <footer :class="{ finish: refMode === 4 }">
      <span v-show="refMode !== 4" class="fake">fake</span>
      <span @click="handNext">{{ refMode === 4 ? '完成' : '下一页' }}</span>
      <span v-show="refMode !== 4" @click="handleSkipAd">跳过</span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
// definePageMeta({
//   pageTransition: {
//     name: 'slide-fade'
//   }
// })
const refMode = ref<number>(1)
const handNext = throttle(() => {
  if (refMode.value === 4) {
    // 路由跳转
  } else {
    refMode.value++
  }
}, 500)
const main = ref<HTMLElement | undefined>(undefined)
const { swiping, direction } = useSwipe(main)
watchEffect(() => {
  if (swiping.value && direction.value === 'left') {
    handNext([])
  }
})
const router = useRouter()
const handleSkipAd = () => {
  localStorage.setItem('skipAd', 'yes')
  router.push('/home')
}
</script>
<style scoped lang="scss">
.welcomePage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to bottom, var(--welcome-bg-start) 0%, var(--welcome-bg-end) 100%);
  header {
    padding-top: 66px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #d4d4ee;
    :deep(.nuxt-icon) svg {
      width: 64px;
      height: 69px;
    }
  }
  main {
    flex: 1;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 16px 8px;
    position: relative;
    section {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 8px;
      h2 {
        text-align: center;
        margin-top: 40px;
      }
    }
    :deep(.nuxt-icon) svg {
      width: 150px;
      height: 150px;
    }
  }
  footer {
    height: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 16px;
    font-size: 24px;
    .fake {
      visibility: hidden;
    }
    &.finish {
      justify-content: center;
    }
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-out;
}
.slide-fade-enter-from {
  transform: translateX(100vw);
}
.slide-fade-leave-to {
  transform: translateX(-100vw);
}
</style>
