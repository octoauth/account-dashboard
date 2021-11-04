<template>
  <main>
    <h2>Manage application</h2>

    <fieldset class="actions-area" style="border-color: #1976d2">
      <legend style="color: #1976d2">Application info</legend>

        <div style="position: relative">
        <div style="position: absolute; right: 0">
            <v-btn fab color="primary">
            <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab color="primary">
            <v-icon>mdi-content-save</v-icon>
            </v-btn>
        </div>
        <application-info-read :application="application" />
        </div>
    </fieldset>

    <fieldset class="actions-area" style="border-color: green">
        <legend style="color: green">Authorized redirect URIs</legend>
        <v-text-field label="Redirect URI" outlined />
        <a href="http://">ajouter</a>
    </fieldset>
    
    <fieldset class="actions-area" style="border-color: #F44336">
      <legend style="color: #F44336">Danger Zone</legend>
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
          Delete an <span color="logo">OctoAuth</span> client application. Please be sure that you want to delete it as you wont be able to recover deleted applications.
        </p>
        <v-btn color="red" dark @click="deleteApplication()">delete application</v-btn>
      </div>
    </fieldset>

    <div v-if="!application">Application loading</div>
  </main>
</template>

<script>
import ApplicationInfoRead from "@/components/ApplicationInfoRead";

export default {
  components: { ApplicationInfoRead },
  data() {
    return {
      applicationUid: null,
      application: null,
    };
  },
  mounted() {
    this.applicationUid = this.$route.params.applicationUid;
    this.updateApplication();
  },
  methods: {
    updateApplication() {
      console.log(this.applicationUid);
      this.$store
        .dispatch("application/getApplicationDetails", this.applicationUid)
        .then((application) => (this.application = application));
    },
    deleteApplication(){
        this.$store.dispatch('application/deleteApplication', this.applicationUid)
        .then(()=>this.$router.push({name: 'BrowseMyApplications'}));
    }
  },
};
</script>

<style scoped>
fieldset.actions-area{
    padding: 1em;
    border-radius: 5px;
}

fieldset.actions-area:not(:first-child){
    margin-top: 1em;
}

fieldset.actions-area > legend{
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

.action-field p{
    margin-bottom: 0;
}

.action-field .v-btn{
    width: 200px;
    margin-left: 3em;
}
</style>
