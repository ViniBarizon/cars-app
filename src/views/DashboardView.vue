<template>
  <div>
    <RouterLink to="/cars/list">Exibir carros</RouterLink>
    <RouterLink to="/cars/new">Adicionar carro</RouterLink>
    <RouterLink to="/owners/list">Exibir donos</RouterLink>
    <RouterLink to="/owners/new">Adicionar dono</RouterLink>
  </div>
</template>

<script setup></script>

<style la scoped>
div {
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
</style>
