<template>
  <v-app v-if="user">
    <v-app-bar dense dark app>
      <myLocale class="langSelect" />
      <v-spacer></v-spacer>
      <v-btn title="Фильмы" :to="{ name: 'films' }" icon>
        <v-icon>mdi-movie</v-icon>
      </v-btn>
      <v-btn
        color="cyan lighten-2"
        v-if="admin && $route.name != 'editfilm'"
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
    <v-alert
      v-model="alert"
      border="left"
      close-text="закрыть"
      class="pos-abs"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      Вы администратор, но зашли как обычный пользователь
    </v-alert>
    <vue-page-transition name="fade">
      <router-view></router-view>
    </vue-page-transition>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import myLocale from "@/components/AppLocale.vue";
export default {
  data() {
    return {
      alert: false,
      user: null,
      admin: null,
    };
  },
  components: { myLocale },
  created() {
    this.GET_PROFILE().then((res) => {
      this.user = res.user;
      this.admin = res.admin;
      if (!this.admin && this.user.isAdmin) this.alert = true;
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
.pos-abs {
  position: fixed;
  top: 60px;
  z-index: 100;
  left: 50%;
  transform: translate(-50%);
}
.langSelect {
  width: 135px;
}
</style>
