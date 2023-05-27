<script setup>
import { onMounted, ref } from "vue";
import requests from "../services/services";
import FoodItem from "./FoodItem.vue";

let currentPage = 1;
let items = ref([]);

onMounted(() => {
  requests
    .getFoodList(currentPage)
    .then((response) => {
      items.value = response.data.rows;
    })
    .catch((error) => {
      console.log(error.response);
    });
});
</script>

<template>
  <v-row class="ma-2">
    <v-col md="4" class="pa-3" v-for="item in items" :key="item.id">
      <food-item :item="item" />
    </v-col>
  </v-row>
</template>
