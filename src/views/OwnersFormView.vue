<template>
  <div>
    <div class="buttons">
      <RouterLink to="/owners/list">Exibir donos</RouterLink>
    </div>
    <div class="card">
      <form @submit.prevent="store">
        <input required v-model="owner.name" type="text" placeholder="Nome" />
        <input required v-model="owner.birth_date" type="text" placeholder="Data de nascimento" />
        <select required v-model="owner.gender">
          <option selected value="">Gênero</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="O">Outro</option>
        </select>
        <input required v-model="owner.cpf_cnpj" type="number" placeholder="CPF ou CNPJ" />
        <input required v-model="owner.email" type="email" placeholder="Email" />
        <input
          required
          v-model="owner.address_zip_code"
          v-on:blur="getAddressViaCepApi(owner.address_zip_code)"
          type="text"
          placeholder="CEP"
        />
        <input required v-model="owner.address_street" type="text" placeholder="Logradouro" />
        <input required v-model="owner.address_number" type="text" placeholder="Número" />
        <input required v-model="owner.address_block" type="text" placeholder="Bairro" />
        <input required v-model="owner.address_city" type="text" placeholder="Cidade" />
        <input required v-model="owner.address_state" type="text" placeholder="Estado" />
        <p class="form-error">
          {{ errorMessage }}
        </p>
        <button :disabled="!owner" type="submit">Salvar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import http from '@/services/http.ts'
import viaCep from '@/services/via-cep.ts'

const owners = reactive([])
const owner = reactive({
  name: null,
  birth_date: null,
  gender: '',
  cpf_cnpj: null,
  email: null,
  address_zip_code: null,
  address_street: null,
  address_number: null,
  address_block: null,
  address_city: null,
  address_state: null
})

const errorMessage = ref('')

onMounted(async () => {
  try {
    const { data } = await http.get('/owners')
    owners.value = data
  } catch (error) {
    console.log(error)
  }
})

async function getAddressViaCepApi(cep) {
  try {
    const response = await viaCep(`${cep}`)
    owner.address_street = response.logradouro
    owner.address_city = response.localidade
    owner.address_block = response.bairro
    owner.address_state = response.uf
  } catch (error) {
    console.log(error)
  }
}

async function store() {
  try {
    await http.post('/owners', owner)
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

button {
  background-color: #4f4f4f;
  padding: 0.5rem;
  color: hsla(160, 100%, 37%, 1);
  border: none;
  border-radius: 5px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  background-color: #2c2c2c;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #2f2f2f;
}

.card {
  max-width: auto;
  width: auto;
  height: auto;
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

select {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #181818;
  border: 1px solid #191919;
  border-radius: 5px;
  color: white;
  color: #7e7e7e;

  font-size: 16px;
  transition: border-color 0.3s;
  width: 100%;
  max-width: 100%;
}

select:focus {
  border-color: #007bff;
  outline: none;
}

option {
  background-color: #181818;
  color: white;
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-weight: bold;
}
</style>
