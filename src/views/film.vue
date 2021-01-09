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
                dense
                :items="genres"
                @change="chooseGenres"
                item-text="name"
                chips
                multiple
                label="Выберите жанр"
                return-object
              ></v-select>
              <addGenre @getGenres="onClickChild" />
            </v-col>
          </v-row>
          <!-- РЕЖИСЕР -->
          <h3>Режиссер</h3>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                v-model="film.director"
                @change="addDirector"
                :items="directors"
                item-text="name"
                chips
                multiple
                label="Выберите режиссера"
                return-object
              ></v-select>

              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn large icon v-bind="attrs" v-on="on"
                    ><v-icon color="blue">mdi-library-plus</v-icon></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Режиссер</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="newDirector.name"
                            label="Имя"
                          ></v-text-field>
                          <v-file-input
                            @change="getDirectorPicture"
                            label="файл"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Закрыть
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveDirector">
                      Сохранить
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
            @change="previewFiles"
          ></v-file-input>
          <h3>Постер</h3>
          <v-file-input
            placeholder="Постер"
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      film: null,
      genres: null,
      image: {},
      newDirector: {
        name: "",
        image: "",
        films: [],
      },
      directors: [],
      newDirectorImage: {},
      dialog: false,
    };
  },
  components: {
    addGenre,
  },
  computed: mapGetters("auth", ["GETUSER"]),
  methods: {
    ...mapActions({
      addGenre: "genre/SAVE_NEW_ITEM",
      uploadGenresList: "genre/SET_LIST",
      setListOfDirectors: "director/SET_LIST",
      saveNewDirector: "director/SAVE_NEW_DIRECTOR",
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
    onClickChild(value) {
      console.log("LKLKLKL");
      console.log(value);
      this.genres = value;
    },
    chooseGenres(value) {
      const genresIds = value.map((el) => {
        return el._id;
      });
      this.film.genre = genresIds;
    },
    check() {
      console.log(this.film);
    },
    addDirector(value) {
      this.film.director = value;
    },
    previewFiles(e) {
      this.film.link = e.name;
    },
    getPicture(e) {
      this.image = e;
    },
    getDirectorPicture(e) {
      this.newDirectorImage = e;
    },
    uploadDirectors() {
      this.setListOfDirectors().then(() => {
        this.directors = this.getAllDirectors();
      });
    },
    saveDirector() {
      this.saveNewDirector([this.newDirectorImage, this.newDirector]).then(
        () => {
          this.uploadDirectors();
          this.dialog = false;
          this.newDirector = {
            name: "",
            image: "",
            films: [],
          };
        }
      );
    },
    save() {
      if (this.$route.params.id !== "new") {
        this.editFilm([this.image, this.film])
          .then(() => {
            this.setCurrentFilm(this.film._id).then(() => {
              this.$router.go(-1);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.saveFilm([this.image, this.film])
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
          // if (!this.film.director) {
          //   this.film.director = [];
          // }
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
    this.uploadDirectors();
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
