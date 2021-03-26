<template>
  <v-app>
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
                v-if="genres"
                v-model="Genre"
                :error-messages="genreErrors"
                @input="$v.Genre.$touch()"
                @blur="$v.Genre.$touch()"
                dense
                :items="genres"
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
          <v-row align="center">
            <v-col class="d-flex" cols="12" sm="12">
              <v-select
                v-model="Director"
                :error-messages="directorErrors"
                @input="$v.Director.$touch()"
                @blur="$v.Director.$touch()"
                :items="directors"
                item-text="name"
                chips
                multiple
                dense
                label="Выберите режиссера"
                return-object
              ></v-select>
              <addDirector @getDirectors="onClickDirectorComponent" />
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
          <v-btn @click="$router.go(-1)">
            Назад
          </v-btn>
          <!-- <v-btn @click="check">
            check
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-container>
    <loading
      :active.sync="this.getLoading()"
      color="blue"
      is-full-page
    ></loading>
  </v-app>
</template>
<script>
import addGenre from "@/components/AddGenre.vue";
import addDirector from "@/components/AddDirector.vue";
import { validationMixin } from "vuelidate";
import { required, numeric, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  metaInfo: {
    title: "Edit / Save Film",
  },
  data() {
    return {
      genres: null,
      directors: [],
      dataLoaded: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    Name: { required },
    Teaser: { required, maxLength: maxLength(140) },
    Genre: { required },
    Director: { required },
    Year: { required, numeric },
    Link: { required },
    Poster: { required },
  },
  components: {
    addGenre,
    addDirector,
    Loading,
  },
  computed: {
    Name: {
      get() {
        return this.getCurrentItemName();
      },
      set(value) {
        this.setCurrentItemName(value);
      },
    },
    Teaser: {
      get() {
        return this.getCurrentItemTeaser();
      },
      set(value) {
        this.setCurrentItemTeaser(value);
      },
    },
    Genre: {
      get() {
        return this.getCurrentItemGenre();
      },
      set(value) {
        this.setCurrentItemGenre(value);
      },
    },
    Director: {
      get() {
        return this.getCurrentItemDirector();
      },
      set(value) {
        this.setCurrentItemDirector(value);
      },
    },
    Year: {
      get() {
        return this.getCurrentItemYear();
      },
      set(value) {
        this.setCurrentItemYear(value);
      },
    },
    Description: {
      get() {
        return this.getCurrentItemDescription();
      },
      set(value) {
        this.setCurrentItemDescription(value);
      },
    },
    Link: {
      get() {
        return this.getCurrentItemLink();
      },
    },
    Poster: {
      get() {
        return this.getCurrentItemPoster();
      },
    },
    // ВАЛИДАТОР ОШИБКИ
    nameErrors() {
      const errors = [];
      if (!this.$v.Name.$dirty) return errors;
      !this.$v.Name.required && errors.push("Название необходимо");
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
    ...mapGetters({
      getAllGenres: "genre/GET_LIST",
      getAllDirectors: "director/GET_LIST",
      getCurrentFilm: "film/GET_CURRENT_ITEM",
      getCurrentItemName: "film/GET_CURRENT_NAME",
      getCurrentItemTeaser: "film/GET_CURRENT_TEASER",
      getCurrentItemGenre: "film/GET_CURRENT_GENRE",
      getCurrentItemDirector: "film/GET_CURRENT_DIRECTOR",
      getCurrentItemYear: "film/GET_CURRENT_YEAR",
      getCurrentItemDescription: "film/GET_CURRENT_DESCRIPTION",
      getCurrentItemLink: "film/GET_CURRENT_LINK",
      getCurrentItemPoster: "film/GET_CURRENT_POSTER",
      getLoading: "film/GET_LOADING",
    }),
    onClickGenreComponent(value) {
      this.genres = value;
    },
    onClickDirectorComponent(value) {
      this.directors = value;
    },
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
      this.setPosterFile(e.target.files[0]);
      this.setCurrentItemPoster(e.target.files[0].name);
    },
    check() {
      // console.log("currentItem");
      // console.log(this.getCurrentFilm());
      console.log("validation");
      console.log(this.$v);
    },

    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "filmError",
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );
        return;
      }
      if (this.$route.params.id !== "new") {
        this.editFilm()
          .then((res) => {
            if (res === 200) {
              this.$notify({
                group: "FilmSaveEditSuccess",
                title: "Редактирование",
                text: "Сохранено успешно!",
                type: "success",
                max: 3,
                duration: 5000,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.saveFilm()
          .then((res) => {
            if (res === 200) {
              this.$notify({
                group: "FilmSaveEditSuccess",
                title: "Сохранение",
                text: "Сохранено успешно!",
                type: "success",

                max: 3,
                duration: 5000,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteItem(id) {
      const confirmed = confirm(
        "Удалить фильм? (Данные фильма будут удалены, а файлы постера и трейлера попадут в корзину)"
      );
      if (confirmed) {
        this.deleteFilm(id)
          .then((res) => {
            if (res.response.status === 404) {
              this.$notify({
                group: "filmError",
                title: "Ошибка 404",
                text: res.response.data,
                type: "error",
                max: 3,
                duration: 5000,
              });
            }
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
          this.dataLoaded = true;
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      this.addNewFilm()
        .then(() => {
          this.dataLoaded = true;
        })
        .catch((e) => {
          alert(e);
        });
    }
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

<style scoped lang="scss">
.filmWrapper {
  background-color: #ffaa00;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpath fill='%23ffb100' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23ffb800' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%23ffbf00' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%23ffc500' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%23ffcc00' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%23ffd624' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%23ffe038' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%23ffeb49' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%23fff558' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%23ffff66' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
</style>
