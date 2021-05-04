export default {
  methods: {
    appAlert(title, text, type, duration = 5000) {
      this.$notify({ group: "Notification", title, text, type, duration });
    },
  },
};
