<template>
  <div class="mainLayout">
    <header>
      <slot name="header">
        <div class="titleRow">
          <h3>蓝莓记账</h3>
        </div>
      </slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer v-if="props.showTabbar">
      <van-tabbar v-model="active" route>
        <van-tabbar-item name="bill" to="/home/billPage">
          <span>账单</span>
          <template #icon="props">
            <nuxt-icon name="layout/bill" filled/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="edit" to="/home/editPage">
          <span>记账</span>
          <template #icon="props">
            <nuxt-icon name="layout/edit" filled/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="chart" to="/home/chartPage">
          <span>图表</span>
          <template #icon="props">
            <nuxt-icon name="layout/chart" filled/>
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="user" to="/home/userPage">
          <span>用户</span>
          <template #icon="props">
            <nuxt-icon name="layout/user" filled/>
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const active = ref('bill')
const props = defineProps({
  showTabbar: {
    type: Boolean,
    default: true
  }
})
// const showSidebar = ref<boolean>(false)
// const handleMenu=()=>{
//   console.log('menu')
//   showSidebar.value = true
// }
</script>

<style scoped lang="scss">
.mainLayout {
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    height: 88px;
    padding: 40px 16px 12px;
    background-image: linear-gradient(to bottom, var(--welcome-bg-start) 0%, var(--welcome-bg-end) 100%);
    .titleRow {
      display: flex;
      align-items: center;
      font-size: 20px;
      column-gap: 8px;
      color: #fff;
      h3 {
        width: 100%;
        text-align: center;
      }
    }
  }
  main {
    height: 100px;
    flex: 1;
  }
  footer {
    height: 50px;
  }
  .sidebar {
    width: 80vw;
    height: 100vh;
    background: #fff;
  }
}
</style>
