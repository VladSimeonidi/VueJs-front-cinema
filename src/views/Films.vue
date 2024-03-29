<template>
  <v-main id="films" v-cloak>
    <v-container grid-list-lg class="container-min-height">
      <div>
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
                <v-col class="d-flex" cols="12" sm="12" xs="12" md="3">
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
                <v-col class="d-flex ml-md-2" cols="12" sm="12" md="3">
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
                <v-col
                  class="d-flex ml-md-2 mt-10 mt-md-0 align-center"
                  cols="12"
                  sm="12"
                  xs="12"
                  md="5"
                >
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
      </div>
      <v-layout row wrap v-if="FilmLsit && FilmLsitTotal" v-cloak>
        <v-flex
          v-for="(film, index) in FilmLsit"
          :key="index"
          class="align-start"
          xs12
          sm6
          md4
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                shaped
                class="text-center pt-3 pl-3 pr-3"
                min-height="420px"
              >
                <v-img
                  height="200px"
                  v-if="film.poster"
                  :src="film.poster.file_path"
                  alt=""
                />
                <v-card-subtitle class="RussoOneFont">
                  {{ film.name }}
                </v-card-subtitle>
                <v-card-subtitle class="subtitle-2 pt-0">{{
                  film.teaser
                }}</v-card-subtitle>
                <v-fade-transition>
                  <v-overlay
                    z-index="0"
                    opacity="0.6"
                    v-if="hover"
                    absolute
                    color="#fff"
                  >
                    <v-btn @click="goToFilmDetails(film._id)">{{
                      $t("films.seeMore")
                    }}</v-btn>
                    <v-btn
                      class="ml-5"
                      color="black"
                      v-if="admin"
                      icon
                      :to="{ name: 'editfilm', params: { id: film._id } }"
                      ><v-icon large>mdi-pencil-circle</v-icon></v-btn
                    >
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
        </v-flex>
      </v-layout>
      <v-layout row v-else-if="FilmLsitTotal === 0" class="vElseContainer">
        <v-flex>
          <v-card
            class="d-flex justify-center align-center"
            width="100%"
            height="100%"
            >{{ $t("films.noFilms") }}</v-card
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
    <loading :active.sync="this.Loading" color="blue" is-full-page></loading>
  </v-main>
</template>
<script>
import Footer from "@/components/AppFooter.vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import Loading from "vue-loading-overlay";
export default {
  metaInfo() {
    return { title: this.$t("pagesTitles.Films") };
  },
  data() {
    return {
      panel: null,
      setRange: null,
      searchText: "",
      admin: false,
      unwatch: null,
    };
  },
  components: { Footer, Loading },
  computed: {
    ...mapGetters({
      PaginatonCounter: "film/paginatonsCounter",
    }),
    ...mapState({
      FilmLsitTotal: (state) => state.film.listTotal,
      FilmLsit: (state) => state.film.list,
      AllGenres: (state) => state.genre.list,
      AllDirectors: (state) => state.director.list,
      Loading: (state) => state.film.Loading,
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
        // console.log(this.$store.state.film.pageSet);
        // console.log("Genres", this.Genres);
      }
    },
  },
  mounted() {
    (this.unwatch = this.$store.watch(
      (state) => state.film.pageSet,
      () => {
        this.loadFilmsList();
      },
      {
        deep: true,
      }
    )),
      Promise.all([
        this.loadFilmsList(),
        this.uploadGenresList(),
        this.setListOfDirectors(),
      ])
        .then(() => {
          this.user = this.$store.state.auth.user;
          this.admin = this.$store.state.auth.admin;
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
.RussoOneFont {
  font-family: "Russo One", sans-serif !important;
  font-size: 24px;
  text-align: center;
  color: black !important;
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
