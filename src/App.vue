<template>
  <div id="app">
    <vue-extend-layouts />
    <notifications position="bottom right" width="400" group="Notification" />
  </div>
</template>

<script>
import VueExtendLayouts from "vue-extend-layout";
export default {
  components: { VueExtendLayouts },
};
</script>
<style lang="scss">
.vue-notification {
  font-size: 18px !important;
}
</style>
