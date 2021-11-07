<template>
  <main>
    <h2>Manage application</h2>

    <fieldset class="actions-area">
      <!-- style="border-color: #1976d2">-->
      <legend>Application info</legend>

      <v-row style="padding-right: 1em">
        <v-spacer></v-spacer>
        <v-btn
          title="save"
          v-if="isAppInfoEditable"
          color="primary"
          fab
          small
          @click="saveApplicationChanges()"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn
          title="cancel"
          v-if="isAppInfoEditable"
          color="red"
          dark
          fab
          small
          @click="cancelApplicationChanges()"
          style="margin-left: 1em"
        >
          <v-icon>mdi-cancel</v-icon>
        </v-btn>

        <v-btn
          title="edit"
          v-if="!isAppInfoEditable"
          color="primary"
          fab
          small
          @click="isAppInfoEditable = true"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-row>

      <div style="display: flex" v-if="application">
        <Icon
          v-model="application.icon_uri"
          style="margin-right: 2em"
          :editable="isAppInfoEditable"
        />
        <AppInfo
          :application="application"
          :editable="isAppInfoEditable"
          style="flex: 1"
        />
      </div>
    </fieldset>

    <fieldset class="actions-area">
      <legend>Authorized redirect URIs</legend>
      <EditAuthorizedRedirections
        :value="authorizedRedirectURIs"
        @change="saveRedirectURIs($event)"
      />
    </fieldset>

    <fieldset class="actions-area" style="border-color: #f44336">
      <legend style="color: #f44336">Danger Zone</legend>
      <div class="action-field">
        <p>
          Be careful as new client secret will override previous client secret.
          Applications that might already use it won't be able to authenticate
          through <span color="logo">OctoAuth</span> server
        </p>
        <v-btn color="orange" dark>new client secret</v-btn>
      </div>

      <div class="action-field">
        <p>
          Delete an <span color="logo">OctoAuth</span> client application.
          Please be sure that you want to delete it as you wont be able to
          recover deleted applications.
        </p>
        <v-btn color="red" dark @click="deleteApplication()">
          delete application
        </v-btn>
      </div>
    </fieldset>

    <div v-if="!application">Application loading</div>
  </main>
</template>

<script>
import Icon from "@/components/Icon";
import AppInfo from "@/components/AppInfo";
import EditAuthorizedRedirections from "@/components/EditAuthorizedRedirections";

export default {
  components: { Icon, AppInfo, EditAuthorizedRedirections },
  data() {
    return {
      applicationUID: null,
      application: null,
      authorizedRedirectURIs: [],
      //
      isAppInfoEditable: false,
    };
  },
  mounted() {
    this.applicationUID = this.$route.params.applicationUID;
    this.updateApplication();
    this.updateRedirectURIs();
  },
  methods: {
    updateApplication() {
      console.log(this.applicationUID);
      this.$store
        .dispatch("application/getApplicationDetails", this.applicationUID)
        .then((application) => (this.application = application));
    },
    deleteApplication() {
      this.$store
        .dispatch("application/deleteApplication", this.applicationUID)
        .then(() => this.$router.push({ name: "BrowseMyApplications" }));
    },
    saveApplicationChanges() {
      this.isAppInfoEditable = false;
      // send update request to the server
      this.$store
        .dispatch("application/updateApplication", this.application)
        .then(() => {
          // reload application to ensure changes are properly reflected server-side
          this.updateApplication();
        });
    },
    cancelApplicationChanges() {
      (this.isAppInfoEditable = false),
        // don't save and reload application
        this.updateApplication();
    },
    updateRedirectURIs() {
      this.$store
        .dispatch("application/getAuthorizedRedirectURIs", this.applicationUID)
        .then((redirectURIs) => (this.authorizedRedirectURIs = redirectURIs));
    },
    saveRedirectURIs(redirectURIs) {
      this.$store
        .dispatch("application/saveRedirectURIsChanges", {
          applicationUID: this.applicationUID,
          redirectURIs,
        })
        .then(() => this.updateRedirectURIs());
    },
  },
};
</script>

<style scoped>
fieldset.actions-area {
  padding: 1em;
  border-radius: 5px;
}

fieldset.actions-area:not(:first-child) {
  margin-top: 1em;
}

fieldset.actions-area > legend {
  margin-left: 2em;
  padding: 0 5px;
  font-weight: bold;
}

.action-field {
  display: flex;
  align-items: center;
  padding: 0.7em;
  justify-content: space-between;
}

.action-field p {
  margin-bottom: 0;
}

.action-field .v-btn {
  width: 200px;
  margin-left: 3em;
}
</style>
