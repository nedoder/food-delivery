<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import requests from "../services/services";

const router = useRouter();
const firstname = ref("");
const lastname = ref("");
const username = ref("");
const password = ref("");
const passwordRepeat = ref("");
var longitude = "";
var latitude = "";
const location = ref("");
let errorMessage = ref("");
const isValid = ref(true);
const showPass = ref(false);
const showRepeatedPass = ref(false);

function locatorButtonPressed() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      location.value =
        position.coords.latitude + "," + position.coords.longitude;
    },
    (error) => {
      console.log(error.message);
    }
  );
}

const passwordConfirmationRule = computed(
  () => password.value === passwordRepeat.value || "Passwords don't match."
);

function signUp() {
  requests
    .signUp({
      firstName: firstname.value,
      lastName: lastname.value,
      username: username.value,
      password: password.value,
      latitude: latitude,
      longitude: longitude,
      roleId: 2,
    })
    .then(() => {
      router.push({ path: "/login" });
    })
    .catch((err) => {
      errorMessage.value = err.response.data.message;
    });
}
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col sm="6" class="mx-auto">
        <v-form
          v-model="isValid"
          class="row text-center justify-center align-center fill-height"
        >
          <v-card tile class="mb-5 pb-5">
            <v-card-title>Create account</v-card-title>
            <v-card-text class="mb-5 pb-5">
              <v-text-field
                filled
                shaped
                v-model="firstname"
                label="First name"
                :rules="[(v) => v.length > 1 || 'You must enter first name']"
              >
              </v-text-field>
              <v-text-field
                filled
                shaped
                v-model="lastname"
                label="Last name"
                :rules="[(v) => v.length > 1 || 'You must enter last name']"
              >
              </v-text-field>
              <v-text-field
                filled
                shaped
                v-model="username"
                label="Username"
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
              <v-text-field
                filled
                shaped
                v-model="passwordRepeat"
                label="Repeat password"
                :append-icon="showRepeatedPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showRepeatedPass = !showRepeatedPass"
                :type="showRepeatedPass ? 'text' : 'password'"
                :rules="[passwordConfirmationRule]"
              >
              </v-text-field>

              <v-btn
                dark
                prepend-icon="mdi-map-marker"
                @click="locatorButtonPressed"
                variant="tonal"
                class="ma-2"
              >
                Click here to load your current address
              </v-btn>
              <v-text-field
                filled
                shaped
                v-model="location"
                v-show="location"
                label="Location"
              >
              </v-text-field>
              <span color="red">{{ errorMessage }}</span>
              <v-card-text>
                <v-row align="center" no-gutters class="actions-row">
                  <v-col class="text-h6 text-left" cols="6">
                    <v-btn @click="signUp" :disabled="!isValid" color="black"
                      >Register</v-btn
                    >
                  </v-col>
                  <v-col class="text-right" cols="6">
                    <router-link to="login">Login</router-link>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
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
