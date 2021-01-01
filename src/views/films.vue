<template>
  <div>
    <div class="container">
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
    <v-card-actions class="centerPag">
      <v-pagination
        v-model="currentSelectedPage"
        :length="paginatonsCounter"
      ></v-pagination>
    </v-card-actions>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      listTotal: null,
      pageSet: {
        pageNumber: 1,
        pageSize: 4,
      },
      paginatonsCounter: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["GETUSER"]),
    currentSelectedPage: {
      get() {
        return this.pageSet.pageNumber;
      },
      set(value) {
        this.pageSet.pageNumber = value;
        this.SET_LIST(this.pageSet).then(() => {
          this.list = this.GET_LIST();
          this.listTotal = this.GET_LIST_TOTAL();
          this.paginatonsCounter = Math.ceil(
            this.listTotal / this.pageSet.pageSize
          );
        });
      },
    },
  },
  methods: {
    ...mapActions("film", ["SET_LIST"]),
    ...mapGetters("film", ["GET_LIST", "GET_LIST_TOTAL"]),
  },
  mounted() {
    this.SET_LIST(this.pageSet).then(() => {
      this.list = this.GET_LIST();
      this.listTotal = this.GET_LIST_TOTAL();
      this.paginatonsCounter = Math.ceil(
        this.listTotal / this.pageSet.pageSize
      );
      console.log(this.paginatonsCounter);
    });

    console.log(this.list);
  },
};
</script>
<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");
.container {
  display: flex;
  justify-content: space-between;
  padding: 0 3%;
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
.centerPag {
  justify-content: center;
}
</style>
