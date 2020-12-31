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
        <router-link
          :to="{ name: 'editfilm', params: { id: film._id } }"
          class="player__title"
          >{{ film.name }}</router-link
        >
        <div class="player__desc">{{ film.description }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: null,
      srcLink: null,
    };
  },
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
