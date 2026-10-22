import { ref } from 'vue'

const hasYtConsent = ref(false)
// serve as one time check in local storage, after that only check the ref value
let isInitialized = false

export function useYtConsent() {
  if (!isInitialized && typeof window !== 'undefined') {
    hasYtConsent.value = localStorage.getItem('yt_consent') === 'true'
    isInitialized = true
  }

  function acceptYtConsent() {
    localStorage.setItem('yt_consent', 'true')
    hasYtConsent.value = true
  }

  function revokeYtConsent() {
    localStorage.removeItem('yt_consent')
    hasYtConsent.value = false
  }

  return {
    hasYtConsent,
    acceptYtConsent,
    revokeYtConsent,
  }
}
