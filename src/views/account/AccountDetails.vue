<template>
  <main>
    <h2>Account details</h2>
    <Icon v-model="account.profile_url" rounded/>

    {{ account }}
  </main>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon";

export default {
  components: { Icon },
  computed: {
    ...mapState("accounts", ["account"]),
  },
  mounted() {
    this.$store.dispatch("accounts/loadAccount");
  },
};
</script>
