<template>
  <v-app>
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
          <v-text-field
            v-model="film.genre"
            label="Жанр"
            placeholder="Введите жанр фильма"
          ></v-text-field>
          <!-- РЕЖИСЕР -->
          <h3>Режиссер</h3>
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="10">
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
            </v-col>
            <v-col class="d-flex" cols="12" sm="2">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn large icon v-bind="attrs" v-on="on"
                    ><v-icon color="blue" large>mdi-library-plus</v-icon></v-btn
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
                    <v-btn color="blue darken-1" text @click="saveNewDirector">
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
import { VFileInput } from "vuetify";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    VFileInput,
  },
  data() {
    return {
      film: {},
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
  computed: mapGetters("auth", ["GETUSER"]),
  methods: {
    check() {
      console.log(this.film);
    },
    addDirector(value) {
      this.film.director = value;
      // console.log(value);
      // let ids = value.map((e) => {
      //   return e._id;
      // });
      // console.log("IDSSSS");
      // console.log(ids);
      // this.directorsIds = ids;
    },
    ...mapActions("director", ["SET_LIST", "SAVE_NEW_DIRECTOR"]),
    ...mapGetters("director", ["GET_LIST"]),
    ...mapGetters("film", ["GET_CURRENT_ITEM"]),
    ...mapActions("film", [
      "SET_CURRENT_ITEM",
      "ADD_NEW_ITEM",
      "SAVE_CURRENT_ITEM",
      "EDIT_CURRENT_ITEM",
      "DELETE_CURRENT_ITEM",
    ]),
    ...mapActions("auth", ["GET_PROFILE"]),
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
      this.SET_LIST().then(() => {
        this.directors = this.GET_LIST();
      });
    },
    saveNewDirector() {
      this.SAVE_NEW_DIRECTOR([this.newDirectorImage, this.newDirector]).then(
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
        this.EDIT_CURRENT_ITEM([this.image, this.film])
          .then(() => {
            this.SET_CURRENT_ITEM(this.film._id).then(() => {
              this.$router.go(-1);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.SAVE_CURRENT_ITEM([this.image, this.film])
          .then((res) => {
            this.SET_CURRENT_ITEM(res).then(() => {
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
        this.DELETE_CURRENT_ITEM(id)
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
    this.GET_PROFILE();
    if (this.$route.params.id !== "new") {
      this.SET_CURRENT_ITEM(this.$route.params.id)
        .then(() => {
          this.film = this.GET_CURRENT_ITEM();
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
      this.ADD_NEW_ITEM()
        .then(() => {
          this.film = this.GET_CURRENT_ITEM();
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
