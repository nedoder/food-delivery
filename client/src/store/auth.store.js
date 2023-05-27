import { defineStore } from "pinia";
import requests from "../services/services";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("id"),
    cartItems: localStorage.getItem("items") || 0,
  }),
  actions: {
    async login(username, password) {
      const user = await requests.logIn({
        username,
        password,
      });

      // update pinia state
      this.token = user.data.token;
      this.userId = user.data.id;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("token", this.token);
      localStorage.setItem("id", this.userId);

      // redirect to home page
      this.router.push({ path: "/" });
    },
    logout() {
      // update pinia state
      this.token = null;
      this.userId = null;

      // remove user details and jwt from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      // redirect to home page
      this.router.push({ path: "/login" });
    },
  },
});
