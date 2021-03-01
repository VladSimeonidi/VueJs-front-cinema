<template>
  <div>
    <v-select
      dense
      solo
      :items="locales"
      class="ml-2"
      hide-details
      v-model="currentLocale"
      return-object
    >
      <template v-slot:selection="{ item }">
        <flag :iso="item.flag" />
        <span class="ml-2">{{ item.name }}</span>
      </template>
      <template v-slot:item="{ item }">
        <flag :iso="item.flag" />
        <span class="ml-2"> {{ item.name }}</span>
      </template>
    </v-select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      locales: this.getAllLocales(),
    };
  },
  methods: {
    ...mapGetters({
      getAllLocales: "locale/GET_LOCALES",
      getCurrentLocale: "locale/GET_CURRENT_LOCALE",
    }),
    ...mapMutations({
      setCurrentLocale: "locale/SET_CURRENT_LOCALE",
    }),
  },
  computed: {
    currentLocale: {
      get() {
        // console.log("from computed");
        // console.log(this.getCurrentLocale());
        // console.log("from computed");
        return this.getCurrentLocale();
      },
      set(value) {
        this.$i18n.locale = value.flag;
        this.setCurrentLocale(value);
      },
    },
  },
};
</script>
