import octoauthClient from '@/clients/octoauth'

export default {
    namespaced: true,
    state: {
        account: null
    },
    mutations: {
        setAccount(state, account){
            state.account = account;
        }
    },
    actions: {
        loadAccount({commit}){
            octoauthClient.whoami()
            .then(account=>{
                commit('setAccount', account);
            })
        },
        logout({commit}){
            octoauthClient.revokeGrant();
            commit('setAccount', null);
        }
    }
}