<template>
  <v-container>
    <h2>Account details</h2>

    <fieldset class="actions-area">
      <legend>Account personal information</legend>
      <!-- edit personal info toolbar -->
      <v-row style="padding: 0 1em">
        <v-spacer></v-spacer>
        <v-btn
          @click="isAccountInfoEditable = true"
          v-if="!isAccountInfoEditable"
          color="primary"
          fab
          small
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          @click="saveAccountEdition()"
          v-if="isAccountInfoEditable"
          color="primary"
          fab
          small
          style="margin-right: 1em"
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn
          @click="cancelAccountEdition()"
          v-if="isAccountInfoEditable"
          color="red"
          dark
          fab
          small
        >
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
      </v-row>
      <AccountInfo v-model="account" :editable="isAccountInfoEditable" />
    </fieldset>

    <fieldset class="actions-area" style="border-color: red">
      <legend style="color: red">Manage account</legend>
      <div class="action-field">
        <p>Change account password, will also revoke all existing sessions.</p>
        <v-btn color="orange" dark>change password</v-btn>
      </div>
      <div class="action-field">
        <p>
          Delete your account, be careful as deleted account can't be restored.
        </p>
        <v-btn @click="deleteMyAccount()" color="red" dark>
          delete my account
        </v-btn>
      </div>
    </fieldset>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AccountInfo from "@/components/AccountInfo";

export default {
  components: { AccountInfo },
  data() {
    return {
      isAccountInfoEditable: false,
    };
  },
  computed: {
    ...mapState("accounts", ["account"]),
  },
  mounted() {
    this.$store.dispatch("accounts/loadAccount");
  },
  methods: {
    saveAccountEdition() {
      this.isAccountInfoEditable = false;
    },
    cancelAccountEdition() {
      this.isAccountInfoEditable = false;
    },
    deleteMyAccount() {
      /*
          this.$store.dispatch("accounts/deleteMyAccount")
          .then(()=>)
          */
    },
  },
};
</script>
