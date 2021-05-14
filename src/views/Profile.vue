<template>
  <v-main>
    <v-container
      fluid
      v-if="user"
      class="d-flex justify-center align-center myAquaBackGround"
    >
      <AppProfileBar v-if="admin" />
      <v-card
        class="myCardStyles positionRelative rounded-xl"
        width="100%"
        min-height="60vh"
        max-width="700px"
        min-width="300px"
        outlined
      >
        <div
          class="myCircle myCircle_top d-none d-md-block d-lg-block d-xl-block"
        ></div>
        <div
          class="myCircle myCircle_bottom d-none d-md-block d-lg-block d-xl-block"
        ></div>
        <v-card-title v-if="admin">
          <vue-typer
            text="Профиль пользователя (Администратор)"
            :repeat="0"
          ></vue-typer>
        </v-card-title>
        <v-card-title v-else>Профиль пользователя</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.name"
            readonly
            label="Ф.И.О"
          ></v-text-field>

          <v-text-field
            v-model="user.username"
            readonly
            label="Логин"
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            readonly
            label="Электронная почта"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            class="pr-6 pl-6"
            rounded
            color="cyan lighten-1"
            dark
            @click="$router.go(-1)"
            >Назад</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import AppProfileBar from "@/components/AppProfileBar.vue";
import { mapActions } from "vuex";
export default {
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {
      user: null,
      admin: null,
    };
  },
  components: {
    AppProfileBar,
  },
  methods: {
    ...mapActions("auth", ["GET_PROFILE"]),
  },
  created() {
    this.GET_PROFILE().then((res) => {
      this.user = res.user;
      this.admin = res.admin;
    });
  },
};
</script>

<style lang="scss" scoped>
.myAquaBackGround {
  background: linear-gradient(to right top, #65dfc9, #6cdbeb);
  min-height: calc(100vh - 48px);
}
.positionRelative {
  position: relative;
  z-index: 1;
}
.appBarZIndex {
  z-index: 1000;
}
.myCardStyles {
  background: white !important;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  ) !important;
}
.myCircle {
  z-index: -1;
  background: white;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.1)
  );
  width: 12rem;
  height: 12rem;
  position: absolute;
  &_top {
    top: -65px;
    right: -65px;
    border-radius: 50% !important;
  }
  &_bottom {
    bottom: -65px;
    left: -65px;
    border-radius: 50% !important;
  }
}
</style>
