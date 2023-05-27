<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import requests from "../services/services";

const router = useRouter();
const latitude = ref("");
const longitude = ref("");
const errorMessage = ref("");
const isValid = ref(true);

function createRestaurant() {
  requests
    .addRestaurant({
      latitude: latitude.value,
      longitude: longitude.value,
    })
    .then(() => {
      router.push({ path: "/admin/restaurant" });
    })
    .catch((error) => {
      errorMessage.value = error.message;
    });
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col sm="6" class="mx-auto">
        <v-form v-model="isValid">
          <v-card tile class="mb-5 pb-5">
            <v-card-title>Create restaurant</v-card-title>
            <v-card-text class="mb-5 pb-5">
              <v-text-field
                filled
                shaped
                v-model="latitude"
                label="Latitude"
                type="number"
                :rules="[(v) => v.length > 1 || 'You must enter latitude']"
              >
              </v-text-field>

              <v-text-field
                filled
                shaped
                v-model="longitude"
                label="Longitude"
                type="number"
                :rules="[(v) => v.length > 1 || 'You must enter longitude']"
              >
              </v-text-field>
              <span color="red">{{ errorMessage }}</span>
              <v-btn
                @click="createRestaurant"
                :disabled="!isValid"
                color="black"
                >Create</v-btn
              >
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-row {
  height: 80vh !important;
}
</style>
