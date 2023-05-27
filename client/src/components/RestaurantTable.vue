<script setup>
import { ref, onMounted } from "vue";
import requests from "../services/services";

const currentPage = 1;
const items = ref([]);
const errorMessage = ref("");

function getRestaurants() {
  requests
    .getRestaurants(currentPage)
    .then((response) => {
      items.value = response.data.rows;
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}

function deleteRestaurant(id) {
  requests
    .deleteRestaurant(id)
    .then(() => {
      getRestaurants();
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}

onMounted(() => {
  getRestaurants();
});
</script>

<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Address</th>
        <th class="text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          {{ item.Geolocation.latitude }}, {{ item.Geolocation.longitude }}
        </td>
        <td>
          <v-btn
            icon="mdi-delete"
            color="red"
            size="small"
            class="ma-1"
            @click="deleteRestaurant(item.id)"
          >
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
