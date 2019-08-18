import Vue from 'vue'
import Router from 'vue-router'
import { auth } from './config/firebase'

const Container = () => import(/* webpackChunkName: "container" */ './layouts/Container')

const Login = () => import(/* webpackChunkName: "login" */ './views/Login')

const Home = () => import(/* webpackChunkName: "home" */ './views/Home')
const About = () => import(/* webpackChunkName: "about" */ './views/About')
const Contact = () => import(/* webpackChunkName: "contact" */ './views/Contact')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', 
      component: Container,
      meta: { 
        requiresAuth: true
      },
      children: [
        { path: '/home', component: Home },
        { path: '/about', component: About },
        { path: '/contact', component: Contact }
      ]
    },
    { path: '/login', component: Login, meta: { authPage: true } }
  ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const authPage = to.matched.some(x => x.meta.authPage)
    const currentUser = auth.currentUser

    if (requiresAuth && !currentUser) next('/login')
    else if (currentUser) {
      if (authPage) {
        next('/home');
      } else {
        next();
      }
    }
    else next()
})

export default router