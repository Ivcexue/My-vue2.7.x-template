import defaultSettings from '@/settings'

const title = defaultSettings.title || '财务管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
