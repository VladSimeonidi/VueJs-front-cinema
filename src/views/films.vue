<template>
  <v-main id="films">
    <v-container grid-list-lg class="container-min-height">
      <v-toolbar
        rounded="lg"
        class="mt-2 mb-3 pr-2"
        height="100%"
        max-height="80px"
        width="100%"
        ><v-text-field
          @keydown.enter="search"
          v-model="searchText"
          :label="$t('films.search')"
          clearable
        ></v-text-field
        ><v-btn large class="mb-5" @click="search" icon
          ><v-icon>mdi-magnify</v-icon></v-btn
        ></v-toolbar
      >
      <v-expansion-panels
        focusable
        @change="resetSearchValues"
        class="mb-7"
        v-model="panel"
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
              <v-col class="d-flex" cols="3" sm="3">
                <v-select
                  clearable
                  @change="paginateGenres"
                  :items="genres"
                  item-text="name"
                  chips
                  small-chips
                  v-model="genreSelectValue"
                  multiple
                  :label="$t('films.chooseGenre')"
                  color="black"
                  prepend-icon="mdi-filmstrip"
                  return-object
                ></v-select>
              </v-col>
              <v-col class="d-flex ml-2" cols="3" sm="3">
                <v-select
                  clearable
                  prepend-icon="mdi-account"
                  @change="paginateDirectors"
                  v-model="directorSelectValue"
                  color="black"
                  :items="directors"
                  small-chips
                  item-text="name"
                  chips
                  multiple
                  :label="$t('films.chooseDirector')"
                  return-object
                ></v-select
              ></v-col>
              <v-col class="d-flex ml-2 align-center" cols="5" sm="4">
                <v-range-slider
                  hide-details
                  dense
                  :label="$t('films.chooseYear')"
                  v-model="range"
                  max="2021"
                  min="1950"
                  thumb-label="always"
                  @change="rangeValue"
                ></v-range-slider>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-layout row wrap v-if="list && listTotal" v-cloak>
        <v-flex
          v-for="(film, index) in list"
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
      <v-layout row v-else-if="listTotal === 0" class="vElseContainer">
        <v-flex>
          <v-card
            class="d-flex justify-center align-center"
            width="100%"
            height="100%"
            >Нет фильмов</v-card
          ></v-flex
        >
      </v-layout>
      <v-layout v-else-if="listTotal === null" class="vElseContainer">
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
          v-if="listTotal"
          color="light-blue darken-2"
          circle
          light
          total-visible="10"
          v-model="currentSelectedPage"
          :length="paginatonsCounter"
        ></v-pagination>
      </v-card-actions>
    </v-container>

    <Footer />
  </v-main>
</template>
<script>
import Footer from "@/components/AppFooter.vue";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  metaInfo: {
    title: "Films",
  },
  data() {
    return {
      panel: null,
      genreSelectValue: [],
      directorSelectValue: [],
      range: [1950, 2021],
      admin: null,
      directors: [],
      list: null,
      listTotal: null,
      pageSet: { pageNumber: 1, pageSize: 9 },
      paginatonsCounter: null,
      searchText: "",
      genres: null,
    };
  },
  components: { Footer },
  computed: {
    ...mapState({
      TTT: (state) => state.film.OneFilmPosterImage,
    }),
    ...mapGetters({
      getFilmLsitTotal: "film/GET_LIST_TOTAL",
      getFilmLsit: "film/GET_LIST",
      getAllGenres: "genre/GET_LIST",
      getAllDirectors: "director/GET_LIST",
      getFilmsPagination: "pagination/GET_FILMS_PAGINATION",
    }),
    currentSelectedPage: {
      get() {
        return this.pageSet.pageNumber;
      },
      set(value) {
        this.pageSet.pageNumber = value;
        this.loadFilmsList(this.pageSet).then(() => {
          this.list = this.getFilmLsit;
          this.listTotal = this.getFilmLsitTotal;
          this.paginatonsCounter = Math.ceil(
            this.listTotal / this.pageSet.pageSize
          );
        });
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
      setupCurrentFilmsPagination: "pagination/SET_CURRENT_FILMS_PAGINATION",
    }),
    goToFilmDetails(ID) {
      this.$router.push({ name: "filmditails", params: { id: ID } });
    },
    rangeValue(value) {
      this.pageSet.range = value;
      this.paginate(this.pageSet);
    },
    selectSearch(value) {
      const idsArray = value.map((el) => {
        return el._id;
      });
      this.pageSet.pageNumber = 1;
      this.pageSet.pageSize = 9;
      return idsArray;
    },
    paginateGenres(value) {
      const ids = this.selectSearch(value);
      this.pageSet.genres = ids;
      this.setupCurrentFilmsPagination(this.pageSet);
      this.paginate(this.pageSet);
    },
    paginateDirectors(value) {
      const ids = this.selectSearch(value);
      this.pageSet.directors = ids;
      this.paginate(this.pageSet);
    },
    paginate(mainObj) {
      this.loadFilmsList(mainObj)
        .then(() => {
          this.list = this.getFilmLsit;
          this.listTotal = this.getFilmLsitTotal;
          this.paginatonsCounter = Math.ceil(this.listTotal / mainObj.pageSize);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search() {
      this.pageSet.search = this.searchText;
      this.paginate(this.pageSet);
    },
    resetSearchValues() {
      // console.log(this.panel);
      if (this.panel === undefined) {
        this.genreSelectValue = [];
        this.directorSelectValue = [];
        this.range = [1935, 2021];
        this.pageSet = {
          pageNumber: 1,
          pageSize: 9,
        };
        this.searchText = "";
        this.paginate(this.pageSet);
      }
    },
  },
  mounted() {
    // console.log(new Date().toLocaleTimeString());
    // console.group("boolean");
    // console.log(Boolean(""));
    // console.groupEnd();
    this.getProfile()
      .then((res) => {
        this.user = res.user;
        this.admin = res.admin;
      })
      .catch((err) => {
        console.log(err);
      });
    this.paginate(this.pageSet),
      this.uploadGenresList()
        .then(() => {
          this.genres = this.getAllGenres;
        })
        .catch((err) => {
          console.log(err);
        });
    this.setListOfDirectors()
      .then((value) => {
        this.directors = value;
      })
      .catch((e) => {
        console.log(e);
      });
    console.group("TTT");
    console.log(this.TTT);
    console.groupEnd();
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
