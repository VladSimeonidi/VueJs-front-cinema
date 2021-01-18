<template>
  <div>
    <v-btn
      class="position-absolute-btn"
      color="primary"
      dark
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" absolute temporary width="300px">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Редактирование</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-autocomplete
                :search-input.sync="searchFilms"
                color="primary"
                hide-no-data
                dense
                solo-inverted
                @change="selectFilm"
                :items="filmList"
                item-text="name"
                hide-details
                label="Фильмы"
                placeholder="Редактирование фильма"
                return-object
              ></v-autocomplete
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- profile -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-autocomplete
                :search-input.sync="searchUsers"
                color="primary"
                hide-no-data
                dense
                solo-inverted
                @change="selectUser"
                :items="userList"
                item-text="name"
                hide-details
                label="Пользователи"
                placeholder="Редактирование пользователя"
                return-object
              ></v-autocomplete
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Сохранение</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{ name: 'editfilm', params: { id: 'new' } }"
                >Добавить фильм</router-link
              >
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      searchUsers: null,
      searchFilms: null,
      isLoading: false,
      filmList: [],
      userList: [],
    };
  },
  methods: {
    ...mapActions({
      getAutocompleteListFilms: "film/SET_AUTOCOMPLETE_LIST",
      getAutocompleteListUsers: "profile/SET_AUTOCOMPLETE_LIST",
    }),
    selectFilm(val) {
      this.$router.push({ name: "editfilm", params: { id: val._id } });
    },
    selectUser(val) {
      this.$router.push({ name: "userprofile", params: { id: val._id } });
    },
  },
  watch: {
    searchFilms(val) {
      if (val) {
        this.getAutocompleteListFilms(val).then((value) => {
          this.filmList = value;
        });
      } else {
        this.filmList = [];
      }
    },
    searchUsers(val) {
      if (val) {
        this.getAutocompleteListUsers(val).then((value) => {
          this.userList = value;
        });
      } else {
        this.userList = [];
      }
    },
  },
};
</script>

<style scoped>
.position-absolute-btn {
  position: absolute;
  right: 10px;
  top: 60px;
}
</style>
