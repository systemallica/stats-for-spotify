import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../components/Dashboard.vue"
import NotFound from "../views/NotFound.vue"

const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
