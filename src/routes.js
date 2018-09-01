import Login from '@pages/Login'
import Home from '@pages/Home'
import About from '@pages/About'

import withAuth from '@hocs/withAuth'

export default [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    exact: true,
    component: withAuth(Home)
  },
  {
    path: '/about',
    component: withAuth(About)
  }
]
