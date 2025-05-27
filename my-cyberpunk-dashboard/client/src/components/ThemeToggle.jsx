<!-- src/components/ThemeToggle.vue -->
<template>
  <button @click="toggleTheme" class="p-2 rounded border">
    {{ isDark ? '🌙 Dark' : '☀️ Light' }}
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 1. Track theme in localStorage (or default to light)
const isDark = ref(localStorage.getItem('theme') === 'dark')

// 2. On mount, set the attribute so page loads in correct mode
onMounted(() => {
  document.documentElement.setAttribute(
    'data-theme',
    isDark.value ? 'dark' : 'light'
  )
})

// 3. Toggle function
function toggleTheme() {
  isDark.value = !isDark.value
  const mode = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem('theme', mode)
}
</script>
