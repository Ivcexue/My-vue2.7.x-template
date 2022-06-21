const env = process.env

// verson
const version = env.VUE_APP_VERSION
// suffix
const hbexpert = env.VUE_APP_HB_EXPERT

const baseURL = env.VUE_APP_BASE_API


import HttpRequest from '@/services/request'

export default new HttpRequest(`${baseURL}${hbexpert}${version}`)
