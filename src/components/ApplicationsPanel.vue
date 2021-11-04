<template>
  <div style="display: flex; justify-content: left; flex-wrap: wrap; margin: 2em 0">
    <v-card
      style="margin-right: 1em"
      max-width="344"
      outlined
      v-for="application in applications"
      :key="application.uid"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">{{ application.client_id }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ application.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ application.description }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80">
          <img :src="application.icon_uri" alt="">
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text color="accent" :to="{name: 'ManageApplication', params: {applicationUid: application.uid}}"> manage </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    applications: Array,
  },
};
</script>
