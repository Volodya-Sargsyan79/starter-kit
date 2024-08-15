export default [
    {
      title: 'Home',
      to: 'root',
      icon: { icon: 'ri-home-smile-2-line' },
    },
    {
      title: 'User',
      icon: { icon: 'ri-user-line' },
      children: [
        { title: 'List', to: 'apps-user-list' },
      ],
    },
  ]
