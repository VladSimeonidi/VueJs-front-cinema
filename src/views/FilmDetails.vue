<template>
  <v-card v-if="film">
    <v-card-title>{{ film.name }}</v-card-title>
    <v-card-text>
      {{ film.description }}
    </v-card-text>
    <v-container fluid class="text-center myBackgroundBrown">
      <v-row>
        <v-col> {{ $t("filmDetails.genre") }}</v-col>
        <v-col
          ><span v-if="film.director.length < 2">{{
            $t("filmDetails.director")
          }}</span>
          <span v-else>{{ $t("filmDetails.directors") }}</span></v-col
        >
        <v-col>{{ $t("filmDetails.year") }}</v-col>
      </v-row>
      <v-row>
        <v-col
          ><span v-for="(genre, genreIndex) in film.genre" :key="genreIndex"
            >{{ genre.name }} &nbsp; &nbsp;</span
          ></v-col
        >
        <v-col
          ><span
            v-for="(director, directorIndex) in film.director"
            :key="directorIndex"
            >{{ director.name }} &nbsp; &nbsp;</span
          ></v-col
        >
        <v-col>{{ film.year }}</v-col>
      </v-row>
    </v-container>
    <v-card-title>{{ $t("filmDetails.trailer") }}</v-card-title>
    <v-card-text class="text-center">
      <Media
        :kind="'video'"
        :controls="true"
        :src="film.link"
        :poster="film.poster.file_path"
        :style="{ width: '70%', outline: 'none' }"
      >
      </Media>
    </v-card-text>
    <Footer />
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Footer from "@/components/AppFooter.vue";
import Media from "@dongido/vue-viaudio";
export default {
  components: {
    Media,
    Footer,
  },
  data() {
    return {
      film: null,
    };
  },
  created() {
    console.log(this.film);
    this.SET_CURRENT_ITEM_AS_DETAILS(this.$route.params.id)
      .then(() => {
        this.film = this.GET_CURRENT_ITEM();
        console.log(this.film);
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    ...mapGetters("film", ["GET_CURRENT_ITEM"]),
    ...mapActions("film", ["SET_CURRENT_ITEM_AS_DETAILS"]),
  },
};
</script>

<style scoped lang="scss">
.trailer__container {
  background-color: #b0bec5;
}
.trailer__text {
  color: #fff;
}
.whiteColor {
  color: #fff;
}
.myBackgroundBrown {
  background-color: brown;
}
</style>
