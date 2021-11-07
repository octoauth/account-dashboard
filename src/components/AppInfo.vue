<template>
  <div v-if="application" style="margin-top: 1em; display: flex">
    <div v-if="editable" style="flex: 1">
      <v-text-field label="Application name" v-model="application.name" />
      <v-textarea
        label="Application description"
        v-model="application.description"
      />
    </div>

    <div v-if="!editable" style="flex: 1">
      <h3>{{ application.name }}</h3>
      <span>{{ application.client_id.toUpperCase() }}</span>
      <p style="margin: 1em 0">
        <strong>Description:</strong> {{ application.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    application: Object,
    editable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
