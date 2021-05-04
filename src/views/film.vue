<template>
  <v-main>
    <v-container
      v-if="dataLoaded"
      fluid
      class="d-flex justify-center align-center pa-10 filmWrapper"
    >
      <v-card elevation="15" max-width="800px" width="100%" class="text-center">
        <v-card-title v-if="this.$route.params.id !== 'new'"
          >Страница одного фильма<v-spacer></v-spacer>
          <v-btn color="red" @click="deleteItem($route.params.id)">
            удалить
          </v-btn>
        </v-card-title>
        <v-card-title v-else class="justify-center"
          >Добавление фильма
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="Name"
            :error-messages="nameErrors"
            @input="$v.Name.$touch()"
            @blur="$v.Name.$touch()"
            label="Название"
            placeholder="Введите название"
            required
          ></v-text-field>

          <v-text-field
            maxLength="140"
            v-model="Teaser"
            :error-messages="teaserErrors"
            @input="$v.Teaser.$touch()"
            @blur="$v.Teaser.$touch()"
            label="Тизер"
            placeholder="Введите тизер"
          ></v-text-field>
          <v-row no-gutters>
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                v-if="Genres"
                v-model="Genre"
                :error-messages="genreErrors"
                @input="$v.Genre.$touch()"
                @blur="$v.Genre.$touch()"
                dense
                :items="Genres"
                item-text="name"
                chips
                multiple
                label="Выберите жанр"
                return-object
              ></v-select>
              <addGenre />
            </v-col>
          </v-row>
          <!-- РЕЖИСЕР -->
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                v-model="Director"
                :error-messages="directorErrors"
                @input="$v.Director.$touch()"
                @blur="$v.Director.$touch()"
                :items="Directors"
                item-text="name"
                chips
                multiple
                dense
                label="Выберите режиссера"
                return-object
              ></v-select>
              <addDirector />
            </v-col>
          </v-row>
          <v-text-field
            v-model="Year"
            :error-messages="yearErrors"
            @input="$v.Year.$touch()"
            @blur="$v.Year.$touch()"
            label="Год производства"
            placeholder="Год производства"
          ></v-text-field>
          <h3>Описание</h3>
          <v-textarea
            v-model="Description"
            label="Описание"
            :error-messages="descErrors"
            @input="$v.Description.$touch()"
            @blur="$v.Description.$touch()"
            placeholder="Введите описание фильма"
          ></v-textarea>
          <v-text-field
            v-model="Link"
            :error-messages="linkErrors"
            @input="$v.Link.$touch()"
            @blur="$v.Link.$touch()"
            dense
            filled
            readonly
            label="Загрузите трейлер"
            placeholder="Трейлер"
            class="mt-3"
          >
            <template v-slot:append>
              <v-btn
                color="primary"
                class="text-none mb-3"
                @click="onFilmFileButtonClick"
              >
                <v-icon left>
                  mdi-cloud-upload
                </v-icon>
                Загрузить
              </v-btn>
              <input
                ref="uploaderFilm"
                class="d-none"
                type="file"
                accept="video/*"
                @change="onFilmFileChanged"
              /> </template
          ></v-text-field>

          <v-text-field
            class="mt-3"
            v-model="Poster"
            :error-messages="posterErrors"
            @input="$v.Poster.$touch()"
            @blur="$v.Poster.$touch()"
            dense
            filled
            readonly
            label="Загрузите постер"
            placeholder="Постер"
            clearable
          >
            <template v-slot:append>
              <v-btn
                color="primary"
                class="text-none mb-3"
                @click="onPosterFileButtonClick"
              >
                <v-icon left>
                  mdi-cloud-upload
                </v-icon>
                Загрузить
              </v-btn>
              <input
                ref="uploaderPoster"
                class="d-none"
                type="file"
                accept="image/*"
                @change="onPosterFileChanged"
              /> </template
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="save" color="primary">
            Сохранить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="goBack">
            Назад
          </v-btn>
          <!-- <v-btn @click="check">
            check
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-container>
    <loading :active.sync="this.Loading" color="blue" is-full-page></loading>
  </v-main>
</template>
<script>
import addGenre from "@/components/AddGenre.vue";
import addDirector from "@/components/AddDirector.vue";
import { validationMixin } from "vuelidate";
import {
  required,
  numeric,
  maxLength,
  between,
} from "vuelidate/lib/validators";
import { mapActions, mapMutations, mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  metaInfo: {
    title: "Edit / Save Film",
  },
  data() {
    return {
      dataLoaded: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    Name: { required, maxLength: maxLength(100) },
    Teaser: { required, maxLength: maxLength(140) },
    Genre: { required },
    Director: { required },
    Description: { maxLength: maxLength(1500) },
    Year: { required, numeric, between: between(1950, 2021) },
    Link: { required },
    Poster: { required },
  },
  components: {
    addGenre,
    addDirector,
    Loading,
  },
  computed: {
    ...mapState({
      CurrentFilm: (state) => state.film.currentItem,
      Genres: (state) => state.genre.list,
      Directors: (state) => state.director.list,
      Loading: (state) => state.film.Loading,
    }),
    Name: {
      get() {
        return this.$store.state.film.currentItem.name;
      },
      set(value) {
        this.setCurrentItemName(value);
      },
    },
    Teaser: {
      get() {
        return this.$store.state.film.currentItem.teaser;
      },
      set(value) {
        this.setCurrentItemTeaser(value);
      },
    },
    Genre: {
      get() {
        return this.$store.state.film.currentItem.genre;
      },
      set(value) {
        this.setCurrentItemGenre(value);
      },
    },
    Director: {
      get() {
        return this.$store.state.film.currentItem.director;
      },
      set(value) {
        this.setCurrentItemDirector(value);
      },
    },
    Year: {
      get() {
        return this.$store.state.film.currentItem.year;
      },
      set(value) {
        this.setCurrentItemYear(value);
      },
    },
    Description: {
      get() {
        return this.$store.state.film.currentItem.description;
      },
      set(value) {
        this.setCurrentItemDescription(value);
      },
    },
    Link: {
      get() {
        return this.$store.state.film.currentItem.link;
      },
    },
    Poster: {
      get() {
        return this.$store.state.film.currentItem.poster.file_name;
      },
    },
    // ВАЛИДАТОР ОШИБКИ
    nameErrors() {
      const errors = [];
      if (!this.$v.Name.$dirty) return errors;
      !this.$v.Name.required && errors.push("Название необходимо");
      !this.$v.Name.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.Name.$params.maxLength.max}`
        );
      return errors;
    },
    teaserErrors() {
      const errors = [];
      if (!this.$v.Teaser.$dirty) return errors;
      !this.$v.Teaser.required && errors.push("Тизер необходим");
      !this.$v.Teaser.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.Teaser.$params.maxLength.max}`
        );
      return errors;
    },
    descErrors() {
      const errors = [];
      if (!this.$v.Description.$dirty) return errors;
      !this.$v.Description.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.Description.$params.maxLength.max}`
        );
      return errors;
    },
    genreErrors() {
      const errors = [];
      if (!this.$v.Genre.$dirty) return errors;
      !this.$v.Genre.required && errors.push("Жанр необходим");
      return errors;
    },
    directorErrors() {
      const errors = [];
      if (!this.$v.Director.$dirty) return errors;
      !this.$v.Director.required && errors.push("Режиссер необходим");
      return errors;
    },
    yearErrors() {
      const errors = [];
      if (!this.$v.Year.$dirty) return errors;
      !this.$v.Year.required && errors.push("Год производства необходим");
      !this.$v.Year.numeric &&
        errors.push("Год производства должен быть числом");
      !this.$v.Year.between &&
        errors.push("Год производства должен быть от 1950 по 2021");
      return errors;
    },
    linkErrors() {
      const errors = [];
      if (!this.$v.Link.$dirty) return errors;
      !this.$v.Link.required && errors.push("Трейлер необходим");
      return errors;
    },
    posterErrors() {
      const errors = [];
      if (!this.$v.Poster.$dirty) return errors;
      !this.$v.Poster.required && errors.push("Постер необходим");
      return errors;
    },
  },
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
    ...mapMutations({
      setCurrentItemName: "film/SET_CURRENT_NAME",
      setCurrentItemTeaser: "film/SET_CURRENT_TEASER",
      setCurrentItemGenre: "film/SET_CURRENT_GENRE",
      setCurrentItemDirector: "film/SET_CURRENT_DIRECTOR",
      setCurrentItemYear: "film/SET_CURRENT_YEAR",
      setCurrentItemDescription: "film/SET_CURRENT_DESCRIPTION",
      setCurrentItemLink: "film/SET_CURRENT_LINK",
      setCurrentItemPoster: "film/SET_CURRENT_POSTER",
      setFilmFile: "film/SET_FILM_FILE",
      setPosterFile: "film/SET_POSTER_FILE",
    }),
    onFilmFileButtonClick() {
      this.$refs.uploaderFilm.click();
    },
    onPosterFileButtonClick() {
      this.$refs.uploaderPoster.click();
    },
    onFilmFileChanged(e) {
      try {
        this.setFilmFile(e.target.files[0]);
        this.setCurrentItemLink(e.target.files[0].name);
      } catch (error) {
        console.log(error);
      }
    },
    onPosterFileChanged(e) {
      // console.log(e.target.files[0]);
      this.setPosterFile(e.target.files[0]);
      this.setCurrentItemPoster(e.target.files[0].name);
    },
    // check() {
    //   console.log("currentItem");
    // console.log("validation");
    // console.log(this.$v);
    // },

    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );
        return;
      }
      if (this.$route.params.id !== "new") {
        this.editFilm()
          .then((res) => {
            if (res.status === 200) {
              this.appAlert("Редактирование", "Сохранено успешно!", "success");
            } else {
              this.appAlert(
                "Редактирование",
                `Ошибка сохранения ${res.status} - ${res.data}`,
                "error"
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.saveFilm()
          .then((res) => {
            if (res.status === 200) {
              this.appAlert("Сохранение", "Сохранено успешно!", "success");
            } else {
              this.appAlert(
                "Сохранение",
                `Ошибка сохранения ${res.status} - ${res.data}`,
                "error"
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    async deleteItem(id) {
      const conf = await this.$confirm(
        "Удалить фильм? (Данные фильма будут удалены безвозвратно, а файлы постера и трейлера попадут в корзину)",
        {
          title: "Удалить",
          color: "primary",
          buttonTrueText: "Удалить",
          buttonFalseText: "Нет",
          icon: "mdi-delete",
        }
      );
      if (conf) {
        this.deleteFilm(id)
          .then((res) => {
            if (res.status === 200) {
              this.appAlert("Удаление", "Удалено успешно!", "success");
            } else {
              this.appAlert(
                "Удаление",
                `Ошибка удаления ${res.status}`,
                "error"
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        return;
      }
    },
    async goBack() {
      if (this.$route.params.id === "new") {
        let currentFilm = Object.assign({}, this.CurrentFilm);
        delete currentFilm.poster;
        delete currentFilm.link;

        let valuesArr = Object.values(currentFilm);
        let result = valuesArr.some((value) => {
          return value.length != 0;
        });
        if (result) {
          const conf = await this.$confirm(
            "В форме есть заполненные поля! Все равно выйти?",
            {
              title: "Выход",
              color: "primary",
              buttonTrueText: "Да",
              buttonFalseText: "Нет",
              icon: "mdi-exit-to-app",
            }
          );
          if (conf) {
            this.$router.go(-1);
          } else {
            return;
          }
        } else {
          this.$router.go(-1);
        }
      } else {
        this.$router.go(-1);
      }
    },
  },
  created() {
    this.uploadGenresList();
    this.getProfile();
    if (this.$route.params.id !== "new") {
      this.setCurrentFilm(this.$route.params.id)
        .then(() => {
          this.dataLoaded = true;
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.addNewFilm()
        .then(() => {
          this.dataLoaded = true;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.setListOfDirectors().catch((e) => {
      console.log(e);
    });
  },
};
</script>

<style scoped lang="scss">
.filmWrapper {
  background-color: #ffaa00;
  background-image: url("../assets/images/editFilm/Liquid-Cheese.svg");
  background-attachment: fixed;
  background-size: cover;
}
</style>
