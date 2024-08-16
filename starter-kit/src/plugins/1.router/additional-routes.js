
// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // TODO: Get type from backend
      const userData = useCookie('userData')
      const userRole = userData.value?.role
      if (userRole === 'admin')
        return { name: 'root' }
      if (userRole === 'store owner')
        return { name: 'access-control' }
      
      return { name: 'login', query: to.query }
    },
  },
  // {
  //   path: '/pages/user-profile',
  //   name: 'pages-user-profile',
  //   redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  // },
 
]
export const routes = [
  // Email filter
  // {
  //   path: '/apps/email/filter/:filter',
  //   name: 'apps-email-filter',
  //   component: emailRouteComponent,
  //   meta: {
  //     navActiveLink: 'apps-email',
  //     layoutWrapperClasses: 'layout-content-height-fixed',
  //   },
  // },

  // Email label
  // {
  //   path: '/apps/email/label/:label',
  //   name: 'apps-email-label',
  //   component: emailRouteComponent,
  //   meta: {
  //     // contentClass: 'email-application',
  //     navActiveLink: 'apps-email',
  //     layoutWrapperClasses: 'layout-content-height-fixed',
  //   },
  // },
]
