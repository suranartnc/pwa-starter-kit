import Login from '@pages/Login'
import Home from '@pages/Home'
import About from '@pages/About'

export default [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]
