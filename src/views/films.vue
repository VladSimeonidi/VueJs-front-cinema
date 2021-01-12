<template>
  <div id="films">
    <v-container grid-list-lg class="d-flex flex-wrap justify-space-between">
      <v-toolbar class="mb-3 mt-7" width="100%"
        ><v-text-field
          @keydown.enter="search"
          v-model="searchText"
          label="Поиск"
          clearable
          hide-details
        ></v-text-field
        ><v-btn @click="search" icon
          ><v-icon>mdi-magnify</v-icon></v-btn
        ></v-toolbar
      >
      <v-expansion-panels class="mb-7" focusable>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template>
              <v-row no-gutters>
                <v-col cols="12">
                  Расширенный поиск
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters>
              <v-col class="d-flex" cols="3" sm="3">
                <v-select
                  @change="paginateGenres"
                  :items="genres"
                  item-text="name"
                  chips
                  small-chips
                  multiple
                  label="Выберите жанр"
                  return-object
                ></v-select>
                <addGenre @getGenres="onClickChild" />
              </v-col>
              <v-col class="d-flex ml-2" cols="3" sm="3">
                <v-select
                  clearable
                  @change="paginateDirectors"
                  :items="directors"
                  small-chips
                  item-text="name"
                  chips
                  multiple
                  label="Выберите режиссера"
                  return-object
                ></v-select
              ></v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-layout row wrap v-if="list.length != 0">
        <v-flex
          v-for="(film, index) in list"
          :key="index"
          class="align-start"
          xs12
          sm6
        >
          <v-card tile class="text-center grow pt-5" min-height="450px">
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
        dark
        total-visible="10"
        v-model="currentSelectedPage"
        :length="paginatonsCounter"
      ></v-pagination>
    </v-card-actions>
  </div>
</template>
<script>
import addGenre from "@/components/AddGenre.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      admin: null,
      directors: [],
      list: [],
      listTotal: null,
      pageSet: {
        pageNumber: 1,
        pageSize: 4,
      },
      paginatonsCounter: null,
      searchText: "",
      genres: null,
    };
  },
  components: {
    addGenre,
  },
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
    selectSearch(value) {
      const idsArray = value.map((el) => {
        return el._id;
      });
      this.pageSet.pageNumber = 1;
      this.pageSet.pageSize = 4;
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
    ...mapActions({
      addGenre: "genre/SAVE_NEW_ITEM",
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
    onClickChild() {
      this.genres = this.getAllGenres();
    },
  },
  mounted() {
    this.getProfile().then((res) => {
      this.user = res.user;
      this.admin = res.admin;
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
  max-width: 525px;
  max-height: 300px;
}
.grow:hover {
  transform: scale(1.03);
}
#films {
  background-image: url("../assets/winterbg.jpg");
  background-size: cover;
}
.vElseContainer {
  min-height: 200px;
  font-weight: bold;
  font-family: "Russo One", sans-serif;
  font-size: 2vw;
}
</style>
