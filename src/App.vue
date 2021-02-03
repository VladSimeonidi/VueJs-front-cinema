<template>
  <div id="app">
    <vue-extend-layouts />
    <notifications position="bottom right" width="400" group="filmError" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VueExtendLayouts from "vue-extend-layout";
export default {
  components: { VueExtendLayouts },
  methods: {
    ...mapActions({
      setProfile: "auth/GET_PROFILE",
    }),
  },
  created() {
    this.setProfile().then((value) => {
      console.log("USER FROM APP");
      console.log(value);
    });
  },
};
</script>
<style lang="scss">
.vue-notification {
  font-size: 18px !important;
}
</style>
