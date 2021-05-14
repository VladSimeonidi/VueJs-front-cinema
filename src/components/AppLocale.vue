<template>
  <div>
    <v-select
      dense
      solo
      :items="AllLocales"
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
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      AllLocales: (state) => state.locale.locales,
    }),
    ...mapGetters({
      getCurrentLocale: "locale/GET_CURRENT_LOCALE",
    }),
    currentLocale: {
      get() {
        return this.getCurrentLocale;
      },
      set(value) {
        this.$i18n.locale = value.flag;
        this.setCurrentLocale(value);
      },
    },
  },
  methods: {
    ...mapMutations({
      setCurrentLocale: "locale/SET_CURRENT_LOCALE",
    }),
  },
};
</script>
