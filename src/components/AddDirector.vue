<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn @click="addDirector" large icon v-bind="attrs" v-on="on"
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
                :error-messages="nameErrors"
                @input="$v.Name.$touch()"
                @blur="$v.Name.$touch()"
                clearable
                v-model="Name"
                label="Имя"
              ></v-text-field>
              <!-- <v-file-input v-model="Image" label="файл"></v-file-input> -->
              <v-text-field
                :error-messages="imageErrors"
                @input="$v.Image.$touch()"
                @blur="$v.Image.$touch()"
                class="mt-3"
                v-model="Image"
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
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="[(dialog = false), $v.$reset()]"
        >
          Закрыть
        </v-btn>
        <v-btn color="blue darken-1" text @click="saveDirector">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    Name: { required, maxLength: maxLength(25) },
    Image: { required },
  },
  computed: {
    Name: {
      get() {
        return this.$store.state.director.currentItem.name;
      },
      set(value) {
        this.mutSetDirectorName(value);
      },
    },
    Image: {
      get() {
        return this.$store.state.director.currentItem.image;
      },
    },
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
    imageErrors() {
      const errors = [];
      if (!this.$v.Image.$dirty) return errors;
      !this.$v.Image.required && errors.push("Картинка необходимо");
      return errors;
    },
  },
  methods: {
    ...mapActions({
      setListOfDirectors: "director/SET_LIST",
      saveNewDirector: "director/SAVE_NEW_DIRECTOR",
      setDirectorImage: "director/SET_DIRECTOR_IMAGE",
    }),
    ...mapMutations({
      addNewDirector: "director/ADD_NEW_DIRECTOR",
      mutSetDirectorName: "director/SET_CURRENT_NAME",
      mutSetDirectorImageAndImageData: "director/SET_CURRENT_IMAGE",
    }),
    addDirector() {
      this.addNewDirector();
    },
    onPosterFileButtonClick() {
      this.$refs.uploaderPoster.click();
    },
    onPosterFileChanged(e) {
      this.setDirectorImage(e.target.files[0]);
    },
    saveDirector() {
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
      this.saveNewDirector().then(() => {
        this.setListOfDirectors().then((value) => {
          this.$emit("getDirectors", value);
          this.$v.$reset();
          this.dialog = false;
        });
      });
    },
  },
};
</script>
