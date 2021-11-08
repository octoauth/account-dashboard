<template>
  <v-container>
    <h2>Browse my applications</h2>
    <p>
        On this page, you can declare and manage your applications that needs to interract with users' <strong color="logo">OctoAuth</strong> accounts.
    </p>
    <v-btn color="primary" @click="openCreateAppDialog()" rounded>
      Declare an application
    </v-btn>
    <applications-panel :applications="applications" />
    <!-- Create application dialog -->
    <v-dialog v-model="createAppDialogOpened" width="500">
      <create-application-form />
    </v-dialog>
  </v-container>
</template>

<script>
import ApplicationsPanel from "@/components/ApplicationsPanel";
import CreateApplicationForm from "@/components/CreateApplicationForm";

export default {
  components: { ApplicationsPanel, CreateApplicationForm },
  data() {
    return {
      // domain variables
      applications: [],
      // state variables
      createAppDialogOpened: false,
    };
  },
  mounted() {
    this.searchMyApplications();
  },
  methods: {
    searchMyApplications() {
      this.$store
        .dispatch("application/getMyApplications")
        .then((applications) => (this.applications = applications));
    },
    openCreateAppDialog() {
      this.createAppDialogOpened = true;
    },
  },
};
</script>
