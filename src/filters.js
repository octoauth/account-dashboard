import Vue from "vue";

Vue.filter("datetime", function (datestring) {
  if (!datestring) return "";
  const date = new Date(datestring);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
});
