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
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #272727;
}
</style>
