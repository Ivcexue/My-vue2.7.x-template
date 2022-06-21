/**
 * @description 仿go实现err处理
 * @Author SY
 * @param {promise} promise
 * @returns {[error, data]}
 */
export const awaitTo = (promise) => {
  return promise
    .then((data) => [null, data]) // 成功,返回[null,响应结果]
    .catch((err) => {
      return [err, undefined] // 失败,返回[错误信息,undefined]
    })
}

/**
 * @description 某key是否存在于obj
 * @Author SY
 * @param {object} obj
 * @param {string} key
 * @returns {boolean}
 */
export const hasProp = (obj, key) => Object.hasOwnProperty.call(obj, key)

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 日期格式化
 * @param {Date} time 
 * @returns 
 */
export const formatDate = (time) => {
  let date = new Date(time);

  let YY = date.getFullYear();
  let MM = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  // 这里修改返回时间的格式
  return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {file} rawFile
 * @param {string} fileName
 */
export function downloadRawFile(rawFile, fileName) {
  if (window.navigator.msSaveBlob) {
    try {
      const blobObject = new Blob([rawFile])
      window.navigator.msSaveBlob(blobObject, fileName)
    } catch (e) {
      console.log(e)
    }
  } else {
    const blob = new Blob([rawFile])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = decodeURI(fileName)
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
