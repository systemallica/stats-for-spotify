import { createWebHistory, createRouter } from "vue-router"

import DashboardView from "../components/Dashboard.vue"
import NotFoundPage from "../views/NotFoundPage.vue"

const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutPage.vue")
  },
  {
    path: "/:match(.*)*",
    name: "NotFound",
    component: NotFoundPage
  }
]

var router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
})

export default router
