<template>
  <div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Dono</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Placa</th>
            <th>Ano</th>
            <th>Cor</th>
            <th>Número do chassi</th>
            <th>Número do motor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars.value" :key="car.id" @click="edit(car)">
            <td>{{ car.owners.name }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.brand }}</td>
            <td>{{ car.license_plate }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.color }}</td>
            <td>{{ car.chassis_number }}</td>
            <td>{{ car.engine_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import http from '@/services/http.ts'

const cars = reactive([])

const owners = reactive([])

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

function edit(car) {
  window.location.href = `/cars/edit/${car.id}`
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

td {
  cursor: pointer;
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
