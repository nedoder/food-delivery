<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth.store";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isValid = ref(true);
const showPass = ref(false);

async function logIn() {
  const authStore = useAuthStore();

  return authStore
    .login(username.value, password.value)
    .catch((error) => console.log(error));
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col sm="6" class="mx-auto">
        <v-form v-model="isValid">
          <v-card tile class="mb-5 pb-5">
            <v-card-title>Login</v-card-title>
            <v-card-text class="mb-5 pb-5">
              <v-text-field
                filled
                shaped
                v-model="username"
                label="Userame"
                :rules="[(v) => v.length > 1 || 'You must enter username']"
              >
              </v-text-field>
              <v-text-field
                filled
                shaped
                v-model="password"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                :type="showPass ? 'text' : 'password'"
                :rules="[(v) => v.length > 1 || 'You must enter password']"
              >
              </v-text-field>
              <span color="red">{{ errorMessage }}</span>
              <v-card-text>
                <v-row align="center" no-gutters class="actions-row">
                  <v-col class="text-h6 text-left" cols="6">
                    <v-btn @click="logIn" :disabled="!isValid" color="black"
                      >Login</v-btn
                    >
                  </v-col>
                  <v-col class="text-right" cols="6">
                    <router-link to="signup">Register</router-link>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col></v-row
    >
  </v-container>
</template>

<style scoped>
.v-row {
  height: 100vh !important;
}

.actions-row {
  height: auto !important;
}
</style>
