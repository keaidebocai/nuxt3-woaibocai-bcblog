import { useRuntimeConfig } from 'nuxt/app'
import httpRequest from '~/server/index'

const BASE_URL = useRuntimeConfig().public.BASE_URL
const URL = BASE_URL + '/admin/api/manager/'

export const GetUserInfo = () => {
    return httpRequest.get(true, URL + 'userInfo')
} 