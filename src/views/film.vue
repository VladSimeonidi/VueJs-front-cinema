<template>
  <v-app v-if="film">
    <v-container
      fluid
      class="d-flex justify-center align-center pa-10 filmWrapper"
    >
      <v-card class="form">
        <v-card-title class="text-center"
          >Страница одного фильма<v-spacer></v-spacer>
          <v-btn
            v-if="this.$route.params.id !== 'new' && GETUSER.isAdmin"
            @click="deleteItem(film._id)"
          >
            удалить
          </v-btn></v-card-title
        >
        <v-card-text>
          <h3>Название фильма</h3>
          <v-text-field
            v-model="film.name"
            label="Название"
            placeholder="Введите название"
          ></v-text-field>
          <h3>Тизер фильма</h3>
          <v-text-field
            maxLength="140"
            v-model="film.teaser"
            label="Тизер"
            placeholder="Введите тизер"
          ></v-text-field>
          <h3>Жанр</h3>
          <v-row no-gutters>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                v-if="genres"
                v-model="film.genre"
                dense
                :items="genres"
                @change="chooseGenres"
                item-text="name"
                chips
                multiple
                label="Выберите жанр"
                return-object
              ></v-select>
              <addGenre @getGenres="onClickGenreComponent" />
            </v-col>
          </v-row>
          <!-- РЕЖИСЕР -->
          <h3>Режиссер</h3>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                v-model="film.director"
                @change="addDirectorsToFilm"
                :items="directors"
                item-text="name"
                chips
                multiple
                label="Выберите режиссера"
                return-object
              ></v-select>
              <addDirector @getDirectors="onClickDirectorComponent" />
            </v-col>
          </v-row>
          <h3>Год производства</h3>
          <v-text-field
            v-model="film.year"
            label="Год производства"
            placeholder="Год производства"
          ></v-text-field>
          <h3>Описание</h3>
          <v-textarea
            v-model="film.description"
            label="Описание"
            placeholder="Введите описание фильма"
          ></v-textarea>
          <h3>Ссылка фильма:</h3>
          <v-file-input
            :placeholder="film.link"
            @change="getFilmLink"
          ></v-file-input>
          <h3>Постер</h3>
          <v-file-input
            :placeholder="film.poster.file_name"
            @change="getPicture"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="save">
            Сохранить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="$router.go(-1)">
            Назад
          </v-btn>
          <v-btn @click="check">
            check
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import addGenre from "@/components/AddGenre.vue";
import addDirector from "@/components/AddDirector.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      film: null,
      genres: null,
      image: null,
      filmFile: null,
      directors: [],
    };
  },
  components: {
    addGenre,
    addDirector,
  },
  computed: mapGetters("auth", ["GETUSER"]),
  methods: {
    ...mapActions({
      addGenre: "genre/SAVE_NEW_ITEM",
      uploadGenresList: "genre/SET_LIST",
      setListOfDirectors: "director/SET_LIST",
      setCurrentFilm: "film/SET_CURRENT_ITEM",
      addNewFilm: "film/ADD_NEW_ITEM",
      saveFilm: "film/SAVE_CURRENT_ITEM",
      editFilm: "film/EDIT_CURRENT_ITEM",
      deleteFilm: "film/DELETE_CURRENT_ITEM",
      getProfile: "auth/GET_PROFILE",
    }),
    ...mapGetters({
      getAllGenres: "genre/GET_LIST",
      getAllDirectors: "director/GET_LIST",
      getCurrentFilm: "film/GET_CURRENT_ITEM",
    }),
    onClickGenreComponent(value) {
      this.genres = value;
    },
    onClickDirectorComponent(value) {
      console.log(value);
      this.directors = value;
    },
    chooseGenres(value) {
      this.film.genre = value;
    },
    check() {
      console.log(this.film);
    },
    addDirectorsToFilm(value) {
      this.film.director = value;
    },
    getFilmLink(e) {
      this.filmFile = e;
      console.log(this.filmFile);
    },
    getPicture(e) {
      this.image = e;
      console.log(this.image);
    },

    save() {
      if (this.$route.params.id !== "new") {
        this.editFilm([[this.image, this.filmFile], this.film])
          .then(() => {
            this.setCurrentFilm(this.film._id).then(() => {
              this.$router.go(-1);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.saveFilm([[this.image, this.filmFile], this.film])
          .then((res) => {
            this.setCurrentFilm(res).then(() => {
              this.$router.go(-1);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteItem(id) {
      const confirmed = confirm("удалить?");
      if (confirmed) {
        this.deleteFilm(id)
          .then(() => {
            this.$router.go(-1);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  created() {
    this.uploadGenresList().then(() => {
      this.genres = this.getAllGenres();
    });
    this.getProfile();
    if (this.$route.params.id !== "new") {
      this.setCurrentFilm(this.$route.params.id)
        .then(() => {
          this.film = this.getCurrentFilm();
          if (!this.film.director) {
            this.film.director = [];
          }
          console.log("!!!!!!!!!!!!!!!!!");
          console.log(this.film);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      this.addNewFilm()
        .then(() => {
          this.film = this.getCurrentFilm();
        })
        .catch((e) => {
          alert(e);
        });
    }
    this.setListOfDirectors().then((value) => {
      this.directors = value;
    });
  },
};
</script>

<style scoped lang="scss">
.filmWrapper {
  background-image: url("../assets/37975-gorod_ogni_nebo_otrajenie.jpg");
  background-size: cover;
}
.form {
  text-align: center;
  max-width: 700px;
  width: 100%;
  min-height: 500px;
  background-color: red;
  &__buttons {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
  }
  &__description {
    width: 80%;
    resize: vertical;
  }
  &__inputName,
  &__description {
    width: 80%;
    outline: none;
  }
}
</style>
