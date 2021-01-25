<template>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      newDirector: {
        name: "",
        image: "",
        films: [],
      },
      newDirectorImage: {},
    };
  },
  methods: {
    ...mapActions({
      setListOfDirectors: "director/SET_LIST",
      saveNewDirector: "director/SAVE_NEW_DIRECTOR",
    }),
    ...mapGetters({
      getAllDirectors: "director/GET_LIST",
    }),
    getDirectorPicture(e) {
      this.newDirectorImage = e;
    },
    saveDirector() {
      this.saveNewDirector([this.newDirectorImage, this.newDirector]).then(
        () => {
          this.setListOfDirectors().then((value) => {
            this.$emit("getDirectors", value);
          });
          this.newDirectorImage = null;
          this.dialog = false;
          this.newDirector = {
            name: "",
            image: "",
            films: [],
          };
        }
      );
    },
  },
};
</script>
