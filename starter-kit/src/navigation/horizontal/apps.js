export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'ri-home-smile-2-line' },
  },
  
  {
    title: 'Apps',
    icon: { icon: 'ri-mail-open-line' },
    children: [
      {
        title: 'User',
        icon: { icon: 'ri-user-line' },
        children: [
          { title: 'List', to: 'apps-user-list' },
          { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
        ],
      },
    ],
  },
]
