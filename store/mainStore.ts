import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      someState: '你好 pinia',
      num: 5
    }
  },
  actions: {
    saveToken(mynum: string) {
        localStorage.setItem('num',mynum)
    }
  },
  persist: {
    // 下面的二选一
      storage: persistedState.localStorage,// localStorage
    }
})