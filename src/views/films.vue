<template>
  <div id="films">
    <v-sheet
      class="mb-12 pt-2 pb-2 pl-7 pr-7 d-flex flex-column align-center sheetBgImg"
      elevation="1"
      min-height="400px"
      height="25vh"
      width="100%"
      ><v-toolbar
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
      <v-expansion-panels focusable @change="resetSearchValues" class="mb-7">
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
              <v-col class="d-flex ml-2 align-center" cols="4" sm="3">
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
    </v-sheet>
    <v-container grid-list-lg class="d-flex flex-wrap justify-space-between">
      <v-layout row wrap v-if="list.length > 0">
        <v-flex
          v-for="(film, index) in list"
          :key="index"
          class="align-start"
          xs12
          sm6
          md4
        >
          <v-card
            shaped
            class="text-center grow pt-5 hoverEffect"
            min-height="420px"
          >
            <router-link
              :to="{ name: 'filmditails', params: { id: film._id } }"
              v-if="film.poster"
              ><img class="palyer__img" :src="film.poster.file_path" alt=""
            /></router-link>
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
      <v-container v-else class="vElseContainer">
        <v-card
          class="d-flex justify-center align-center"
          width="100%"
          height="100%"
          >Нет фильмов</v-card
        >
      </v-container>
    </v-container>
    <v-card-actions class="mb-5 justify-center">
      <v-pagination
        color="orange"
        circle
        light
        total-visible="10"
        v-model="currentSelectedPage"
        :length="paginatonsCounter"
      ></v-pagination>
    </v-card-actions>
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/AppFooter.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      genreSelectValue: [],
      directorSelectValue: [],
      range: [1950, 2021],
      admin: null,
      directors: [],
      list: [],
      listTotal: null,
      pageSet: {
        pageNumber: 1,
        pageSize: 9,
      },
      paginatonsCounter: null,
      searchText: "",
      genres: null,
    };
  },
  components: { Footer },
  computed: {
    currentSelectedPage: {
      get() {
        return this.pageSet.pageNumber;
      },
      set(value) {
        this.pageSet.pageNumber = value;
        this.loadFilmsList(this.pageSet).then(() => {
          this.list = this.GET_LIST();
          this.listTotal = this.GET_LIST_TOTAL();
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
    ...mapGetters("film", ["GET_LIST", "GET_LIST_TOTAL"]),
    ...mapGetters({
      getAllGenres: "genre/GET_LIST",
      getAllDirectors: "director/GET_LIST",
    }),
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
      this.paginate(this.pageSet);
    },
    paginateDirectors(value) {
      const ids = this.selectSearch(value);
      this.pageSet.directors = ids;
      this.paginate(this.pageSet);
    },
    paginate(mainObj) {
      this.loadFilmsList(mainObj).then(() => {
        this.list = this.GET_LIST();
        this.listTotal = this.GET_LIST_TOTAL();
        this.paginatonsCounter = Math.ceil(this.listTotal / mainObj.pageSize);
      });
    },
    search() {
      this.pageSet.search = this.searchText;
      this.paginate(this.pageSet);
    },
    resetSearchValues() {
      this.genreSelectValue = [];
      this.directorSelectValue = [];
      this.range = [1935, 2021];
      this.pageSet = {
        pageNumber: 1,
        pageSize: 9,
      };
      this.paginate(this.pageSet);
    },
  },
  mounted() {
    this.getProfile()
      .then((res) => {
        this.user = res.user;
        this.admin = res.admin;
      })
      .catch((err) => {
        console.log(err);
      });
    this.paginate(this.pageSet);
    this.uploadGenresList().then(() => {
      this.genres = this.getAllGenres();
    });
    this.setListOfDirectors()
      .then((value) => {
        this.directors = value;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<style scoped lang="css">
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
  background-color: #e0f7fa;
}
.vElseContainer {
  min-height: 200px;
  font-weight: bold;
  font-family: "Russo One", sans-serif;
  font-size: 2vw;
}
.sheetBgImg {
  background-image: url("../assets/mountians.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
