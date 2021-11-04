<template>
  <form action="" @submit.prevent="onSubmit()">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        <v-icon style="margin-right: 0.6em">mdi-pencil</v-icon>
        Create Application
      </v-card-title>

      <v-card-text style="margin-top: 2em">
        <v-text-field
          label="Client ID"
          prepend-icon="mdi-identifier"
          v-model="application.client_id"
          outlined
          required
        />
        <v-text-field
          label="Application name"
          prepend-icon="mdi-label"
          v-model="application.name"
          outlined
          required
        />
        <v-file-input
          label="Application icon"
          prepend-icon="mdi-image-search"
          append-icon="mdi-paperclip"
          @change="uploadImage()"
          outlined
          required
        />
        <v-textarea
          label="Application description"
          prepend-icon="mdi-text-long"
          v-model="application.description"
          outlined
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit"> Create application </v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
export default {
  data() {
    return {
      application: {
        name: null,
        client_id: null,
        icon_uri: null,
        description: null,
      },
    };
  },
  methods: {
    onSubmit() {
        this.$store.dispatch('application/createApplication', this.application)
        .then(application=>this.$router.push({name: 'ManageApplication', params: {applicationUid: application.uid}}));
    },
    uploadImage() {
      const inputFile = document.querySelector("input[type=file]");
      this.$store
        .dispatch("cdn/uploadFile", inputFile.files[0])
        .then((response) => (this.application.icon_uri = response.file_url));
    },
  },
};
</script>
