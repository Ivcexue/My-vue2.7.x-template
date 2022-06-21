const env = process.env
// verson
const version = env.VUE_APP_VERSION
// suffix
const hbcenter = env.VUE_APP_HB_CENTER

const baseURL = env.VUE_APP_BASE_API

import HttpRequest from '@/services/request'
const centerServer = new HttpRequest(`${baseURL}${hbcenter}${version}`)

export default centerServer
