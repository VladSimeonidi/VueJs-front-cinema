<template>
  <div>
    <button
      class="myButton big-button myButton-position"
      @click.stop="drawer = !drawer"
    >
      Панель
    </button>
    <!-- <v-btn
      class="profileButton position-absolute-btn"
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-settings</v-icon>
    </v-btn> -->
    <v-navigation-drawer v-model="drawer" absolute temporary width="300px">
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
        <!-- director -->
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-autocomplete
                :search-input.sync="searchDirectors"
                color="primary"
                hide-no-data
                dense
                solo-inverted
                @change="selectDirector"
                :items="directorList"
                item-text="name"
                hide-details
                label="Режиссеры"
                placeholder="Редактирование режиссера"
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
              <v-btn
                block
                tile
                :to="{ name: 'editfilm', params: { id: 'new' } }"
                >Добавить фильм</v-btn
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
      searchDirectors: null,
      isLoading: false,
      filmList: [],
      userList: [],
      directorList: [],
    };
  },
  methods: {
    ...mapActions({
      getAutocompleteListFilms: "film/SET_AUTOCOMPLETE_LIST",
      getAutocompleteListUsers: "profile/SET_AUTOCOMPLETE_LIST",
      getAutocompleteListDirectors: "profile/SET_AUTOCOMPLETE_LIST_DIRECTORS",
    }),
    selectFilm(val) {
      this.$router.push({ name: "editfilm", params: { id: val._id } });
    },
    selectUser(val) {
      this.$router.push({ name: "userprofile", params: { id: val._id } });
    },
    selectDirector(val) {
      this.$router.push({ name: "director", params: { id: val._id } });
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
    searchDirectors(val) {
      if (val) {
        this.getAutocompleteListDirectors(val).then((value) => {
          this.directorList = value;
        });
      } else {
        this.directorList = [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
$colorShadeA: rgb(106, 152, 163);
$colorShadeB: rgb(121, 165, 186);
$colorShadeC: rgb(150, 225, 232);
$colorShadeD: rgb(187, 227, 232);
$colorShadeE: rgb(205, 243, 255);

.myButton-position {
  position: absolute;
  right: 10px;
  top: 60px;
}
.myButton {
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: 1rem;
  color: $colorShadeA;
  font-weight: 700;
  text-transform: uppercase;
  font-family: inherit;
}

.myButton.big-button {
  padding: 0.3em 1.5em;
  border: 2px solid $colorShadeA;
  border-radius: 1em;
  background: $colorShadeE;
  transform-style: preserve-3d;
  transition: all 175ms cubic-bezier(0, 0, 1, 1);
}
.myButton.big-button::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $colorShadeC;
  border-radius: inherit;
  box-shadow: 0 0 0 1px $colorShadeB, 0 0.5em 0 0 $colorShadeA;
  transform: translate3d(0, 0.75em, -1em);
  transition: all 175ms cubic-bezier(0, 0, 1, 1);
}

.myButton.big-button:hover {
  background: $colorShadeD;
  transform: translate(0, 0.375em);
}

.myButton.big-button:hover::before {
  transform: translate3d(0, 0.75em, -1em);
}

.myButton.big-button:active {
  transform: translate(0em, 0.75em);
}

.myButton.big-button:active::before {
  transform: translate3d(0, 0, -1em);

  box-shadow: 0 0 0 2px $colorShadeB, 0 0.25em 0 0 $colorShadeB;
}
</style>
