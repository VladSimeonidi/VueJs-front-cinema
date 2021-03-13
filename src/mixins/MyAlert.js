export default {
  methods: {
    appAlert(group, title, text, type, duration = 5000) {
      this.$notify({ group, title, text, type, duration });
    },
  },
};
