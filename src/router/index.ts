import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import CarsListView from "../views/CarsListView.vue";
import CarsFormView from "../views/CarsFormView.vue";
import CarsEditView from "../views/CarsEditView.vue";
import OwnersListView from "../views/OwnersListView.vue";
import OwnersFormView from "../views/OwnersFormView.vue";
import OwnersEditView from "../views/OwnersEditView.vue";
import RegisterView from "../views/RegisterView.vue";

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
      path: "/cars/list",
      name: "cars-list",
      component: CarsListView,
    },
    {
      path: "/cars/new",
      name: "cars-new",
      component: CarsFormView,
    },
    {
      path: "/cars/edit/:carId",
      name: "cars-edit",
      component: CarsEditView,
    },
    {
      path: "/owners/list",
      name: "owners-list",
      component: OwnersListView,
    },
    {
      path: "/owners/new",
      name: "owners-new",
      component: OwnersFormView,
    },
    {
      path: "/owners/edit/:ownerId",
      name: "owners-edit",
      component: OwnersEditView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    !localStorage.getItem("token") &&
    !localStorage.getItem("user")
  ) {
    next({ name: "login" });
  } else if (
    (to.name === "login" || to.name === "register") &&
    localStorage.getItem("token") &&
    localStorage.getItem("user")
  ) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});
export default router;
