<template>
  <div>
    <v-container
      fluid
      class="d-flex justify-center align-center pa-10 filmWrapper"
    >
      <v-card elevation="15" max-width="800px" width="100%" class="text-center">
        <v-card-title v-if="this.$route.params.id !== 'new'"
          >Страница одного режиссера<v-spacer></v-spacer>
          <!-- <v-btn color="red" @click="deleteItem($route.params.id)">
            удалить
          </v-btn> -->
        </v-card-title>
        <v-card-title v-else class="justify-center"
          >Добавление режиссера
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="Name"
            :error-messages="nameErrors"
            @input="$v.Name.$touch()"
            @blur="$v.Name.$touch()"
            label="Имя"
            placeholder="Введите имя"
          ></v-text-field>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  metaInfo: {
    title: "Edit / Save Director",
  },
  data() {
    return {
      dataLoaded: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    Name: { required },
    Image: { required },
  },
  computed: {
    ...mapGetters({
      getDirectorName: "director/GET_CURRENT_ITEM_NAME",
      getDirectorImageName: "director/GET_CURRENT_ITEM_IMAGE_NAME",
      getDirector: "director/GET_CURRENT_ITEM",
    }),
    Name: {
      get() {
        return this.getDirectorName;
      },
      set(value) {
        this.mutSetDirectorName(value);
      },
    },
    Image: {
      get() {
        return this.getDirectorImageName;
      },
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.Name.$dirty) return errors;
      !this.$v.Name.required && errors.push("Имя необходимо");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.Image.$dirty) return errors;
      !this.$v.Image.required && errors.push("Фотография необходима");
      return errors;
    },
  },
  methods: {
    ...mapActions({
      setListOfDirectors: "director/SET_LIST",
      saveNewDirector: "director/SAVE_NEW_DIRECTOR",
      editNewDirector: "director/EDIT_NEW_DIRECTOR",
      setDirectorImage: "director/SET_DIRECTOR_IMAGE",
      uploadOneDirector: "director/UPLOAD_CURRENT_ITEM",
    }),
    ...mapMutations({
      addNewDirector: "director/ADD_NEW_DIRECTOR",
      mutSetDirectorName: "director/SET_CURRENT_NAME",
      mutSetDirectorImageAndImageData: "director/SET_CURRENT_IMAGE",
    }),
    onPosterFileButtonClick() {
      this.$refs.uploaderPoster.click();
    },
    onPosterFileChanged(e) {
      this.setDirectorImage(e.target.files[0]);
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
        this.editNewDirector();
      } else {
        this.saveNewDirector().then(() => {
          this.$v.$reset();
          console.log("OK");
        });
      }
    },
  },
  mounted() {
    if (this.$route.params.id === "new") {
      this.addNewDirector();
    } else {
      this.uploadOneDirector(this.$route.params.id);
    }
  },
};
</script>
