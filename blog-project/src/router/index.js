import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import DetailView from '../views/DetailPage.vue'
import CreateBlogView from '../views/CreateBlog.vue'
import AboutView from '../views/AboutPage.vue'
import NotFound from '../views/NotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/create-blog',
      name: 'createBlog',
      component: CreateBlogView
    },
    {
      path: '/blogs/:id',
      name: 'details',
      component: DetailView
    },
    {
      path: '/:catchAll(.*)', // Matches any path that hasn't been matched by other routes
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router