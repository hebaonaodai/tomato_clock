<template>
  <div class="settings">
    <van-nav-bar
      title="设置"
      left-text="返回"
      @click-left="goBack"
    />
    
    <div class="settings-container">
      <van-cell-group inset>
        <van-cell title="工作时长" :value="`${timerStore.workDuration} 分钟`">
          <template #right-icon>
            <van-stepper
              v-model="timerStore.workDuration"
              :min="1"
              :max="60"
              @change="updateWorkDuration"
            />
          </template>
        </van-cell>
        
        <van-cell title="休息时长" :value="`${timerStore.breakDuration} 分钟`">
          <template #right-icon>
            <van-stepper
              v-model="timerStore.breakDuration"
              :min="1"
              :max="30"
              @change="updateBreakDuration"
            />
          </template>
        </van-cell>
      </van-cell-group>
      
      <div class="about-section">
        <h3>关于番茄时钟</h3>
        <p>番茄工作法是一种时间管理方法，使用一个定时器来分割工作和休息时间。</p>
        <p>传统的工作/休息时间比例为 25:5 分钟。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTimerStore } from '../stores/timer'

const router = useRouter()
const timerStore = useTimerStore()

const goBack = () => {
  router.back()
}

const updateWorkDuration = (value) => {
  timerStore.updateWorkDuration(value)
}

const updateBreakDuration = (value) => {
  timerStore.updateBreakDuration(value)
}
</script>

<style scoped>
.settings {
  height: 100vh;
  background-color: #f7f8fa;
}

.settings-container {
  padding: 20px;
}

.about-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.about-section h3 {
  margin: 0 0 10px 0;
  color: #323233;
}

.about-section p {
  margin: 5px 0;
  color: #646566;
  font-size: 14px;
  line-height: 1.5;
}
</style> 