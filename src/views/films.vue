<template>
  <div>
    <div v-if="list" class="container">
      <div v-for="(film, index) in list" :key="index" class="palyer__wrapper">
        <div class="player">
          <vue-plyr>
            <video controls crossorigin playsinline>
              <source size="720" :src="film.link" />
            </video>
          </vue-plyr>
        </div>
        <div class="player__title">
          {{ film.name }}
          <v-btn
            v-if="GETUSER.isAdmin"
            icon
            :to="{ name: 'editfilm', params: { id: film._id } }"
            ><v-icon>mdi-table-edit</v-icon></v-btn
          >
        </div>
        <div class="player__desc">{{ film.teaser }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: null,
      srcLink: null,
    };
  },
  computed: mapGetters("auth", ["GETUSER"]),

  mounted() {
    console.log(this.$store);
    this.$store.dispatch("film/SET_LIST").then(() => {
      this.list = this.$store.getters["film/GET_LIST"];
    });
  },
};
</script>
<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
.container {
  display: flex;
  justify-content: space-between;
  padding: 45px 3%;
  flex-wrap: wrap;
  padding-top: 70px;
}
.palyer__wrapper {
  margin: 0 10px 0;
  flex-basis: 48%;
}
.player__title {
  display: block;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
  font-family: "Russo One", sans-serif;
}
.player__desc {
  text-align: center;
  margin-bottom: 10px;
  font-family: "Arial", sans-serif;
}
</style>
