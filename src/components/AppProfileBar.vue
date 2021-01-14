<template>
  <div>
    <v-btn
      class="position-absolute-btn"
      color="primary"
      dark
      @click.stop="drawer = !drawer"
    >
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            aa
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <v-text-field dense></v-text-field
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>
.position-absolute-btn {
  position: absolute;
  right: 10px;
  top: 60px;
}
</style>
