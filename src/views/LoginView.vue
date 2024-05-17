<template>
  <div class="card">
    <form @submit.prevent="login">
      <input v-model="user.email" type="text" placeholder="Seu email" />
      <input v-model="user.password" type="password" placeholder="Sua senha" />
      <input v-model="user.confirmPassword" type="password" placeholder="Confirme sua senha" />
      <p class="form-error">
        {{ errorMessage }}
      </p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import http from '@/services/http.ts'
import { userStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'
const user = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const errorMessage = ref('')
const router = useRouter()

const login = async () => {
  try {
    const { data } = await http.post('/auth/login', user)
    const userStoreInstance = userStore()
    userStoreInstance.store(data.user)
    localStorage.setItem('token', data.token)
    location.reload()
    router.push({ name: 'dashboard' })
  } catch (error) {
    errorMessage.value = error?.response?.data?.message
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
  max-width: 50rem;
  width: 50rem;
  height: 30rem;
  margin: 20px auto;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #2f2f2f;
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
  background-color: #181818;
  border: 1px solid #191919;
  border-radius: 5px;
  color: white;
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
  background-color: #4f4f4f;
  color: hsla(160, 100%, 37%, 1);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.card form button:hover {
  background-color: #6f6f6f;
}

.form-error {
  color: red;
}
</style>
