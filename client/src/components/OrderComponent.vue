<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth.store";

import requests from "../services/services";
const authStore = useAuthStore();
const { cartItems } = storeToRefs(authStore);

const items = ref([]);
const orders = ref([]);
const total = ref(0);
const orderId = ref(null);
const responseMessage = ref("");

function confirmOrder() {
  cartItems.value = 0;
  localStorage.setItem("items", cartItems.value);
  requests
    .confirmOrder(orderId.value, {
      userId: authStore.userId,
      total: total.value,
    })
    .then((response) => {
      responseMessage.value = response.data.message;
      getUserOrders();
      setTimeout(() => (orderId.value = null), 2000);
    })
    .catch((error) => {
      responseMessage.value = error.response.data.message;
      getUserOrders();
      setTimeout(() => (orderId.value = null), 2000);
    });
}

function getOrder(id) {
  requests
    .getOrder(id)
    .then((response) => {
      items.value = response.data.OrderItems;
      items.value.forEach((item) => (total.value += item.amount));
    })
    .catch((error) => {
      responseMessage.value = error.message;
    });
}

function getUserOrders() {
  requests
    .getUser(authStore.userId)
    .then((response) => {
      orders.value = response.data.Orders.sort((a, b) => a.id - b.id);
      if (
        response.data.Orders[response.data.Orders.length - 1].status === "draft"
      ) {
        orderId.value =
          response.data.Orders[response.data.Orders.length - 1].id;
        getOrder(orderId.value);
      }
    })
    .catch((error) => {
      responseMessage.value = error.response.data.message;
    });
}

onMounted(() => {
  getUserOrders();
});
</script>

<template>
  <v-container class="row text-center justify-center align-center fill-height">
    <v-col sm="8" class="mx-auto" v-if="orderId">
      <v-card>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">Id</th>
              <th class="text-left">Picture</th>
              <th class="text-left">Name</th>
              <th class="text-left">Price</th>
              <th class="text-left">Quantity</th>
              <th class="text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>
                <img
                  :src="$imagePath + item.FoodItem.picture"
                  style="width: 50px; height: 50px; border-radius: 50%"
                />
              </td>
              <td>
                {{ item.FoodItem.name }}
              </td>
              <td>
                {{ item.FoodItem.price }}
              </td>
              <td>
                {{ item.quantity }}
              </td>
              <td>
                {{ item.amount }}
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-card-text class="text-h6 text-right">
          Total: {{ total }} &euro;</v-card-text
        >
        <v-card-text class="text-p text-center" v-if="responseMessage">{{
          responseMessage
        }}</v-card-text>
        <v-card-text class="text-p text-center">
          <v-btn
            prepend-icon="mdi-cart-arrow-right"
            color="info"
            rounded="pill"
            @click="confirmOrder"
            >Order</v-btn
          >
        </v-card-text>
      </v-card>
    </v-col>
    <v-col sm="8" class="mx-auto" v-if="!orderId">
      <v-card v-if="!orderId">
        <v-card-title>Your cart is empty!</v-card-title>
        <v-card-text class="mb-5 pb-5">
          <img src="../assets/empty-cart.webp" alt="Page not found" />
        </v-card-text>
        <v-card-text
          >Looks like you have not added anything to your cart. Go ahead &
          explore our food.</v-card-text
        >
      </v-card>
    </v-col>
    <v-col sm="12" class="mx-auto">
      <v-card>
        <v-card-title>Your previous orders</v-card-title>
        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-center">Id</th>
              <th class="text-center">Status</th>
              <th class="text-center">Total</th>
              <th class="text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orders" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.total }} &euro;</td>
              <td>
                {{ new Date(item.updatedAt).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-col>
  </v-container>
</template>

<style scoped>
img {
  width: 100%;
}
</style>
