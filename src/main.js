import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import './filters'
import octo from '@/clients/octoauth'

Vue.config.productionTip = false


octo.reloadGrant()
  .then(isAuthorized => {
    // if no authorization is reloaded, handle authorization response or redirect to authz server
    if (!isAuthorized) octo.handleAuthorizationResponse(true);
  });


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
