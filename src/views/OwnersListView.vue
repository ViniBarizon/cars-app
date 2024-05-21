<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de nascimento</th>
            <th>Gênero</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>CEP</th>
            <th>Logradouro</th>
            <th>Número</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="owner in owners.value" :key="owner.id" @click="edit(owner)">
            <td>{{ owner.name }}</td>
            <td>{{ formatDate(owner.birth_date) }}</td>
            <td>
              {{ owner.gender === 'M' ? 'Masculino' : owner.gender === 'F' ? 'Feminino' : 'Outro' }}
            </td>
            <td>{{ owner.cpf_cnpj }}</td>
            <td>{{ owner.email }}</td>
            <td>{{ owner.address_zip_code }}</td>
            <td>{{ owner.address_street }}</td>
            <td>{{ owner.address_number }}</td>
            <td>{{ owner.address_block }}</td>
            <td>{{ owner.address_city }}</td>
            <td>{{ owner.address_state }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import http from '@/services/http.ts'

const owners = reactive([])

onMounted(async () => {
  try {
    const { data } = await http.get('/owners')
    owners.value = data
  } catch (error) {
    console.log(error)
  }
})

function edit(owner) {
  window.location.href = `/owners/edit/${owner.id}`
}

function formatDate(date) {
  const formattedDate = new Date(date)
  formattedDate.setDate(formattedDate.getDate() + 1)
  return formattedDate.toLocaleDateString('pt-BR')
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
  cursor: pointer;
}

th {
  font-weight: bold;
}
</style>
