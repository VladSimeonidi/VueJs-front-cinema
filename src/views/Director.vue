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
            label="Тизер"
            placeholder="Введите тизер"
          ></v-text-field>
          <v-text-field
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
    nameErrors() {
      const errors = [];
      if (!this.$v.Name.$dirty) return errors;
      !this.$v.Name.required && errors.push("Название необходимо");
      return errors;
    },
    imageErrors() {
      const errors = [];
      if (!this.$v.Image.$dirty) return errors;
      !this.$v.Image.required && errors.push("Картинка необходима");
      return errors;
    },
  },
  methods: {
    onPosterFileButtonClick() {
      this.$refs.uploaderPoster.click();
    },
    onPosterFileChanged(e) {
      this.setPosterFile(e.target.files[0]);
      this.setCurrentItemPoster(e.target.files[0].name);
    },
  },
};
</script>
