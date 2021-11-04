<template>
  <div v-if="application" style="margin-top: 1em">
    <div style="display: flex; align-items: center">
      <img
        :src="application.icon_uri"
        width="80"
        height="80"
        style="margin-right: 1em"
      />
      <div>
        <h3>{{ application.name }}</h3>
        <span>{{ application.client_id.toUpperCase() }}</span>
      </div>
    </div>

    <p style="margin: 1em 0"><strong>Description:</strong> {{ application.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    application: Object,
  },
};
</script>
