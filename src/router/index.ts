import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import CarsView from "../views/CarsView.vue";
import OwnersView from "../views/OwnersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/cars",
      name: "cars",
      component: CarsView,
    },
    {
      path: "/owners",
      name: "owners",
      component: OwnersView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    !localStorage.getItem("token") &&
    !localStorage.getItem("user")
  ) {
    next({ name: "login" });
  } else if (
    to.name === "login" &&
    localStorage.getItem("token") &&
    localStorage.getItem("user")
  ) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});
export default router;
