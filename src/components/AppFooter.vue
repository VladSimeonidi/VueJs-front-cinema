<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="blue darken-1">
        <v-row no-gutters>
          <v-col cols="12" md="8"
            ><strong class="subheading">{{
              $t("films.footerText")
            }}</strong></v-col
          >
          <v-spacer></v-spacer>
          <v-col cols="12" md="4" class="text-right">
            <v-btn
              target="_blank"
              v-for="(icon, indexFooterIcon) in icons"
              :key="indexFooterIcon"
              :href="icon.link"
              class="mx-4"
              dark
              icon
            >
              <v-icon size="24px"> {{ icon.icon }} </v-icon>
            </v-btn></v-col
          >
        </v-row>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>{{ $t("films.mySite") }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        { icon: "mdi-facebook", link: "https://www.facebook.com/" },
        { icon: "mdi-twitter", link: "https://twitter.com/" },
        { icon: "mdi-linkedin", link: "https://www.linkedin.com/" },
        { icon: "mdi-instagram", link: "https://www.instagram.com/" },
      ],
    };
  },
};
</script>
