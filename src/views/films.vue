<template>
  <v-app id="films">
    <v-container grid-list-lg class="d-flex flex-wrap justify-space-between"
      ><v-toolbar class="mb-3 mt-7" width="100%"
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
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                dense
                @change="check"
                :items="genres"
                item-text="name"
                chips
                multiple
                label="Выберите жанр"
                return-object
              ></v-select>
              <v-dialog v-model="dialog" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="GETUSER.isAdmin"
                    large
                    icon
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon color="cyan lighten-2"
                      >mdi-library-plus</v-icon
                    ></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Добавить жанр</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="textfieldGenre"
                            label="Название"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Закрыть
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveGenre">
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-layout row wrap>
        <v-flex v-for="(film, index) in list" :key="index" d-flex xs12 sm6>
          <v-card tile class="text-center grow pt-5" min-height="450px">
            <router-link
              :to="{ name: 'filmditails', params: { id: film._id } }"
              v-if="film.poster"
              ><img class="palyer__img" :src="film.poster.file_path" alt=""
            /></router-link>
            <div class="player__title">
              {{ film.name }}
              <v-btn
                color="cyan lighten-2"
                v-if="GETUSER.isAdmin"
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
    </v-container>
    <v-card-actions class="justify-center">
      <v-pagination
        dark
        v-model="currentSelectedPage"
        :length="paginatonsCounter"
      ></v-pagination>
    </v-card-actions>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      list: [],
      listTotal: null,
      pageSet: {
        pageNumber: 1,
        pageSize: 4,
      },
      paginatonsCounter: null,
      searchText: "",
      genres: null,
      textfieldGenre: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["GETUSER"]),
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
    check(value) {
      const ids = value.map((el) => {
        return el._id;
      });
      this.pageSet.genres = ids;
      this.paginate(this.pageSet);
      console.log("ids");
      console.log(ids);
    },
    ...mapActions({
      addGenre: "genre/SAVE_NEW_ITEM",
      uploadGenresList: "genre/SET_LIST",
      saveGenre: "genre/SAVE_NEW_ITEM",
      loadFilmsList: "film/SET_LIST",
    }),
    ...mapGetters("film", ["GET_LIST", "GET_LIST_TOTAL"]),
    ...mapGetters({ getAllGenres: "genre/GET_LIST" }),
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
    saveGenre() {
      const genreData = {
        name: this.textfieldGenre,
      };
      this.addGenre(genreData).then(() => {
        this.uploadGenresList();
        this.textfieldGenre = null;
        this.dialog = false;
      });
    },
  },
  mounted() {
    this.paginate(this.pageSet);
    this.uploadGenresList().then(() => {
      this.genres = this.getAllGenres();
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
  background-size: contain;
}
</style>
