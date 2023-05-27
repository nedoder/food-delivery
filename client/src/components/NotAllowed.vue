<script setup></script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col sm="6" class="mx-auto">
        <v-card class="mb-5 pb-5">
          <v-card-title class="text-h6 text-center"
            >You don't have permission to visit this page.</v-card-title
          >
          <v-card-text class="mb-5 pb-5">
            <img src="../assets/access-denied.webp" alt="Access denied" />
          </v-card-text>
          <v-card-text>
            Click <router-link to="/">here</router-link> to return to home.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-row {
  height: 80vh !important;
}

img {
  width: 100%;
}
a {
  text-decoration: underline;
}
</style>
