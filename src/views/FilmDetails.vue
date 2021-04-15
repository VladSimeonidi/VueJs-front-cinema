<template>
  <v-main v-cloak v-if="film">
    <v-sheet width="100%" min-height="500px" class="position-relative">
      <v-card-title class="white--text text-h5 text-center">{{
        film.name
      }}</v-card-title>
      <!-- svg -->
      <div class="custom-shape-divider-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <!-- svg -->
    </v-sheet>
    <v-sheet min-height="100vh" color="#00cffa" class="pa-8">
      <v-card-text class="custom-font-style">
        {{ film.description }}
      </v-card-text>
      <v-row no-gutters>
        <v-col cols="3">
          <v-row no-gutters>
            <v-col cols="12">
              <v-subheader
                class="white--text text-h6"
                v-if="film.director.length < 2"
                >{{ $t("filmDetails.director") }}</v-subheader
              >
              <v-subheader class="white--text text-h6" v-else>
                {{ $t("filmDetails.directors") }}
              </v-subheader>

              <v-list-item
                v-for="(director, index) in film.director"
                :key="index"
              >
                <v-list-item-avatar>
                  <v-img :alt="`avatar`" :src="director.image"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="director.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-subheader class="white--text text-h6">{{
                $t("filmDetails.genre")
              }}</v-subheader>

              <v-list-item v-for="(genre, index) in film.genre" :key="index">
                <v-list-item-content>
                  <v-list-item-title v-text="genre.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-center pa-5" cols="9">
          <Media
            :kind="'video'"
            :controls="true"
            :src="film.link"
            :poster="film.poster.file_path"
            :style="{
              width: '70%',
              maxHeight: '600px',
              outline: 'none',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)',
              borderRadius: '10px',
            }"
          >
          </Media>
        </v-col>
      </v-row>
    </v-sheet>
    <Footer />
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Footer from "@/components/AppFooter.vue";
import Media from "@dongido/vue-viaudio";
export default {
  metaInfo: {
    title: "Film Details",
  },
  components: {
    Media,
    Footer,
  },
  data() {
    return {
      film: null,
    };
  },
  created() {
    this.SET_CURRENT_ITEM_AS_DETAILS(this.$route.params.id)
      .then(() => {
        this.film = this.GET_CURRENT_ITEM();
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

<style lang="scss" scoped>
@import url("../assets/css/marck_scriptregular.css");
.custom-font-style {
  font-family: "marck_scriptregular", cursive;
  font-weight: 500;
  font-size: 1.7rem;
  letter-spacing: 3px;
  line-height: 2rem;
}
[v-cloak] {
  display: none;
}
.position-relative {
  position: relative;
  background-image: url("http://test.com:81/cart/pexels.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-position: 0 150%;
}

.custom-shape-divider-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom svg {
  display: block;
  width: calc(100% + 1.3px);
  height: 150px;
  transform: rotateY(180deg);
}

.shape-fill {
  fill: #00cffa;
}
.text-purple-red {
  color: #ff0038;
}
</style>
