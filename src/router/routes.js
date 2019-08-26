const routes = [
  {
    path: '/',
    component: () => import('layouts/User.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        meta: {
          public: true
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'login',
        meta: {
          public: true
        },
        component: () => import('pages/Login.vue')
      },
      {
        path: 'register',
        meta: {
          public: true
        },
        component: () => import('pages/Register.vue')
      },
      {
        path: 'profile',
        meta: {
          auth: true
        },
        component: () => import('pages/Profile.vue')
      },
      {
        path: 'admin',
        meta: {
          admin: true
        },
        component: () => import('pages/Administration.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
