<template>
  <div>
    <v-main class="Wrapper" v-if="!Loading">
      <v-card-text class="text-center pa-10 header-styling">{{
        Film.name
      }}</v-card-text>
      <v-row class="pb-10" no-gutters>
        <v-col cols="4">
          <v-card-title class="text-h6" v-if="Film.director.length < 2">{{
            $t("filmDetails.director")
          }}</v-card-title>
          <v-card-title class="text-h6" v-else>
            {{ $t("filmDetails.directors") }}
          </v-card-title>

          <v-list-item v-for="(director, index) in Film.director" :key="index">
            <v-list-item-avatar>
              <v-img :alt="`avatar`" :src="director.image"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                class="font-weight-medium"
                v-text="director.name"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="text-center" cols="4">
          <v-card-text class="text-center text-h6">{{
            $t("filmDetails.genre")
          }}</v-card-text>

          <v-list-item v-for="(genre, index) in Film.genre" :key="index">
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-medium"
                v-text="genre.name"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="text-right" cols="4">
          <v-card-text class="text-h6">{{
            $t("filmDetails.year")
          }}</v-card-text>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="font-weight-bold text-h5"
                v-text="Film.year"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-container fluid>
        <v-card elevation="10" class="position-relative">
          <v-card-text class="custom-font-style">
            {{ Film.description }}
          </v-card-text>
        </v-card>
      </v-container>
      <v-container fluid class="text-center mb-10 mt-10">
        <Media
          :kind="'video'"
          :controls="true"
          :src="Film.link"
          :style="{
            outline: 'none',
            boxShadow: '0 0 15px rgba(0,0,0,0.5)',
            width: '55%',
            borderRadius: '10px',
          }"
        >
        </Media
      ></v-container>
    </v-main>
    <v-main v-else>
      loading
    </v-main>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Footer from "@/components/AppFooter.vue";
import Media from "@dongido/vue-viaudio";
export default {
  metaInfo: {
    title: "Film Details",
  },
  data() {
    return {
      Loading: true,
    };
  },
  components: {
    Media,
    Footer,
  },
  computed: {
    ...mapState({
      Film: (state) => state.film.currentItem,
    }),
  },
  methods: {
    ...mapActions({ uploadCurrentItem: "film/SET_CURRENT_ITEM_AS_DETAILS" }),
  },
  mounted() {
    this.uploadCurrentItem(this.$route.params.id)
      .then(() => {
        this.Loading = false;
      })
      .catch((e) => {
        alert(e);
      });
  },
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/marck_scriptregular.css");
.custom-font-style {
  font-family: "marck_scriptregular", cursive;
  font-weight: 500;
  font-size: 1.7rem;
  letter-spacing: 3px;
  line-height: 2rem;
}
.position-relative {
  background-image: url("../assets/images/filmDetails/desc.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
.text-purple-red {
  color: #ff0038;
}
.header-styling {
  // color: #fff;
  font-size: 3rem;
  transform: translateY(0);
  animation: text-down 1s ease-out;
}
@keyframes text-down {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
}
.Wrapper {
  background-image: url("../assets/images/filmDetails/add.svg");
  // background-attachment: fixed;
  background-size: cover;
  min-height: calc(100vh - 106px);
}
.desc-background {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
