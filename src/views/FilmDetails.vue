<template>
  <v-card v-if="film">
    <v-card-title>{{ film.name }}</v-card-title>
    <v-card-text>
      {{ film.description }}
    </v-card-text>
    <v-layout wrap class="trailer__container">
      <v-flex md5 class="trailer__text">
        <v-card-title>Жанр</v-card-title>
        <v-card-text dense>
          <span v-for="(genre, genreIndex) in film.genre" :key="genreIndex"
            >{{ genre.name }}; &nbsp; &nbsp;</span
          >
        </v-card-text>
        <v-card-title v-if="film.genre.length < 2">Режиссер</v-card-title>
        <v-card-title v-else>Режиссеры</v-card-title>
        <v-card-text dense>
          <span
            v-for="(director, directorIndex) in film.director"
            :key="directorIndex"
            >{{ director.name }}; &nbsp; &nbsp;</span
          >
        </v-card-text>
        <v-card-title>Год производства</v-card-title>
        <v-card-text> {{ film.year }} </v-card-text>
      </v-flex>
      <v-flex md7 class="trailer__wrapper pa-3 pt-0">
        <v-card-title class="justify-center whiteColor">Трейлер</v-card-title>
        <Media
          :kind="'video'"
          :controls="true"
          :src="film.link"
          :poster="film.poster.file_path"
          :style="{ width: '100%', outline: 'none' }"
        >
        </Media>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Media from "@dongido/vue-viaudio";
export default {
  components: {
    Media,
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
  background: rgb(0, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(23, 23, 23, 1) 33%,
    rgba(54, 53, 53, 1) 65%,
    rgba(41, 41, 41, 1) 79%
  );
}
.trailer__text {
  color: #fff;
}
.whiteColor {
  color: #fff;
}
</style>
