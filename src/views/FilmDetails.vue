<template>
  <v-main v-if="!Loading">
    <v-sheet
      width="100%"
      min-height="500px"
      class="d-flex justify-center position-relative"
    >
      <div class="header-styling">{{ Film.name }}</div>
      <!-- svg -->
      <!-- <div class="custom-shape-divider-bottom">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            class="shape-fill"
          ></path>
        </svg>
      </div> -->
      <!-- svg -->
    </v-sheet>
    <v-sheet min-height="100vh" color="blue" class="pa-8">
      <v-row no-gutters class="mb-10">
        <v-col cols="4">
          <v-row no-gutters>
            <v-col cols="8">
              <v-subheader
                class="white--text text-h6"
                v-if="Film.director.length < 2"
                >{{ $t("filmDetails.director") }}</v-subheader
              >
              <v-subheader class="white--text text-h6" v-else>
                {{ $t("filmDetails.directors") }}
              </v-subheader>

              <v-list-item
                v-for="(director, index) in Film.director"
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
            <v-col cols="4">
              <v-subheader class="white--text text-h6">{{
                $t("filmDetails.genre")
              }}</v-subheader>

              <v-list-item v-for="(genre, index) in Film.genre" :key="index">
                <v-list-item-content>
                  <v-list-item-title v-text="genre.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-right" cols="8">
          <Media
            :kind="'video'"
            :controls="true"
            :src="Film.link"
            :poster="Film.poster.file_path"
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
      <v-card outlined color="#fff">
        <v-card-text class="custom-font-style">
          {{ Film.description }}
        </v-card-text></v-card
      >
    </v-sheet>
    <Footer />
  </v-main>
  <v-main v-else>
    loading
  </v-main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Footer from "@/components/AppFooter.vue";
import Media from "@dongido/vue-viaudio";
export default {
  metaInfo: {
    title: "Film Details",
  },
  data() {
    return {
      Loading: true,
    };
  },
  components: {
    Media,
    Footer,
  },
  computed: {
    ...mapState({
      Film: (state) => state.film.currentItem,
    }),
  },
  methods: {
    ...mapActions({ uploadCurrentItem: "film/SET_CURRENT_ITEM_AS_DETAILS" }),
  },
  mounted() {
    this.uploadCurrentItem(this.$route.params.id)
      .then(() => {
        this.Loading = false;
      })
      .catch((e) => {
        alert(e);
      });
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

.position-relative {
  position: relative;
  background-image: url("../assets/images/pexels.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-position: 0 150%;
}

// .custom-shape-divider-bottom {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   overflow: hidden;
//   line-height: 0;
// }

// .custom-shape-divider-bottom svg {
//   position: relative;
//   display: block;
//   width: calc(100% + 1.3px);
//   height: 110px;
// }

// .shape-fill {
//   fill: #fae3d2;
// }
.text-purple-red {
  color: #ff0038;
}
.header-styling {
  color: #fff;
  font-size: 3rem;
  transform: translateY(30px);
  animation: text-down 1s ease-out;
}
@keyframes text-down {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(30px);
  }
}
</style>
