import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'
import { cookieRef, useLayoutConfigStore } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'

// SECTION Store
export const useConfigStore = defineStore('config', () => {
  // 👉 Theme
  const userPreferredColorScheme = usePreferredColorScheme()
  const cookieColorScheme = cookieRef('color-scheme', 'light')

  // State
  const user = ref({ username: '' })
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = ref(!!localStorage.getItem('token'))
  const userRole = ref(localStorage.getItem('userRole') || '')

  // Initialize store from local storage
  const initializeStore = () => {
    const storedToken = localStorage.getItem('token')
    const storedUserRole = localStorage.getItem('userRole')

    token.value = storedToken || ''

    isAuthenticated.value = !!storedToken
    userRole.value = storedUserRole || ''
    user.value = {} // Ensure user is an empty object if not authenticated
  }

  // Set token and role
  const setToken = ({ token: newToken, role }) => {
    token.value = newToken
    isAuthenticated.value = true
    userRole.value = role
    localStorage.setItem('token', newToken)
    localStorage.setItem('userRole', role) // Save user role to localStorage
  }

  // Set user data
  const setUser = (userData) => {
    user.value = userData
  }

  // Remove token and role
  const removeToken = () => {
    token.value = ''
    isAuthenticated.value = false
    userRole.value = ''
    user.value = {} // Clear user data
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }

  // Login action
  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/v1/token/login/', credentials)
      const newToken = response.data.auth_token
      const newUserRole = response.data.userRole // Adjust if necessary

      setToken({ token: newToken, role: newUserRole })
      axios.defaults.headers.common['Authorization'] = `Token ${newToken}`

      const userResponse = await axios.get(`/api/v1/users/${credentials.username}`)
      
      setUser(userResponse.data)

      return userResponse.data
    } catch (error) {
      removeToken()
      throw error
    }
  }

  watch(userPreferredColorScheme, val => {
    if (val !== 'no-preference')
      cookieColorScheme.value = val
  }, { immediate: true })

  const theme = cookieRef('theme', themeConfig.app.theme)

  // 👉 isVerticalNavSemiDark
  const isVerticalNavSemiDark = cookieRef('isVerticalNavSemiDark', themeConfig.verticalNav.isVerticalNavSemiDark)

  // 👉 skin
  const skin = cookieRef('skin', themeConfig.app.skin)

  // ℹ️ We need to use `storeToRefs` to forward the state
  const { isLessThanOverlayNavBreakpoint, appContentWidth, navbarType, isNavbarBlurEnabled, appContentLayoutNav, isVerticalNavCollapsed, footerType, isAppRTL } = storeToRefs(useLayoutConfigStore())
  
  return {
    user,
    token,
    isAuthenticated,
    userRole,
    initializeStore,
    setToken,
    setUser,
    removeToken,
    login,
    theme,
    isVerticalNavSemiDark,
    skin,

    // @layouts exports
    isLessThanOverlayNavBreakpoint,
    appContentWidth,
    navbarType,
    isNavbarBlurEnabled,
    appContentLayoutNav,
    isVerticalNavCollapsed,
    footerType,
    isAppRTL,
  }
})
// !SECTION
// SECTION Init
export const initConfigStore = () => {
  const configStore = useConfigStore()
  const userPreferredColorScheme = usePreferredColorScheme()
  const vuetifyTheme = useTheme()

  watch([() => configStore.theme, userPreferredColorScheme], () => {
    vuetifyTheme.global.name.value = configStore.theme === 'system'
      ? userPreferredColorScheme.value === 'dark'
        ? 'dark'
        : 'light'
      : configStore.theme
  })

  onMounted(() => {
    configStore.initializeStore()
    if (configStore.theme === 'system') 
      vuetifyTheme.global.name.value = userPreferredColorScheme.value
  })

  return {
    user: configStore.user,
    token: configStore.token,
    isAuthenticated: configStore.isAuthenticated,
    userRole: configStore.userRole,
    initializeStore: configStore.initializeStore,
    setToken: configStore.setToken,
    setUser: configStore.setUser,
    removeToken: configStore.removeToken,
    login: configStore.login,
  }
}
// !SECTION