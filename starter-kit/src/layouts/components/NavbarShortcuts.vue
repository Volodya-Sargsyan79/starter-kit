<script setup>
const shortcuts = [
  {
    icon: 'ri-user-line',
    title: 'Users',
    subtitle: 'Manage Users',
    to: { name: 'apps-user-list' },
  },
]
</script>

<template>
  <Shortcuts :shortcuts="shortcuts" />
</template>
