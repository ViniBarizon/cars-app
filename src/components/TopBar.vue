<template>
  <div>
    <header>
      <div>
        <RouterLink to="/" class="topbar-link">Home</RouterLink>
        <RouterLink to="/dashboard" class="topbar-link">Dashboard</RouterLink>
      </div>
      <div class="right-buttons">
        <RouterLink to="/login" v-on="{ click: logout }" v-if="!token" class="topbar-link">
          <button class="topbar-link">Login</button>
        </RouterLink>
        <RouterLink to="/register" v-if="!token" class="topbar-link">Registrar</RouterLink>
        <button class="topbar-link" v-if="token" @click="logout">Logout</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import http from '@/services/http.ts'

const token = ref(localStorage.getItem('token'))

const logout = async () => {
  try {
    await http.post('/auth/logout', {})
    localStorage.clear()
    location.reload()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
header {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  background-color: #1d1d1d;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

header div {
  display: flex;
  gap: 10px;
}

button {
  background-color: #4f4f4f;
  color: hsla(160, 100%, 37%, 1);
  border: none;
  border-radius: 5px;
}

.topbar-link {
  font-size: 1rem;
}
</style>
