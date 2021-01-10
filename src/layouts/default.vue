<template>
  <v-app v-if="user">
    <v-app-bar dense dark app>
      <v-btn title="На главную" :to="{ name: 'home' }" mr-auto icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn title="Фильмы" :to="{ name: 'films' }" icon>
        <v-icon>mdi-movie</v-icon>
      </v-btn>
      <v-btn
        color="cyan lighten-2"
        v-if="user.isAdmin && $route.name != 'editfilm'"
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
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    console.log(this.$route);
    this.GET_PROFILE().then(() => {
      this.user = this.GETUSER();
      console.log("11111");
      console.log(this.GETUSER());
    });
  },
  methods: {
    ...mapGetters("auth", ["GETUSER"]),
    ...mapActions("auth", ["LOGOUT", "GET_PROFILE"]),
    logoutUser() {
      let logout = confirm(
        "Выйти из учетной записи и перейти на страницу логина?"
      );
      if (!logout) return;
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
