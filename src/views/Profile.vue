<template>
  <v-app>
    <v-layout class="justify-center align-center">
      <v-card min-width="700px" outlined>
        <v-card-title>Профиль пользователя</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="GETUSER.name"
            readonly
            label="Ф.И.О"
          ></v-text-field>

          <v-text-field
            v-model="GETUSER.username"
            readonly
            label="Логин"
          ></v-text-field>

          <v-text-field
            v-model="GETUSER.email"
            readonly
            label="Электронная почта"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="$router.go(-1)">Назад</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters("auth", ["GETUSER"]),
  methods: {
    ...mapActions("auth", ["GET_PROFILE"]),
  },
  created() {
    this.GET_PROFILE();
  },
};
</script>

<style></style>
