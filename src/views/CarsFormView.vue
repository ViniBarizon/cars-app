<template>
  <div>
    <div class="buttons">
      <RouterLink to="/cars/list">Exibir carros</RouterLink>
    </div>
    <div class="card">
      <form @submit.prevent="store">
        <select>
          <option v-for="owner in owners.value" :key="owner.id" :value="owner.id">
            {{ owner.name }}
          </option>
        </select>
        <input required v-model="car.model" type="text" placeholder="Modelo" />
        <input required v-model="car.brand" type="text" placeholder="Marca" />
        <input required v-model="car.license_plate" type="text" placeholder="Placa" />
        <input required v-model="car.year" type="number" placeholder="Ano" />
        <input required v-model="car.color" type="text" placeholder="Cor" />
        <input required v-model="car.chassis_number" type="text" placeholder="Número do chassi" />
        <input required v-model="car.engine_number" type="text" placeholder="Número do motor" />
        <input required v-model="car.type" type="text" placeholder="Tipo" />
        <p class="form-error">
          {{ errorMessage }}
        </p>
        <button :disabled="!car" type="submit">Salvar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import http from '@/services/http.ts'

const cars = reactive([])
const car = reactive({
  owner_id: 1,
  model: null,
  brand: null,
  license_plate: null,
  year: null,
  color: null,
  chassis_number: null,
  engine_number: null,
  type: null
})

const owners = reactive([])

const errorMessage = ref('')
const newCar = ref('')
const showCars = ref('')

onMounted(async () => {
  fetchOwners().then((response) => {
    console.log(response.data)
    owners.value = response.data
  })
  fetchCars()
  console.log(owners)
})

async function fetchCars() {
  try {
    const { data } = await http.get('/cars')
    cars.value = data
  } catch (error) {
    console.log(error)
  }
}

async function fetchOwners() {
  try {
    return await http.get('/owners')
  } catch (error) {
    console.log(error)
  }
}

const store = async () => {
  try {
    const { data } = await http.post('/cars', car)
    cars.value.push(data)
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
</style>
