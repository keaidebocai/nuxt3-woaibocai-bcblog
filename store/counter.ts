import { defineStore } from 'pinia'
interface CounterState {
    times: number
    name: string
}
export const userCounter = defineStore('counter',{
    state: (): CounterState => ({
        times: 5,
        name: 'nmsl'
    }),
    actions: {
        increment(){
            this.times ++
            this.name = 'nmm,nmsl'
        }
    },
    persist: process.client && {
        storage: localStorage,
        path: ['times']
    }
})