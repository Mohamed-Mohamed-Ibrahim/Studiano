import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/components/SignUp.vue'
import LogIn from '@/components/LogIn.vue'
import HomePage from '@/components/HomePage.vue'
import HowToUse from '@/components/HowToUse.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'
import Welcome from '@/components/Welcome.vue'


const routes = [
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/LogIn',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/HowToUse',
    name: 'HowToUse',
    component: HowToUse
  },
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: Welcome
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
