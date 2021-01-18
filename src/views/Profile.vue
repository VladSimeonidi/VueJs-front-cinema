<template>
  <v-layout v-if="user" class="justify-center align-center">
    <addDirector />
    <v-card width="100%" max-width="700px" outlined>
      <v-card-title v-if="admin"
        >Профиль пользователя (Администратор)</v-card-title
      >
      <v-card-title v-else>Профиль пользователя</v-card-title>
      <v-card-text>
        <v-text-field v-model="user.name" readonly label="Ф.И.О"></v-text-field>

        <v-text-field
          v-model="user.username"
          readonly
          label="Логин"
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          readonly
          label="Электронная почта"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.go(-1)">Назад</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import addDirector from "@/components/AppProfileBar.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: null,
      admin: null,
    };
  },
  components: {
    addDirector,
  },
  methods: {
    ...mapActions("auth", ["GET_PROFILE"]),
  },
  created() {
    this.GET_PROFILE().then((res) => {
      this.user = res.user;
      this.admin = res.admin;
    });
  },
};
</script>
