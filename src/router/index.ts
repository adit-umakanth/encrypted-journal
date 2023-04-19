import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import MonthView from "@/views/MonthView.vue";
import { getCurrentUser } from "vuefire";
import dayjs from "dayjs";

const date = dayjs();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: `journal/${date.format("YYYY-MM")}`,
      children: [
        {
          path: "journal/:date?",
          component: MonthView,
          name: "month-view",
          props: true,
        },
      ],
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
