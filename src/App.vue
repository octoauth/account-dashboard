<template>
  <div>
    <v-app>
      <!-- main navigation (top) -->
      <v-app-bar color="black" clipped-left app>
        <img
          src="@/assets/logo.png"
          style="margin-right: 0.5em"
          width="30"
          height="30"
          alt=""
        />
        <h1 color="logo" style="font-size: 1.3em">OctoAuth</h1>
        <v-spacer></v-spacer>
        <v-btn text dark @click="logout()">
          <v-icon>mdi-power</v-icon> Logout
        </v-btn>
      </v-app-bar>

      <!-- Side menu -->
      <v-navigation-drawer app permanent clipped>
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="{ name: item.view }"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Content of views is injected here -->
      <v-content>
        <v-container>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import settings from '@/settings'

export default {
  data() {
    return {
      mini: true,
      items: [
        {
          title: "Account info",
          icon: "mdi-card-account-details-outline",
          view: "AccountDetails",
        },
        {title: 'My groups', icon: 'mdi-account-group', view: 'Groups'},
        { title: "Account security", icon: "mdi-shield", view: "AccountSecurity" },
        {
          title: "Developers console",
          icon: "mdi-application-brackets-outline",
          view: "BrowseMyApplications",
        },
      ],
    };
  },
  methods: {
    logout(){
      window.location.href = settings.octoauthBaseURL + '/logout';
    }
  }
};
</script>

<style>
*[color="logo"] {
  background: -webkit-linear-gradient(
    45deg,
    #1976d2,
    #1976d2,
    #1976d2,
    #e91e63,
    #e91e63,
    #e91e63
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>


<style>
fieldset.actions-area {
  padding: 1em;
  border-radius: 5px;
}

fieldset.actions-area:not(:first-child) {
  margin-top: 1em;
}

fieldset.actions-area > legend {
  margin-left: 2em;
  padding: 0 5px;
  font-weight: bold;
}

.action-field {
  display: flex;
  align-items: center;
  padding: 0.7em;
  justify-content: space-between;
}

.action-field p {
  margin-bottom: 0;
}

.action-field .v-btn {
  width: 200px;
  margin-left: 3em;
}
</style>
