<template>
  <div id="app">
    <vue-extend-layouts />
    <notifications position="bottom right" width="400" group="filmError" />
    <notifications position="bottom right" width="400" group="AuthError" />
    <notifications position="bottom right" width="400" group="UserEditError" />
    <notifications
      position="bottom right"
      width="400"
      group="FilmSaveEditSuccess"
    />
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
};
</script>
<style lang="scss">
.vue-notification {
  font-size: 18px !important;
}
</style>
