import { defineStore } from 'pinia'
// ts类型提示
interface Token {
    token: string
    refresh_token: string 
}

export const useTokenStore = defineStore('useToken',() => {
    // //ref 相当于state
    const tokenJson = ref('')
    const getToken = computed<Token>(() => {
        try {
            return JSON.parse(tokenJson.value || window.localStorage.getItem('TokenInfo') || '{}')
        } catch (err) {
            ElMessage.error('Json字符串格式化错误,转化对象失败!')
            window.localStorage.setItem('TokenInfo','')
            throw err
        }
    })
    //funtion 相当于actions
    function saveToken(data: string) {
        tokenJson.value = data
        window.localStorage.setItem('TokenInfo',data)
    }
    function removeToken() {
        window.localStorage.setItem('TokenInfo','')
    }
    // 导出
    return { getToken, saveToken, removeToken }
})
