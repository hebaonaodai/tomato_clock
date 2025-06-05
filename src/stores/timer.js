import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {  // 确认导出名称和参数正确
  state: () => ({
    timeLeft: 25 * 60, // 25分钟，以秒为单位
    isRunning: false,
    isPaused: false,
    workDuration: 25, // 默认工作时长（分钟）
    breakDuration: 5, // 默认休息时长（分钟）
    isWorkTime: true, // 是否是工作时间
  }),

  actions: {
    startTimer() {
      this.isRunning = true
      this.isPaused = false
    },

    pauseTimer() {
      this.isRunning = false
      this.isPaused = true
    },

    resetTimer() {
      this.timeLeft = this.isWorkTime ? this.workDuration * 60 : this.breakDuration * 60
      this.isRunning = false
      this.isPaused = false
    },

    // 确保updateTimeLeft方法正确修改响应式状态（已确认代码正确）
    updateTimeLeft(seconds) {
      this.timeLeft = seconds  // 直接修改Pinia的state（响应式）
    },

    toggleMode() {
      this.isWorkTime = !this.isWorkTime
      this.timeLeft = this.isWorkTime ? this.workDuration * 60 : this.breakDuration * 60
    },

    updateWorkDuration(minutes) {
      this.workDuration = minutes
      if (this.isWorkTime) {
        this.timeLeft = minutes * 60
      }
    },

    updateBreakDuration(minutes) {
      this.breakDuration = minutes
      if (!this.isWorkTime) {
        this.timeLeft = minutes * 60
      }
    }
  }
})