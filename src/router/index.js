import Vue from 'vue'
import VueRouter from 'vue-router'

import AccountDetails from '@/views/account/AccountDetails'
import AccountSecurity from '@/views/account/AccountSecurity'
import BrowseMyApplications from '@/views/developers/BrowseMyApplications'
import ManageApplication from '@/views/developers/ManageApplication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/developer/applications'
  },
  {
    path: '/account',
    name: 'AccountDetails',
    component: AccountDetails
  },
  {
    path: '/account/security',
    name: 'AccountSecurity',
    component: AccountSecurity
  },
  {
    path: '/developer/applications',
    name: 'BrowseMyApplications',
    component: BrowseMyApplications
  },
  {
    path: '/developer/applications/:applicationUid',
    name: 'ManageApplication',
    component: ManageApplication
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
