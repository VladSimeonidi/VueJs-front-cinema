<template>
  <v-main id="films" v-cloak>
    <v-container grid-list-lg class="container-min-height">
      <v-toolbar
        rounded="lg"
        class="mt-2 mb-3 pr-2"
        height="100%"
        max-height="80px"
        width="100%"
        ><v-text-field
          @keydown.enter="searchByName"
          :label="$t('films.search')"
          v-model="Search"
          clearable
        ></v-text-field
        ><v-btn large class="mb-5" @click="searchByName" icon
          ><v-icon>mdi-magnify</v-icon></v-btn
        ></v-toolbar
      >
      <v-expansion-panels
        focusable
        @change="resetSearchValues"
        class="mb-7"
        v-model="panel"
        dark
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template>
              <v-row no-gutters>
                <v-col cols="12">
                  {{ $t("films.extendedSearch") }}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters>
              <v-col class="d-flex" sm="3" xs="12">
                <v-select
                  clearable
                  :items="AllGenres"
                  item-text="name"
                  chips
                  small-chips
                  v-model="Genres"
                  multiple
                  :label="$t('films.chooseGenre')"
                  color="black"
                  prepend-icon="mdi-filmstrip"
                  return-object
                ></v-select>
              </v-col>
              <v-col class="d-flex ml-2" sm="3" xs="12">
                <v-select
                  clearable
                  prepend-icon="mdi-account"
                  v-model="CompDirectors"
                  color="black"
                  :items="AllDirectors"
                  small-chips
                  item-text="name"
                  chips
                  multiple
                  :label="$t('films.chooseDirector')"
                  return-object
                ></v-select
              ></v-col>
              <v-col class="d-flex ml-2 align-center" sm="5" xs="12">
                <v-range-slider
                  hide-details
                  dense
                  :label="$t('films.chooseYear')"
                  v-model="rangeYear"
                  max="2021"
                  min="1950"
                  thumb-label="always"
                  thumb-color="grey"
                  @mouseup="rangeValue"
                ></v-range-slider>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-layout row wrap v-if="FilmLsit && FilmLsitTotal" v-cloak>
        <v-flex
          v-for="(film, index) in FilmLsit"
          :key="index"
          class="align-start"
          xs12
          sm6
          md4
        >
          <v-card
            @click="goToFilmDetails(film._id)"
            shaped
            class="text-center grow pt-5 hoverEffect"
            min-height="420px"
          >
            <img
              v-if="film.poster"
              class="palyer__img"
              :src="film.poster.file_path"
              alt=""
            />
            <div class="player__title">
              {{ film.name }}
              <v-btn
                color="blue"
                v-if="admin"
                icon
                :to="{ name: 'editfilm', params: { id: film._id } }"
                ><v-icon large>mdi-pencil-circle</v-icon></v-btn
              >
            </div>
            <v-card-subtitle class="subtitle-2">{{
              film.teaser
            }}</v-card-subtitle>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row v-else-if="FilmLsitTotal === 0" class="vElseContainer">
        <v-flex>
          <v-card
            class="d-flex justify-center align-center"
            width="100%"
            height="100%"
            >Нет фильмов</v-card
          ></v-flex
        >
      </v-layout>
      <v-layout v-else-if="FilmLsitTotal === null" class="vElseContainer">
        <v-flex>
          <v-card
            class="d-flex justify-center align-center"
            width="100%"
            height="100%"
            >Ждем-c</v-card
          ></v-flex
        >
      </v-layout>
      <v-card-actions class="mb-5 justify-center">
        <v-pagination
          v-if="FilmLsitTotal"
          color="light-blue darken-2"
          circle
          light
          total-visible="10"
          v-model="currentSelectedPage"
          :length="PaginatonCounter"
        ></v-pagination>
      </v-card-actions>
    </v-container>

    <Footer />
  </v-main>
</template>
<script>
import Footer from "@/components/AppFooter.vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  metaInfo: {
    title: "Films",
  },
  data() {
    return {
      panel: null,
      range: [1950, 2021],
      setRange: null,
      searchText: "",
      admin: null,
      pageSet: {
        pageNumber: 1,
        pageSize: 9,
        range: [1950, 2021],
        search: "",
        directors: [],
        genres: [],
      },
      paginatonsCounter: null,
    };
  },
  components: { Footer },
  computed: {
    ...mapGetters({
      PaginatonCounter: "film/paginatonsCounter",
    }),
    ...mapState({
      FilmLsitTotal: (state) => state.film.listTotal,
      FilmLsit: (state) => state.film.list,
      AllGenres: (state) => state.genre.list,
      AllDirectors: (state) => state.director.list,
    }),
    currentSelectedPage: {
      get() {
        return this.$store.state.film.pageSet.pageNumber;
      },
      set(value) {
        this.setPageSetPageNumber(value);
      },
    },
    rangeYear: {
      get() {
        return this.$store.state.film.pageSet.range;
      },
      set(value) {
        this.setPageSetPageNumber(1);
        this.setRange = value;
      },
    },
    Genres: {
      get() {
        return this.$store.state.film.pageSet.genres;
      },
      set(value) {
        this.setPageSetPageNumber(1);
        this.setPageSetGenre(value);
      },
    },
    CompDirectors: {
      get() {
        return this.$store.state.film.pageSet.director;
      },
      set(value) {
        this.setPageSetPageNumber(1);
        this.setPageSetDirectors(value);
      },
    },
    Search: {
      get() {
        return this.$store.state.film.pageSet.search;
      },
      set(value) {
        this.setPageSetPageNumber(1);
        this.searchText = value;
      },
    },
  },
  methods: {
    ...mapActions({
      uploadGenresList: "genre/SET_LIST",
      loadFilmsList: "film/SET_LIST",
      setListOfDirectors: "director/SET_LIST",
      getProfile: "auth/GET_PROFILE",
    }),
    ...mapMutations({
      setPageSetPageNumber: "film/SET_PAGESET_PAGE_NUMBER",
      setPageSetRangeYear: "film/SET_PAGESET_YEAR_RANGE",
      setPageSetGenre: "film/SET_PAGESET_GENRES",
      setPageSetDirectors: "film/SET_PAGESET_DIRECTORS",
      setPageSetSearch: "film/SET_PAGESET_SEARCH",
    }),
    goToFilmDetails(ID) {
      this.$router.push({ name: "filmditails", params: { id: ID } });
    },
    rangeValue() {
      this.setPageSetRangeYear(this.setRange);
    },
    searchByName() {
      this.setPageSetSearch(this.searchText);
    },
    resetSearchValues() {
      if (this.panel === undefined) {
        console.log("PANEL CLOSED");
        console.log(this.$store.state.film.pageSet);
        console.log("Genres", this.Genres);
      }
    },
  },
  mounted() {
    (this.unwatch = this.$store.watch(
      (state) => state.film.pageSet,
      () => {
        console.log("changed");
        this.loadFilmsList();
      },
      {
        deep: true,
      }
    )),
      Promise.all([
        this.getProfile(),
        this.loadFilmsList(),
        this.uploadGenresList(),
        this.setListOfDirectors(),
      ])
        .then((response) => {
          const [profile] = response;
          this.user = profile.user;
          this.admin = profile.admin;
          this.Loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
  },
  beforeDestroy() {
    this.unwatch();
  },
};
</script>
<style scoped lang="scss">
[v-cloak] {
  display: none;
}
.button:focus {
  outline: none !important;
}
.container-min-height {
  min-height: 100vh;
}
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
.player__title {
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
  font-family: "Russo One", sans-serif;
}
.palyer__img {
  width: 100%;
  height: 100%;
  max-width: 340px;
  max-height: 200px;
  border-radius: 15px 0 15px 0;
}
.grow:hover {
  transform: scale(1.03);
}
#films {
  background-color: #ffffff;
  background-image: url("../assets/images/films/Wintery-Sunburst.svg");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
.vElseContainer {
  min-height: 200px;
  font-weight: bold;
  font-family: "Russo One", sans-serif;
  font-size: 2vw;
}
</style>
