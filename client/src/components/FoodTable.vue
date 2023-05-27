<script setup>
import { ref, onMounted } from "vue";
import requests from "../services/services";

const currentPage = 1;
const items = ref([]);
const errorMessage = ref("");

function getFood() {
  requests
    .getFoodList(currentPage)
    .then((response) => {
      items.value = response.data.rows;
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}

function deleteFood(id) {
  requests
    .deleteFoodItem(id)
    .then(() => {
      getFood();
    })
    .catch((error) => {
      errorMessage.value = error.response.data.message;
    });
}

onMounted(() => {
  getFood();
});
</script>

<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Picture</th>
        <th class="text-left">Name</th>
        <th class="text-left">Price</th>
        <th class="text-left">Rating</th>
        <th class="text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <img
            :src="$imagePath + item.picture"
            style="width: 50px; height: 50px; border-radius: 50%"
          />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.total_rating ?? 0 }}</td>
        <td>
          <v-btn
            icon="mdi-delete"
            color="red"
            size="small"
            class="ma-1"
            @click="deleteFood(item.id)"
          >
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
