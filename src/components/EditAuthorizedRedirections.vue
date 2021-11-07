<template>
  <form @submit.prevent="notifyChanges()">
    <!-- actions bar -->
    <v-row style="padding-right: 1em">
      <v-spacer></v-spacer>
      <v-btn color="accent" fab small @click="addRedirectURI()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-if="changesIndex.length > 0" style="margin-left: 1em" fab small type="submit" color="primary">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn v-if="changesIndex.length > 0" style="margin-left: 1em" fab small type="submit" color="red" dark>
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
    </v-row>

    <v-container>
      <!-- container for form fields -->
      <div v-if="redirectURIs.length > 0">
        <v-text-field
          v-for="(_, index) in redirectURIs"
          :key="index"
          v-model="redirectURIs[index].redirect_uri"
          label="Authorized redirect URI"
          prepend-icon="mdi-web-check"
          type="url"
          @input="storeRedirectURIChange(index)"
          required
        />
      </div>
      <!-- message to indicate that no redirect_uri is configured  -->
      <div v-if="redirectURIs.length === 0">
        <p>No authorized redirect URIs set for now</p>
      </div>
    </v-container>
  </form>
</template>

<script>
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export default {
  data() {
    return {
      redirectURIs: [],
      changesIndex: [],
    };
  },
  computed: {
    changes() {
      let changed = [];
      for (let k = 0; k < this.redirectURIs.length; k++) {
        if (this.changesIndex.includes(k)) {
          changed.push(this.redirectURIs[k]);
        }
      }
      return changed;
    },
  },
  props: {
    value: Array,
  },
  watch: {
    value(value) {
      this.redirectURIs = value;
      this.changesIndex = [];
    },
  },
  methods: {
    addRedirectURI() {
      const newRedirectURI = { uid: null, redirect_uri: "" };
      this.redirectURIs.push(newRedirectURI);
      this.changesIndex.push(this.redirectURIs.length - 1);
    },
    storeRedirectURIChange(index) {
      if (!this.changesIndex.includes(index)) {
        this.changesIndex.push(index);
      }
    },
    validateInputData() {
      if (this.changesIndex.length > 0) {
        for (let redirectURI of this.changes) {
          if (!isValidURL(redirectURI.redirect_uri)) {
            return false;
          }
        }
        return true;
      }
      return false;
    },
    notifyChanges() {
      if (!this.validateInputData()) {
        alert("form is not valid");
        return;
      }
      this.$emit('change', this.changes);
    },
  },
};
</script>
