<template>
  <div class="card">
    <form @submit.prevent="login">
      <input v-model="user.email" type="text" placeholder="Seu email" />
      <input v-model="user.password" type="password" placeholder="Sua senha" />
      <input v-model="user.confirmPassword" type="password" placeholder="Confirme sua senha" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import http from '@/services/http.ts'

const user = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const login = async () => {
  try {
    const { data } = await http.post('/auth/login', user)
    console.log(data)
  } catch (error) {
    console.log(error?.response?.data)
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.card {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

@media (max-width: 600px) {
  .card {
    margin: 10px;
    padding: 15px;
  }
}

.card form {
  display: flex;
  flex-direction: column;
}

.card form label {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333333;
}

.card form input,
.card form textarea {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.card form input:focus,
.card form textarea:focus {
  border-color: #007bff;
  outline: none;
}

.card form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.card form button:hover {
  background-color: #0056b3;
}
</style>
