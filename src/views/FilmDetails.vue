<template v-if="film.poster.file_path">
  <v-card>
    <v-card-title>{{ film.name }}</v-card-title>
    <v-card-text>
      {{ film.description }}
    </v-card-text>
    <v-card-title>Трейлер</v-card-title>
    <div class="trailer__container">
      <div class="trailer__text">
        <v-card-title>Жанр</v-card-title>
        <v-card-text>
          {{ film.genre }}
        </v-card-text>
        <v-card-title>Год производства</v-card-title>
        <v-card-text>
          {{ film.year }}
        </v-card-text>
      </div>
      <div class="trailer__wrapper">
        <Media 
          :kind="'video'"
          :controls="true"
          :src="film.link"
          :poster="film.poster.file_path"
          :style="{ width: '100%', outline: 'none' }"
        >
        </Media>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Media from "@dongido/vue-viaudio";
export default {
  components: {
    Media,
  },
  data() {
    return {
      film: {},
    };
  },
  created() {
    this.SET_CURRENT_ITEM_AS_DETAILS(this.$route.params.id)
      .then(() => {
        this.film = this.GET_CURRENT_ITEM();
        console.log(this.film);
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    ...mapGetters("film", ["GET_CURRENT_ITEM"]),
    ...mapActions("film", ["SET_CURRENT_ITEM_AS_DETAILS"]),
  },
};
</script>

<style scoped lang="scss">
.trailer__container {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(23, 23, 23, 1) 33%,
    rgba(54, 53, 53, 1) 65%,
    rgba(41, 41, 41, 1) 79%
  );
  display: flex;
  justify-content: space-between;
}
.trailer__text {
  width: 35%;
  color: white;
}
.trailer__wrapper {
  width: 65%;
  padding: 20px;
}
</style>
