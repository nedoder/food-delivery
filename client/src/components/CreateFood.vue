<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import requests from "../services/services";

const router = useRouter();
const name = ref("");
const price = ref(null);
let picture = ref(null);
const errorMessage = ref("");
const isValid = ref(true);

function createFood() {
  let formData = new FormData();
  if (picture.value[0]) {
    formData.append("picture", picture.value[0], picture.value[0].name);
  }
  formData.append("name", name.value);
  formData.append("price", price.value);
  requests
    .addFoodItem(formData)
    .then(() => {
      router.push({ name: "foodlist" });
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
            <v-card-title>Create food item</v-card-title>
            <v-card-text class="mb-5 pb-5">
              <v-text-field
                filled
                shaped
                v-model="name"
                label="Name"
                :rules="[(v) => v.length > 1 || 'You must enter name']"
              >
              </v-text-field>

              <v-file-input
                filled
                shaped
                prepend-icon=""
                v-model="picture"
                append-icon="mdi-camera"
                label="Picture"
                :rules="[(v) => !!v || 'You must enter photo']"
                accept="image/*"
                required
              >
              </v-file-input>

              <v-text-field
                filled
                shaped
                chips
                v-model="price"
                label="Price"
                type="number"
                :rules="[(v) => v.length >= 1 || 'You must enter price']"
              >
              </v-text-field>
              <span color="red">{{ errorMessage }}</span>
              <v-btn @click="createFood" :disabled="!isValid" color="black"
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
