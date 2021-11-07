import axios from "axios";
import settings from "@/settings";

const http = axios.create({
  baseURL: settings.octoauthBaseURL,
});

const accountsMethods = {
  whoami() {
    return new Promise((resolve) => {
      http
        .get(`/api/accounts/whoami`)
        .then((response) => resolve(response.data));
    });
  },
};

const applicationsMethods = {
  getApplicationDetails(applicationUID) {
    return new Promise((resolve) => {
      http
        .get(`/api/oauth2/applications/${applicationUID}`)
        .then((response) => resolve(response.data));
    });
  },
  searchApplications() {
    return new Promise((resolve) => {
      http
        .get("/api/oauth2/applications")
        .then((response) => resolve(response.data));
    });
  },
  createApplication(application) {
    return new Promise((resolve) => {
      http
        .post("/api/oauth2/applications", application)
        .then((response) => resolve(response.data));
    });
  },
  updateApplication(applicationUID, applicationData) {
    return new Promise((resolve) => {
      http
        .put(`/api/oauth2/applications/${applicationUID}`, applicationData)
        .then((response) => resolve(response.data));
    });
  },
  deleteApplication(applicationUID) {
    return new Promise((resolve) => {
      http
        .delete(`/api/oauth2/applications/${applicationUID}`)
        .then((response) => resolve(response.data));
    });
  },
};

const redirectURIsMethods = {
  getAuthorizedRedirectURIs(applicationUID) {
    return new Promise((resolve) => {
      http
        .get(`/api/oauth2/applications/${applicationUID}/redirect_uris`)
        .then((response) => resolve(response.data));
    });
  },
  updateAuthorizedRedirectURI(applicationUID, redirectUid, redirectURI) {
    return new Promise((resolve) => {
      http
        .put(
          `/api/oauth2/applications/${applicationUID}/redirect_uris/${redirectUid}`,
          { redirect_uri: redirectURI }
        )
        .then((response) => resolve(response.data));
    });
  },
  addAuthorizedRedirectURI(applicationUID, redirectURI) {
    return new Promise((resolve) => {
      http
        .post(`/api/oauth2/applications/${applicationUID}/redirect_uris`, {
          redirect_uri: redirectURI,
        })
        .then((response) => resolve(response.data));
    });
  },
};

const sessionsMethods = {
  getSessions() {
    return new Promise((resolve) => {
      http.get("/api/sessions").then((response) => resolve(response.data));
    });
  },
  revokeSession(sessionUID) {
    return new Promise((resolve) => {
      http.post(`/api/sessions/${sessionUID}/revoke`).then(() => resolve());
    });
  },
};

export default {
  ...accountsMethods,
  ...applicationsMethods,
  ...redirectURIsMethods,
  ...sessionsMethods,
};
