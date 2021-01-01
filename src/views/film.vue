<template>
  <div class="filmWrapper">
    <v-card class="form">
      <v-card-title
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
      </v-card-text>
      <v-card-actions>
        <v-btn @click="save">
          Сохранить
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$router.go(-1)">
          Назад
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      film: {},
    };
  },
  computed: mapGetters("auth", ["GETUSER"]),
  methods: {
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
      console.log(this.GETUSER);
      this.film.link = e.name;
    },
    save() {
      if (this.$route.params.id !== "new") {
        this.EDIT_CURRENT_ITEM(this.film)
          .then(() => {
            this.SET_CURRENT_ITEM(this.film._id).then(() => {
              this.$router.go(-1);
            });
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.SAVE_CURRENT_ITEM(this.film)
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
          console.log(this.film);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      this.ADD_NEW_ITEM()
        .then(() => {
          this.film = this.GET_CURRENT_ITEM();
          console.log(this.film);
        })
        .catch((e) => {
          alert(e);
        });
    }
  },
};
</script>

<style scoped lang="scss">
.filmWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/37975-gorod_ogni_nebo_otrajenie.jpg");
  padding: 20px 0;
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
