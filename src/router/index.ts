import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { getCurrentUser } from "vuefire";

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
  ],
});

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser();
  if (currentUser == null && to.name !== "login") {
    return { name: "login" };
  } else if (currentUser !== null && to.name === "login") {
    return { name: "home" };
  }
});

export default router;
