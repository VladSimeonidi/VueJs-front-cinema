<template>
  <div class="container">
    <form class="form">
      <h2>Название</h2>
      <input v-model="film.name" type="text" class="form__inputName" />
      <h2>Жанр</h2>
      <input v-model="film.genre" type="text" class="form__inputName" />
      <h2>Описание</h2>
      <textarea
        v-model="film.description"
        type="text"
        class="form__description"
        maxlength="120"
      ></textarea>
      <h2>Ссылка</h2>
      <div>
        <input v-model="film.link" type="text" class="form__link" readonly />
        <input type="file" @change="previewFiles" />
      </div>
      <div class="form__buttons">
        <button class="savebutton" @click="save">Сохранить</button>
        <button
          v-if="this.$route.params.id !== 'new'"
          class="back"
          @click="deleteItem(film._id)"
        >
          удалить
        </button>
        <!-- <button class="back" @click="$router.go(-1)">Назад</button> -->
      </div>
    </form>
  </div>
</template>
<script>
import {
  GET_CURRENT_ITEM,
  SET_CURRENT_ITEM,
  SAVE_CURRENT_ITEM,
  EDIT_CURRENT_ITEM,
  DELETE_CURRENT_ITEM,
} from "@/store/mutations-types";
export default {
  data() {
    return {
      film: {
        name: "",
        description: "",
        link: "",
        genre: "",
      },
    };
  },
  methods: {
    previewFiles(event) {
      console.log(event.target.files[0].name);
      this.film.link = event.target.files[0].name;
    },
    save() {
      if (this.$route.params.id !== "new") {
        this.$store
          .dispatch(EDIT_CURRENT_ITEM, this.film)
          .then(() => {
            this.film = this.$store.getters[GET_CURRENT_ITEM];
            this.$router.go(-1);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.$store
          .dispatch(SAVE_CURRENT_ITEM, this.film)
          .then(() => {
            this.film = this.$store.getters[GET_CURRENT_ITEM];
            this.$router.go(-1);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    deleteItem(id) {
      const confirmed = confirm("удалить?");
      if (confirmed) {
        this.$store
          .dispatch(DELETE_CURRENT_ITEM, id)
          .then(() => {
            this.$router.go(-1);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  mounted() {
    if (this.$route.params.id !== "new") {
      this.$store
        .dispatch(SET_CURRENT_ITEM, this.$route.params.id)
        .then(() => {
          this.film = this.$store.getters[GET_CURRENT_ITEM];
          console.log(this.film);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      this.film = {
        name: "",
        description: "",
        link: "",
        genre: "",
      };
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 65px;
}
.form {
  text-align: center;
  max-width: 700px;
  width: 100%;
  min-height: 500px;
  background-color: lightblue;
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
