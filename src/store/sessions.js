import octoauthClient from '@/clients/octoauth'

export default {
    namespaced: true,
    actions: {
        list(){
            return octoauthClient.getSessions(); 
        },
        revoke(context, sessionUID){
            return octoauthClient.revokeSession(sessionUID);
        }
    }
}