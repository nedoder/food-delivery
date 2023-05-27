<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  item: Object,
});
const { item } = toRefs(props);
</script>

<template>
  <router-link
    tabindex="-1"
    :to="{ path: 'food/' + item.id }"
    class="food-item"
    exact
  >
    <v-card>
      <v-img :src="$imagePath + item.picture" alt="Food image" cover></v-img>
      <v-card-title>
        {{ item.name.toUpperCase() }}
      </v-card-title>
      <v-card-text>
        <v-row align="center" no-gutters>
          <v-col class="text-h6" cols="6"> {{ item.price }}&euro; </v-col>
          <v-col class="text-right" cols="6">
            <v-icon icon="mdi-star" color="yellow"></v-icon>
            {{ parseFloat(item.total_rating).toFixed(2) ?? 0 }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </router-link>
</template>
