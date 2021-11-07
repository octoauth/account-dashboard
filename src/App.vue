<template>
  <div>
    <v-app>
      <v-app-bar color="black" clipped-left app>
        <img
          src="@/assets/logo.png"
          style="margin-right: 0.5em"
          width="30"
          height="30"
          alt=""
        />
        <h1 color="logo" style="font-size: 1.3em">OctoAuth</h1>
      </v-app-bar>
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

      <v-content>
        <v-container>
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mini: true,
      items: [
        {
          title: "Account",
          icon: "mdi-account-circle",
          view: "AccountDetails",
        },
        {title: 'Groups', icon: 'mdi-account-group', view: 'Groups'},
        { title: "Security", icon: "mdi-shield", view: "AccountSecurity" },
        {
          title: "My applications",
          icon: "mdi-application-brackets-outline",
          view: "BrowseMyApplications",
        },
      ],
    };
  },
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
