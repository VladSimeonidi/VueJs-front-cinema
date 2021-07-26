<template>
  <div>
    <v-main v-if="Film" class="main-wrapper main-min-height">
      <v-container fluid class="pa-0">
        <v-container fluid class="mb-10 pt-10 header-container text-center">
          <div class="custom-shape-divider-bottom">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
          <Media
            :kind="'video'"
            :controls="true"
            :src="Film.link"
            :style="{
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)',
              maxWidth: '55%',
              width: '100%',
              minWidth: '280px',
              borderRadius: '10px',
            }"
          >
          </Media>
        </v-container>
        <v-container fluid class="mb-5">
          <v-row no-gutters>
            <v-col cols="12">
              <div class="header-styling text-center">
                <span class="nice-title">{{ Film.name }}</span>
              </div>
            </v-col>
            <v-col cols="12" class="mt-10">
              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                show-arrows
                center-active
              >
                <v-tab>
                  {{ $t("filmDetails.description") }}
                </v-tab>
                <v-tab v-if="Film.director.length < 2">
                  {{ $t("filmDetails.director") }} {{ $t("and") }}
                  {{ $t("filmDetails.year") }}
                </v-tab>
                <v-tab v-else>
                  {{ $t("filmDetails.directors") }} {{ $t("and") }}
                  {{ $t("filmDetails.year") }}
                </v-tab>
              </v-tabs>
              <v-tabs-items class="mt-4" v-model="tab">
                <v-tab-item>
                  <div
                    v-if="Film.description.length"
                    class="text-description pa-5"
                  >
                    {{ Film.description }}
                  </div>
                  <div v-else class="text-description pa-5">
                    {{ $t("filmDetails.noDescrition") }}
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <v-row no-gutters
                      ><v-col cols="12" sm="6">
                        <v-list>
                          <v-list-item
                            v-for="(director, index) in Film.director"
                            :key="index"
                          >
                            <v-list-item-avatar size="75">
                              <v-img
                                :alt="`avatar`"
                                :src="director.image"
                              ></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title
                                class="font-weight-medium"
                                v-text="director.name"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item> </v-list
                      ></v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        class="d-flex justify-end align-center text-year"
                      >
                        {{ Film.year }}
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
          <v-card-text v-if="socials.length > 0">
            <v-btn
              target="_blank"
              v-for="(social, index) in socials"
              :key="index"
              class="mx-4"
              color="blue"
              :href="social.link"
              icon
            >
              <v-icon size="28px">{{ social.icon }}</v-icon>
            </v-btn>
          </v-card-text>
        </v-container>
        <v-container fluid class="mb-10 text-center">
          <v-dialog
            transition="dialog-bottom-transition"
            :width="$vuetify.breakpoint.xs ? 270 : 600"
            v-model="dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-hover v-slot="{ hover }">
                <div v-bind="attrs" v-on="on" class="max-width-300">
                  <v-badge
                    :value="hover"
                    color="deep-purple accent-4"
                    :content="
                      Film.rateUsers.length == 2 || Film.rateUsers.length == 3
                        ? `Проголосовали
                    ${Film.rateUsers.length}
                    человека`
                        : `Проголосовали
                    ${Film.rateUsers.length}
                    человек`
                    "
                    left
                    transition="slide-x-transition"
                  >
                  </v-badge>
                  <v-rating
                    :class="{ 'on-hover': hover }"
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half"
                    :color="getRating < 3 ? 'red' : 'primary'"
                    readonly
                    length="5"
                    :size="$vuetify.breakpoint.xs ? 28 : '50'"
                    v-model="getRating"
                  ></v-rating>
                </div>
              </v-hover>
            </template>
            <template>
              <v-card>
                <v-toolbar color="primary" dark>Поставить рейтинг</v-toolbar>
                <v-card-text class="text-center">
                  <v-rating
                    class="mt-6 mb-6"
                    empty-icon="mdi-star-outline"
                    full-icon="mdi-star"
                    half-icon="mdi-star-half"
                    hover
                    v-model="rateOnPage"
                    length="5"
                    :size="$vuetify.breakpoint.xs ? 24 : 50"
                  ></v-rating>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text @click="putRate">Оценить</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text @click="closeRateDialog">Закрыть</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-container>
      </v-container>
    </v-main>
    <v-main class="main-min-height" v-else>
      loading
    </v-main>
    <Footer />
    <loading :active.sync="this.Loading" color="blue" is-full-page></loading>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Footer from "@/components/AppFooter.vue";
import Loading from "vue-loading-overlay";
import Media from "@dongido/vue-viaudio";
export default {
  metaInfo() {
    return { title: this.$t("pagesTitles.FilmDetails") };
  },
  data() {
    return {
      tab: null,
      buttons: [1, 2, 3],
      socials: [],
      dialog: false,
      rateOnPage: 0,
    };
  },
  components: {
    Media,
    Footer,
    Loading,
  },
  computed: {
    ...mapGetters({
      getRating: "film/countRating",
    }),
    ...mapState({
      Film: (state) => state.film.currentItem,
      Loading: (state) => state.film.Loading,
    }),
  },
  methods: {
    ...mapActions({
      uploadCurrentItem: "film/SET_CURRENT_ITEM_AS_DETAILS",
      rateFilm: "film/RATE_FILM",
    }),
    putRate() {
      const saveData = {
        filmId: this.$route.params.id,
        userId: this.$store.state.auth.user._id,
        rate: this.rateOnPage,
      };
      this.rateFilm(saveData)
        .then((res) => {
          if (res.status === 200) {
            this.appAlert(
              "Рейтинг",
              `Вы поставили оценку ${saveData.rate}`,
              "success"
            );
          } else {
            this.appAlert(
              "Рейтинг",
              `Ошибка рейтинга ${res.status} - ${res.data}`,
              "error"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.rateOnPage = 0;
      this.dialog = false;
    },
    closeRateDialog() {
      this.rateOnPage = 0;
      this.dialog = false;
    },
  },
  mounted() {
    this.uploadCurrentItem(this.$route.params.id)
      .then((res) => {
        for (let prop in res.social) {
          if (res.social[prop]) {
            switch (prop) {
              case "facebook":
                this.socials.push({
                  icon: "mdi-facebook",
                  link: res.social[prop],
                });
                break;
              case "twitter":
                this.socials.push({
                  icon: "mdi-twitter",
                  link: res.social[prop],
                });
                break;
              case "instagram":
                this.socials.push({
                  icon: "mdi-instagram",
                  link: res.social[prop],
                });
                break;
            }
          }
        }
      })
      .catch((e) => {
        alert(e);
      });
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap");
@mixin custom-font-style-oswald {
  font-family: "Oswald", sans-serif;
}
.on-hover {
  opacity: 0.6;
  cursor: pointer;
}
.text-year {
  @include custom-font-style-oswald;
  font-size: 48px;
}
.text-description {
  @include custom-font-style-oswald;
  font-size: 18px;
  font-weight: 700;
}
.header-styling {
  transform: translateY(0);
  animation: text-down 1s ease-out;
}
@keyframes text-down {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
}
.main-wrapper {
  background: #fbfafa;
}
.nice-title {
  font: 48px "Oswald", sans-serif;
  letter-spacing: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  color: #fff;
  background: url("../assets/images/animated-text-fill.png") repeat-y;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: aitf 80s linear infinite;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
@keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
.header-container {
  position: relative;
  padding-bottom: 126px;
  background-color: #00b7ff;
  background-image: url("../assets/images/filmDetails/Large-Triangles.svg");
  background-attachment: fixed;
  background-repeat: repeat;
}
.custom-shape-divider-bottom {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 89px;
}

.custom-shape-divider-bottom .shape-fill {
  fill: #fbfafa;
}
.main-min-height {
  min-height: calc(100vh - 106px);
}
</style>
