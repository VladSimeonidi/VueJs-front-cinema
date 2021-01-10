<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="GETUSER.isAdmin" large icon v-bind="attrs" v-on="on"
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
        <v-btn color="blue darken-1" text @click="saveGenre">
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
      textfieldGenre: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["GETUSER"]),
  },
  methods: {
    ...mapActions({
      addGenre: "genre/SAVE_NEW_ITEM",
      uploadGenresList: "genre/SET_LIST",
    }),
    ...mapGetters({ getAllGenres: "genre/GET_LIST" }),
    async saveGenre() {
      const genreData = {
        name: this.textfieldGenre,
      };
      await this.addGenre(genreData).then(() => {
        this.uploadGenresList().then(() => {
          this.$emit("getGenres", this.getAllGenres());
        });
        this.textfieldGenre = null;
        this.dialog = false;
      });
    },
    close() {
      this.textfieldGenre = null;
      this.dialog = false;
    },
  },
};
</script>
