export default [
  { heading: 'Apps & Pages' },
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
      { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
]
