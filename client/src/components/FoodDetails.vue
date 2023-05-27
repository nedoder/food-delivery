<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth.store";

import requests from "../services/services";

const authStore = useAuthStore();
const route = useRoute();
const { cartItems } = storeToRefs(authStore);

const item = ref({});
const rating = ref(1);
const responseMessage = ref("");
const quantity = ref(1);
const newOrder = ref(false);
const orderId = ref(null);

function rateFood() {
  requests
    .addRating({
      userId: authStore.userId,
      foodId: route.params.id,
      rating: rating.value,
    })
    .then(() => {
      responseMessage.value = "Sucessfully added rating!";
    })
    .catch((error) => {
      responseMessage.value = error.response.data.message;
    });
}

function createOrder() {
  requests
    .addOrder({
      userId: authStore.userId,
      foodId: route.params.id,
      quantity: quantity.value,
      amount: quantity.value * item.value.price,
      total: quantity.value * item.value.price,
    })
    .then(() => {
      responseMessage.value = "Sucessfully added to cart!";
    })
    .catch((error) => {
      responseMessage.value = error.response.data.message;
    });
}

function editOrder() {
  requests
    .editOrder(orderId.value, {
      userId: authStore.userId,
      foodId: route.params.id,
      quantity: quantity.value,
      amount: quantity.value * item.value.price,
      total: quantity.value * item.value.price,
    })
    .then(() => {
      responseMessage.value = "Sucessfully added to cart!";
    })
    .catch((error) => {
      responseMessage.value = error.response.data.message;
    });
}

function addToCart() {
  cartItems.value++;
  localStorage.setItem("items", cartItems.value);
  if (newOrder.value) {
    createOrder();
    newOrder.value = false;
  } else {
    editOrder();
  }
}

onMounted(() => {
  requests
    .getFoodItem(route.params.id)
    .then((response) => {
      item.value = response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });

  requests
    .getUser(authStore.userId)
    .then((response) => {
      if (response.data.Orders.length > 0) {
        if (
          response.data.Orders[response.data.Orders.length - 1].status ===
          "draft"
        ) {
          newOrder.value = false;
          orderId.value =
            response.data.Orders[response.data.Orders.length - 1].id;
        } else {
          newOrder.value = true;
        }
      } else {
        newOrder.value = true;
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
});
</script>

<template>
  <v-container class="row text-center justify-center align-center fill-height">
    <v-col sm="12" class="mx-auto">
      <v-card tile class="mb-5 pb-5">
        <v-card-text class="mb-5 pb-5">
          <v-img :src="$imagePath + item.picture" alt="Food image" cover />
        </v-card-text>

        <v-card-text>
          <v-row align="center" no-gutters>
            <v-col class="text-h6 text-left" cols="6">
              {{ item.price }}&euro;
            </v-col>
            <v-col class="text-h5 text-right" cols="6">
              {{ item.name ? item.name.toUpperCase() : item.name }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          Rate this dish
          <v-spacer></v-spacer>
          <v-rating
            v-model="rating"
            background-color="yellow"
            color="yellow accent-4"
            dense
            increments
            hover
            size="32"
            @input="rateFood"
          ></v-rating>
        </v-card-actions>

        <v-row align="center" no-gutters>
          <v-col cols="3"></v-col>
          <v-col cols="3" class="text-h6 text-right">
            <v-card-text>Qty: {{ quantity }}</v-card-text>
          </v-col>
          <v-col class="text-h6 text-center" cols="3">
            <v-slider
              v-model="quantity"
              color="info"
              track-color="grey"
              always-dirty
              min="1"
              max="10"
              class="pt-4"
            >
              <template v-slot:prepend>
                <v-icon @click="quantity--"> mdi-minus </v-icon>
              </template>

              <template v-slot:append>
                <v-icon @click="quantity++"> mdi-plus </v-icon>
              </template>
            </v-slider>
          </v-col>
          <v-col class="text-h6 text-center" cols="3">
            <v-btn
              prepend-icon="mdi-cart"
              color="info"
              rounded="pill"
              @click="addToCart"
              >Add to cart</v-btn
            >
          </v-col>
        </v-row>
        <span>{{ responseMessage }}</span>
      </v-card>
    </v-col>
  </v-container>
</template>
