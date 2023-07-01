import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/LoginView.vue'
import Welcome from '@/Welcome.vue'
import Pic from '@/Pic.vue'
import Main from '@/Main.vue'
import UserShow from '@/views/UserShow.vue'
import AddUser from '@/views/AddUser.vue'
import LogView from '@/views/LogView.vue'
import Notice from '@/views/Notice.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'wel',
    component: Welcome,
    children: [

      { path: '/', component: Pic },
    ]
  },
  { path: '/login', component: LoginView },
  {
    path: '/main', component: Main,
    children: [
      { path: '/userShow', component: UserShow },
      { path: '/addUser', component: AddUser },
      { path: '/logView', component: LogView },
      { path: '/', component: Notice }

    ]
  },

]
const router = new Router({
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/' || to.path == '/login') {
    next();
  }
  if (localStorage.getItem("token") == null || localStorage.getItem("token") == '') {
    if (to.path == '/' || to.path == '/login') {
      next();
    } else {
      next('/login');
    }

  } else {
    next();
  }
});
export default router

