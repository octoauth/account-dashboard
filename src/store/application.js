import octoauthClient from "@/clients/octoauth";

export default {
  namespaced: true,
  actions: {
    getApplicationDetails(context, applicationUID) {
      return octoauthClient.getApplicationDetails(applicationUID);
    },
    getMyApplications() {
      return octoauthClient.searchApplications();
    },
    createApplication(context, application) {
      return octoauthClient.createApplication(application);
    },
    updateApplication(context, application) {
      let applicationData = Object.assign({}, application);
      delete applicationData.uid;
      return octoauthClient.updateApplication(application.uid, applicationData);
    },
    deleteApplication(context, applicationUID) {
      return octoauthClient.deleteApplication(applicationUID);
    },
    getAuthorizedRedirectURIs(context, applicationUID) {
      return octoauthClient.getAuthorizedRedirectURIs(applicationUID);
    },
    saveRedirectURIsChanges(context, { applicationUID, redirectURIs }) {
      const promises = [];

      for (let redirectURIObject of redirectURIs) {
        const redirectUid = redirectURIObject.uid;
        const redirectURI = redirectURIObject.redirect_uri;

        if (redirectUid) {
          // if redirect uri has an uid, it already exists server side and must be update
          promises.push(
            octoauthClient.updateAuthorizedRedirectURI(
              applicationUID,
              redirectUid,
              redirectURI
            )
          );
        } else {
          // if redirect uri has no uid, it is a new redirect uri and must be created
          promises.push(
            octoauthClient.addAuthorizedRedirectURI(applicationUID, redirectURI)
          );
        }
      }

      return Promise.all(promises);
    },
  },
};
