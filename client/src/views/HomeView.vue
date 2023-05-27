<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth.store";

import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { cartItems } = storeToRefs(authStore);
const router = useRouter();
</script>

<template>
  <v-app>
    <v-app-bar app clipped-left color="black" dark dense elevation="0">
      <v-app-bar-title>Foody</v-app-bar-title>
      <v-btn
        dark
        prepend-icon="mdi-hamburger"
        @click="router.push({ path: '/food' })"
      >
        Food
      </v-btn>
      <v-btn
        dark
        prepend-icon="mdi-account-cog"
        @click="router.push({ path: '/admin' })"
      >
        Admin
      </v-btn>
      <v-badge color="green" :content="cartItems">
        <v-btn
          dark
          prepend-icon="mdi-cart"
          @click="router.push({ path: '/order' })"
        >
          Cart
        </v-btn>
      </v-badge>
      <v-btn dark prepend-icon="mdi-logout-variant" @click="authStore.logout()">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- footer -->
    <v-footer app fixed inset bottom class="bg-blue-grey-lighten-5">
      <v-col class="text-center" cols="12">
        &copy; Food delivery. All rights reserved. Powered by
        <a href="https://github.com/nedoder">nedoder</a>
      </v-col>
    </v-footer>
  </v-app>
</template>
