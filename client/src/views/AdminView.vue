<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth.store";

const authStore = useAuthStore();
const drawer = ref(false);
const mini = ref(false);
const items = [
  { title: "Home", icon: "mdi-home", href: "/food" },
  { title: "Food", icon: "mdi-hamburger", href: "/admin/food" },
  { title: "Restaurants", icon: "mdi-silverware", href: "/admin/restaurant" },
];
const createItems = [
  { title: "Food", icon: "mdi-hamburger", href: "/admin/create/food" },
  {
    title: "Restaurant",
    icon: "mdi-silverware",
    href: "/admin/create/restaurant",
  },
];
</script>

<template>
  <v-app>
    <v-app-bar app clipped-left color="black" dark dense elevation="0">
      <!-- header -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Food delivery admin dashboard</v-app-bar-title>
      <!-- navigation for creating components -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn dark icon v-bind="props">
            <v-icon dense class="mx-4">mdi-plus</v-icon>
            <v-tooltip activator="parent" location="end">Create</v-tooltip>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in createItems"
            :key="index"
            :value="index"
            :to="item.href"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- navigation for logout       -->
      <v-btn dark icon>
        <v-icon
          dense
          class="mx-4"
          icon="mdi-logout-variant"
          @click="authStore.logout()"
        />
        <v-tooltip activator="parent" location="end">Logout</v-tooltip>
      </v-btn>
    </v-app-bar>

    <!-- left navigation for pages -->
    <v-navigation-drawer v-model="drawer" app clipped color="black" dark>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.href"
          @click.stop="mini = !mini"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- main layout -->
    <v-main>
      <v-container fluid>
        <v-row class="fill-height">
          <v-col>
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </v-col>
        </v-row>
      </v-container>
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
