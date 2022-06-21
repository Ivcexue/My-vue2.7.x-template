const env = process.env
// verson
const version = env.VUE_APP_VERSION
// suffix
const hbproject = env.VUE_APP_HB_PROJECT

// const baseURL = env.VUE_APP_BASE_API
const baseURL = env.VUE_APP_JIN_SHENG

import HttpRequest from '@/services/request'

export default new HttpRequest(`${baseURL}${hbproject}${version}`)
