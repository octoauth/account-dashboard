<template>
  <div style="position: relative; width: 80px; height: 80px">
    <!-- Preview selected profile picture -->
    <img :src="displayedImage" style="max-width: 100%; max-height: 100%" :style="computedStyle" />
    <!-- Button edit profile picture that triggers the dialog -->
    <v-btn
      fab
      v-if="editable"
      x-small
      color="primary"
      style="position: absolute; right: 4px; bottom: 4px"
      @click="dialogOpened = true"
    >
      <v-icon> mdi-camera </v-icon>
    </v-btn>
    
    <!-- Modal used to edit selected image -->
    <v-dialog v-model="dialogOpened" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <v-icon style="margin-right: 0.5em"> mdi-camera </v-icon>
          Select an image
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-radio-group v-model="selectionKind">
              <v-radio
                label="Select an image from your device"
                value="device"
              ></v-radio>
              <v-radio label="Select image from an URL" value="url"></v-radio>
            </v-radio-group>

            <form @submit.prevent="onSubmit()">
              <v-file-input
                v-if="selectionKind === 'device'"
                prepend-icon="mdi-folder"
                label="Click here to select an image from your device"
                truncate-length="15"
                v-model="imageFile"
                required
              ></v-file-input>

              <v-text-field
                v-if="selectionKind === 'url'"
                label="Enter an image URL"
                prepend-icon="mdi-link"
                v-model="editableURL"
                required
              />

              <v-row>
                <v-btn color="red" dark @click="notifyChange(null)">
                  Clear image
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn type="submit" color="primary">continue</v-btn>
              </v-row>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogOpened: false,
      selectionKind: "url",
      editableURL: null,
      imageFile: null
    };
  },
  props: {
    value: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    emptyImage: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
  },
  watch:{
    value(value){
      console.log('value changed', value);
    }
  },
  computed: {
    displayedImage() {
      return !this.value ? this.emptyImage : this.value;
    },
    computedStyle(){
      return this.rounded ? "border-radius: 40px" : "";
    }
  },
  methods: {
    onSubmit() {
      if (this.selectionKind === "url") {
        this.notifyChange(this.editableURL);
      } else if (this.selectionKind == "device") {
        this.$store
          .dispatch("fileserver/uploadImage", this.imageFile)
          .then((response) => this.notifyChange(response.url));
      }
    },
    notifyChange(url) {
      this.selectedURL = url;
      this.dialogOpened = false;
      this.$emit('input', url);
    },
  },
};
</script>
