<template>
  <v-app v-if="user">
    <v-app-bar dense dark app>
      <myLocale class="langSelect" />
      <v-spacer></v-spacer>
      <v-btn
        @click="resetFilmStoreState"
        title="Фильмы"
        :to="{ name: 'films' }"
        icon
      >
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
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions({
      Logout: "auth/LOGOUT",
      GetProfile: "auth/GET_PROFILE",
      reserFilmState: "film/RESET_STATE",
    }),
    async logoutUser() {
      const res = await this.$confirm(
        "Выйти из учетной записи и перейти на страницу логина?",
        {
          title: "Выйти",
          color: "primary",
          buttonTrueText: "Покинуть",
          buttonFalseText: "Нет",
          icon: "mdi-logout",
        }
      );
      if (res) {
        this.Logout();
      } else {
        return;
      }
    },
    resetFilmStoreState() {
      this.reserFilmState();
    },
  },
  created() {
    this.GetProfile().then((res) => {
      this.user = res.user;
      this.admin = res.admin;
      if (!this.admin && this.user.isAdmin) this.alert = true;
    });
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
