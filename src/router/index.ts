import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { getUser } from "@/firebase/getUser";

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
      "name": "login",
      component: LoginView
    }
  ],
});

router.beforeEach(async (to, from) => {
  console.log("Starting check for user!");
  const currentUser = await getUser();
  console.log("Received user")
  if (currentUser == null && to.name !== "login") {
    console.log("Redirecting to login!")
    return { name: "login" };
  }
});

export default router;
