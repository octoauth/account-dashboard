import Vue from 'vue'
import VueRouter from 'vue-router'
import octoauthClient from '@/clients/octoauth'

import AccountDetails from '@/views/account/AccountDetails'
import AccountSessions from '@/views/security/AccountSessions'
import Groups from '@/views/groups/BrowseGroups'
import BrowseMyApplications from '@/views/developers/BrowseMyApplications'
import ManageApplication from '@/views/developers/ManageApplication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/account'
  },
  {
    path: '/account',
    name: 'AccountDetails',
    component: AccountDetails
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups
  },
  {
    path: '/security',
    name: 'AccountSecurity',
    component: AccountSessions
  },
  {
    path: '/developer/applications',
    name: 'BrowseMyApplications',
    component: BrowseMyApplications
  },
  {
    path: '/developer/applications/:applicationUID',
    name: 'ManageApplication',
    component: ManageApplication
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
    const isAuthorized = await octoauthClient.isAuthorized.waitValue()

    if (isAuthorized) next()
    else octoauthClient.authorize()
})

export default router
