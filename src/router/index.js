import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (vue) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // Patch Router with Authentication
  Router.beforeEach((to, from, next) => {
    console.log(to)
    // Meta data flags
    let isPublicRoute = to.matched.some(record => record.meta.public)
    let isAuthRoute = to.matched.some(record => record.meta.auth)
    // let isAdminRoute = to.matched.some(record => record.meta.admin)

    // User flags
    let isUserLoggedIn = true
    // let isUserLoggedIn = true

    // let isUserAdmin = isUserLoggedIn && getUser().admin === true
    if (isUserLoggedIn && isAuthRoute) next()
    // Redirect for Protected Routes
    // if ((isAdminRoute && !isUserLoggedIn) || (isAuthRoute && !isUserLoggedIn)) {
    //   next({
    //     path: '/login'
    //   })
    // }

    // Redirect for authenticated non-admins
    // if (isUserLoggedIn && isAdminRoute && !isUserAdmin) next({ path: '/profile' })

    // Passthrough
    if (isPublicRoute) next()
  })
  return Router
}
