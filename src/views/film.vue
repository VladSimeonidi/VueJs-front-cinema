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
        this.editFilm().catch((e) => {
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
  background-color: #039be5;
  //   background-image: url("../assets/37975-gorod_ogni_nebo_otrajenie.jpg");
  //   background-size: contain;
  //   background-repeat: no-repeat;
  //   background-position: center;
  //   background-color: rgb(0, 48, 130);
}
</style>
