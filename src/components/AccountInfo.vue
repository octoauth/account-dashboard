<template>
  <main v-if="account">
    <!-- read personal info -->
    <div style="display: flex">
      <Icon v-model="account.profile_url" :editable="editable" rounded />
      <v-simple-table style="flex: 1; margin: 0 4em" v-if="!editable">
        <template v-slot:default>
          <tbody>
            <tr>
              <th>Username</th>
              <td>{{ account.username }}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{{ account.email }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </main>
</template>

<script>
import Icon from "@/components/Icon";

export default {
  components: { Icon },
  data() {
    return { account: null };
  },
  props: {
    value: Object,
    editable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(account) {
      this.account = account;
    },
  },
};
</script>
