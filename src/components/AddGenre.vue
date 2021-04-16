<template>
  <v-dialog v-if="admin" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="admin" large icon v-bind="attrs" v-on="on"
        ><v-icon color="blue">mdi-library-plus</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Добавить жанр</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="textfieldGenre"
                label="Название"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          Закрыть
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      admin: null,
      alert: false,
      dialog: false,
      textfieldGenre: null,
    };
  },
  computed: {
    ...mapState({ GenresList: (state) => state.genre.list }),
  },
  methods: {
    ...mapActions({
      SaveGenre: "genre/SAVE_NEW_ITEM",
      uploadGenresList: "genre/SET_LIST",
      getProfile: "auth/GET_PROFILE",
    }),
    async save() {
      const genreData = {
        name: this.textfieldGenre,
      };
      await this.SaveGenre(genreData)
        .then(() => {
          this.uploadGenresList().then(() => {
            this.$emit("getGenres", this.GenresList);
          });
          this.textfieldGenre = null;
          this.dialog = false;
        })
        .catch(() => {
          this.alert = true;
        });
    },
    close() {
      this.textfieldGenre = null;
      this.dialog = false;
    },
  },
  created() {
    this.getProfile().then((res) => {
      this.admin = res.admin;
    });
  },
};
</script>
