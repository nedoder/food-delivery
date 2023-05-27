import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  mode: "history",
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "active",
  scrollBehavior(to) {
    if (to.hash) {
      return window.scrollTo(0, document.body.scrollHeight);
    }
    return window.scrollTo(0, 0);
  },
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      redirect: "food",
      children: [
        {
          path: "/food",
          name: "foodlisting",
          component: () => import("../components/FoodListUser.vue"),
        },
        {
          path: "/food/:id",
          name: "fooditem",
          component: () => import("../components/FoodDetails.vue"),
        },
        {
          path: "/order",
          name: "order",
          component: () => import("../components/OrderComponent.vue"),
        },
        {
          path: "/access-denied",
          name: "access-denied",
          component: () => import("../components/NotAllowed.vue"),
        },
        {
          path: "/:pathMatch(.*)*",
          name: "notfound",
          component: () => import("../components/NotFound.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      redirect: "admin/food",
      component: () => import("../views/AdminView.vue"),
      meta: {
        requiredAuthorization: true, // You can enable/disable authorization
        roles: ["admin"], // This can be accessed by only admin
      },
      children: [
        {
          path: "/admin/food",
          name: "foodlist",
          component: () => import("../components/FoodListAdmin.vue"),
        },
        {
          path: "/admin/restaurant",
          name: "restaurantlist",
          component: () => import("../components/RestaurantList.vue"),
        },
        {
          path: "/admin/create/food",
          name: "addfood",
          component: () => import("../components/CreateFood.vue"),
        },
        {
          path: "/admin/create/restaurant",
          name: "addrestaurant",
          component: () => import("../components/CreateRestaurant.vue"),
        },
      ],
    },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    var expired = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
    var time = Date.now() < expired.exp * 1000;
  }
  // If logged in, or going to the Login page.
  if (to.name === "login" || to.name === "signup" || to.name === "notfound") {
    // Continue to page.
    next();
  } else if (to.meta.requiredAuthorization) {
    if (to.meta?.roles?.includes(expired.role.toLowerCase())) {
      next();
    } else {
      next("/access-denied");
    }
  } else if (time) {
    next();
  } else {
    // Not logged in, redirect to login.
    next({ name: "login" });
  }
});
