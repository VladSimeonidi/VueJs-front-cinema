<template>
  <v-card v-if="film">
    <v-sheet color="blue accent-2" class="text-center">
      <v-row class="text-lg-h6 white--text">
        <v-col> {{ $t("filmDetails.genre") }}</v-col>
        <v-col
          ><span v-if="film.director.length < 2">{{
            $t("filmDetails.director")
          }}</span>
          <span v-else>{{ $t("filmDetails.directors") }}</span></v-col
        >
        <v-col>{{ $t("filmDetails.year") }}</v-col>
      </v-row>
      <v-row class="text-lg-subtitle-1 white--text">
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
    </v-sheet>
    <v-card-title>{{ film.name }}</v-card-title>
    <v-card-text>
      {{ film.description }}
    </v-card-text>
    <v-sheet min-height="100vh" color="blue accent-2" class="pb-10">
      <v-card-title class="white--text">{{
        $t("filmDetails.trailer")
      }}</v-card-title>
      <v-card-text class="text-center">
        <Media
          :kind="'video'"
          :controls="true"
          :src="film.link"
          :poster="film.poster.file_path"
          :style="{
            width: '70%',
            outline: 'none',
            boxShadow: '0 0 15px rgba(0,0,0,0.5)',
            borderRadius: '10px',
          }"
        >
        </Media>
      </v-card-text>
    </v-sheet>
    <Footer />
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Footer from "@/components/AppFooter.vue";
import Media from "@dongido/vue-viaudio";
export default {
  metaInfo: {
    title: "Film Details",
  },
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
    this.SET_CURRENT_ITEM_AS_DETAILS(this.$route.params.id)
      .then(() => {
        this.film = this.GET_CURRENT_ITEM();
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
