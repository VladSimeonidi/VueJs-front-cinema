<template>
  <div>
    <!-- <v-card color="grey lighten-4" flat tile class="fixed">
      <v-toolbar dense>
        <v-btn :to="{ name: 'home' }" mr-auto icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      

        <v-btn :to="{ name: 'editfilm', params: { id: 'new' } }" icon>
          <v-icon>mdi-library-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card> -->
    <v-app-bar color="deep-purple accent-4" dense dark app>
      <v-btn :to="{ name: 'home' }" mr-auto icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'films' }" icon>
        <v-icon>mdi-movie</v-icon>
      </v-btn>

      <v-btn :to="{ name: 'editfilm', params: { id: 'new' } }" icon>
        <v-icon>mdi-library-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
.fixed {
  position: fixed;
}
</style>
