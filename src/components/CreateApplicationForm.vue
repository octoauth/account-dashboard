<template>
  <form action="" @submit.prevent="onSubmit()">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        <v-icon style="margin-right: 0.6em">mdi-pencil</v-icon>
        Create Application
      </v-card-title>

      <v-card-text style="margin-top: 2em">
        <div style="display: flex">
          <Icon v-model="application.icon_uri" :editable="true"/>

          <v-text-field
            label="Application name"
            prepend-icon="mdi-label"
            v-model="application.name"
            outlined
            required
          />
        </div>
        
        <v-text-field
          label="Client ID"
          prepend-icon="mdi-identifier"
          v-model="application.client_id"
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
import Icon from '@/components/Icon'

export default {
  components: {Icon},
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
        .then(application=>this.$router.push({name: 'ManageApplication', params: {applicationUID: application.uid}}));
    },
  },
};
</script>
