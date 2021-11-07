<template>
  <main>
    <h2>Account sessions</h2>

    <p v-if="sessions.length === 0">No sessions opened to your account.</p>

    <v-simple-table v-if="sessions.length > 0">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Browser</th>
            <th class="text-left">Device</th>
            <th class="text-left">IP address</th>
            <th class="text-left">Start date</th>
            <th class="text-left">Expires date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="session in sessions" :key="session.uid">
            <td>{{ session.browser }}</td>
            <td>{{ session.platform }}</td>
            <td>{{ session.ip_address }}</td>
            <td>{{ session.issued_at | datetime }}</td>
            <td>{{ session.expires_at | datetime }}</td>
            <td>
              <v-btn @click="revokeSession(session.uid)" color="red" dark>
                revoke
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </main>
</template>

<script>
export default {
  data() {
    return {
      sessions: [],
    };
  },
  mounted() {
    this.loadSessions();
  },
  methods: {
    loadSessions() {
      this.$store
        .dispatch("sessions/list")
        .then((sessions) => (this.sessions = sessions));
    },
    revokeSession(sessionUID) {
      this.$store
        .dispatch("sessions/revoke", sessionUID)
        .then(() => this.loadSessions());
    },
  },
};
</script>
