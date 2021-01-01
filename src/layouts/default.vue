<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark app>
      <v-btn title="На главную" :to="{ name: 'home' }" mr-auto icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn title="Фильмы" :to="{ name: 'films' }" icon>
        <v-icon>mdi-movie</v-icon>
      </v-btn>
      <v-btn
        v-if="GETUSER.isAdmin"
        title="Добавить фильм"
        :to="{ name: 'editfilm', params: { id: 'new' } }"
        icon
      >
        <v-icon>mdi-library-plus</v-icon>
      </v-btn>
      <v-btn title="Профиль" :to="{ name: 'profile' }" icon>
        <v-icon>mdi-face</v-icon>
      </v-btn>
      <v-btn title="Logout" @click="logoutUser" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view class="margin_top"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters("auth", ["GETUSER"]),

  created() {
    this.GET_PROFILE();
  },
  methods: {
    ...mapActions("auth", ["LOGOUT", "GET_PROFILE"]),
    logoutUser() {
      this.LOGOUT();
    },
  },
};
</script>
<style lang="scss">
.margin_top {
  margin-top: 48px;
}
</style>
