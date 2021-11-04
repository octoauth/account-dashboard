import octoauthClient from '@/clients/octoauth'

export default {
    namespaced: true,
    actions: {
        getApplicationDetails(context, applicationUid){
            return octoauthClient.getApplicationDetails(applicationUid);

        },
        getMyApplications(){
            return octoauthClient.searchApplications();
        },
        createApplication(context, application){
            return octoauthClient.createApplication(application);
        },
        deleteApplication(context, applicationUid){
            return octoauthClient.deleteApplication(applicationUid)
        }
    }
}