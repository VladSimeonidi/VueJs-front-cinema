<template>
  <div id="films">
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
      <v-layout row wrap v-if="list && listTotal">
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
          color="orange"
          circle
          light
          total-visible="10"
          v-model="currentSelectedPage"
          :length="paginatonsCounter"
        ></v-pagination>
      </v-card-actions>
    </v-container>

    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/AppFooter.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
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
    panelck() {
      console.log(this.panel);
    },
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
          // console.group("List in pag");
          // console.log(this.list);
          // console.log(Array.isArray(this.list));
          // console.log(this.list.length);
          // console.groupEnd();
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
    this.paginate(this.pageSet), this.paginate(this.pageSet);

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
  },
};
</script>
<style scoped lang="css">
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%2300eeff'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%232fe0cf'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
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
.sheetBgImg {
  /* background-image: url("../assets/films/mountians.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%; */
  background-color: #487346;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%23608f57' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%2374ad69' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%23608f57' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%2374ad69' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%2389CC7C' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%237f8f53' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%239bad64' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%239bad64' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%237f8f53' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23B6CC76' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%237f8f53' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%239bad64' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23B6CC76' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
