<template>
  <div>
    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="purple darken-4">
          <strong class="subheading">{{ $t("films.footerText") }}</strong>

          <v-spacer></v-spacer>

          <v-btn
            target="_blank"
            v-for="(icon, indexFooterIcon) in icons"
            :key="indexFooterIcon"
            :href="icon.link"
            class="mx-4"
            dark
            icon
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>{{ $t("films.mySite") }}</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
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
