<template>
  <v-app>
    <v-container fluid class="form__wrapper d-flex justify-center align-center">
      <myLocale class="myAbsolute langSelect" />
      <v-sheet
        rounded="lg"
        elevation="24"
        max-width="60%"
        min-width="280px"
        width="100%"
        :height="height"
        class="d-flex"
      >
        <v-flex sm6 md6 class="d-none d-md-flex form__flyer">
          <v-carousel
            hide-delimiter-background
            cycle
            :show-arrows="false"
            height="100%"
          >
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-card color="rgb(255, 0, 0, 0)" tile flat height="100%">
                <v-card-title class="mt-10">{{ item.text }}</v-card-title>
                <v-card-text
                  ><v-img
                    alt="carousel"
                    max-height="300px"
                    height="100%"
                    contain
                    :src="item.src"
                /></v-card-text>
              </v-card>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex sm12 md6 xs12>
          <v-card
            dark
            class="form__card"
            tile
            flat
            height="100%"
            min-width="280px"
            width="100%"
          >
            <v-card-title class="mb-4">
              <router-link to="/about"
                ><v-img
                  max-height="24px"
                  max-width="24px"
                  class="animated-question-mark"
                  alt="about"
                  src="../assets/images/about/help_outline-24px.svg"
                ></v-img
              ></router-link>
              <v-spacer></v-spacer>
              <router-link
                :to="{ name: 'login' }"
                class="chip chip_border-radius-left"
                :class="{ chip_active: $route.name === 'login' }"
                >{{ $t("authLayout.login") }}</router-link
              ><router-link
                :to="{ name: 'register' }"
                class="chip chip_border-radius-right"
                :class="{ chip_active: $route.name === 'register' }"
                >{{ $t("authLayout.register") }}</router-link
              ></v-card-title
            >
            <router-view
          /></v-card>
        </v-flex>
      </v-sheet>
    </v-container>
  </v-app>
</template>

<script>
import myLocale from "@/components/AppLocale.vue";
export default {
  name: "authlayout",
  data() {
    return {
      items: [
        {
          text: "Не знаешь какой фильм посмотреть?",
          src: require("@/assets/images/vuetifyswiper/lost.svg"),
        },
        {
          text: "Тут 'много' фильмов",
          src: require("@/assets/images/vuetifyswiper/search.svg"),
        },
        {
          text: "Выбирай!",
          src: require("@/assets/images/vuetifyswiper/choose.svg"),
        },
        {
          text: "Смотри!",
          src: require("@/assets/images/vuetifyswiper/movie.svg"),
        },
      ],
    };
  },
  components: { myLocale },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 550;
        case "sm":
          return 550;
        case "md":
          return 550;
        case "lg":
          return 550;
        case "xl":
          return "70vh";
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
.myAbsolute {
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 10px;
}
.form {
  &__wrapper {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(
      315deg,
      rgba(202, 102, 121, 1) 0%,
      rgba(156, 59, 87, 1) 100%
    );
  }
  &__card {
    background: linear-gradient(
      315deg,
      rgba(34, 46, 63, 1) 0%,
      rgba(57, 76, 99, 1) 100%
    );
    position: relative;
  }
  &__flyer {
    background: rgb(109, 223, 202);
    background: linear-gradient(
      315deg,
      rgba(109, 223, 202, 1) 0%,
      rgba(109, 223, 202, 1) 49%,
      rgba(109, 223, 202, 1) 100%
    );
  }
}
.chip {
  color: #fff !important;
  text-decoration: none;
  font-size: 12px;
  background: #4c5c72;
  padding: 0 12px;
  &_border-radius-left {
    border-radius: 10px 0 0 10px;
  }
  &_border-radius-right {
    border-radius: 0 10px 10px 0;
  }
  &_active {
    background-color: #00e5ff;
  }
}
.langSelect {
  width: 135px;
}
.animated-question-mark {
  cursor: pointer;
  animation: animated-question-mark 1.5s ease-in-out infinite;
}
@keyframes animated-question-mark {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
