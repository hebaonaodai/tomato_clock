<template>
  <div class="bg">
    <div class="header">
      <h1>番茄时钟</h1>
      <p class="subtitle">专注25分钟，提高工作效率</p>
    </div>
    <div class="center-card">
      <div class="circle-progress">
        <!-- current-rate uses rounded progress value -->
        <!-- speed set to 100ms for smooth animation -->
        <van-circle
          :key="progress"
          :current-rate="Math.round(progress)"
          :rate="100"
          :speed="100"
          :size="300"
          :stroke-width="24"
          :stroke-linecap="round"
          :color="'#ff0000'"  
          layer-color="#f2f2f2"
        >
          <template #default>
            <div class="circle-center">
              <div class="main-time">{{ formatTime(timerStore.timeLeft) }}</div>
              <div class="status">{{ timerStore.isRunning ? (timerStore.isWorkTime ? '专注中' : '休息中') : '准备开始' }}</div>
            </div>
          </template>
        </van-circle>
      </div>
      <div class="btn-group">
        <button class="btn start" v-if="!timerStore.isRunning" @click="startTimer">
          <span class="icon">▶</span> 开始
        </button>
        <button class="btn pause" v-else @click="pauseTimer">
          <span class="icon">⏸</span> 暂停
        </button>
        <button class="btn reset" @click="resetTimer">
          <span class="icon">🔄</span> 重置
        </button>
      </div>
      <div class="settings-area">
        <h3>设置</h3>
        <div class="settings-row">
          <label>专注时间（分钟）</label>
          <input type="number" min="1" max="60" v-model.number="workDurationInput" @change="updateWorkDuration" />
          <label>提示音</label>
          <select v-model="selectedSound">
            <option value="none">无</option>
            <option value="mixkit-interface-hint-notification-911.wav">铃铛</option>
          </select>
        </div>
      </div>
    </div>
    <div class="footer">专注工作，高效生活 © 2025</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useTimerStore } from '../stores/timer'

const timerStore = useTimerStore()
let timer = null
const selectedSound = ref('mixkit-interface-hint-notification-911.wav')
const workDurationInput = ref(timerStore.workDuration)

const progress = computed(() => {
  const total = timerStore.isWorkTime ? 
    timerStore.workDuration * 60 : 
    timerStore.breakDuration * 60
  if (total <= 0 || timerStore.timeLeft <= 0) return 0
  const progressValue = ((total - timerStore.timeLeft) / total) * 100
  return Math.min(100, Math.max(0, progressValue)) // 确保在0-100范围内
})

const startTimer = () => {
  timerStore.startTimer()
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    console.log('当前剩余时间:', timerStore.timeLeft, '进度值:', progress.value) // 新增调试日志
    if (timerStore.timeLeft > 0) {
      timerStore.updateTimeLeft(timerStore.timeLeft - 1)
    } else {
      clearInterval(timer)
      playAlarm()
      timerStore.toggleMode()
      timerStore.resetTimer()
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

const pauseTimer = () => {
  timerStore.pauseTimer()
  clearInterval(timer)
}

const resetTimer = () => {
  clearInterval(timer)
  timerStore.resetTimer()
}

const playAlarm = () => {
  if (selectedSound.value !== 'none') {
    const audio = new Audio(`/sounds/${selectedSound.value}`)
    audio.play().catch(e => console.error("播放音频失败:", e));
  }
}

const updateWorkDuration = () => {
  timerStore.updateWorkDuration(workDurationInput.value)
  timerStore.resetTimer()
}

onMounted(() => {
  timerStore.resetTimer()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

watch(() => timerStore.workDuration, (val) => {
  workDurationInput.value = val
})
</script>

<style scoped>
.bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fbf7 0%, #f6f8f9 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  margin-top: 40px;
  text-align: center;
}
.header h1 {
  color: #ff6b6b;
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 8px;
}
.subtitle {
  color: #888;
  font-size: 18px;
  margin-bottom: 32px;
}
.center-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  padding: 40px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
  margin-bottom: 32px;
}
.circle-progress {
  width: 300px !important;
  height: 300px !important;
  margin-bottom: 40px !important;  
}
.circle-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.main-time {
  font-size: 56px;
  font-weight: 700;
  color: #222;
  line-height: 1;
}
.status {
  font-size: 20px;
  color: #888;
  margin-top: 8px;
}
.btn-group {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  margin-top: 20px;  
  margin-bottom: 40px !important; 
}
.btn {
  border: none;
  outline: none;
  border-radius: 24px;
  padding: 10px 28px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn.start {
  background: #ff6b6b;
  color: #fff;
}
.btn.pause {
  background: #ffd86b;
  color: #222;
}
.btn.reset {
  background: #f2f2f2;
  color: #222;
}
.btn:active {
  opacity: 0.8;
}
.settings-area {
  width: 100%;
  margin-top: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 16px 12px 8px 12px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.settings-area h3 {
  font-size: 18px;
  color: #222;
  margin-bottom: 10px;
}
.settings-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.settings-row label {
  font-size: 15px;
  color: #666;
}
.settings-row input[type="number"] {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 16px;
  margin-right: 8px;
}
.settings-row select {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #eee;
  font-size: 16px;
}
.footer {
  margin-top: 24px;
  color: #888;
  font-size: 15px;
  text-align: center;
  margin-bottom: 16px;
}
@media (max-width: 500px) {
  .center-card {
    min-width: unset;
    width: 96vw;
    padding: 24px 4vw 16px 4vw;
  }
  .header h1 {
    font-size: 32px;
  }
  .main-time {
    font-size: 32px;
  }
}
</style>

const gradientColor = {
  '0%': '#ff6b6b',
  '100%': '#ff8e8e'
}