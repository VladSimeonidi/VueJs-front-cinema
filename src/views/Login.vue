<template>
  <v-container fluid>
    <v-card class="form pa-10">
      <v-toolbar color="blue darken-1" dark>
        <v-toolbar-title>Логин</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            id="username"
            name="username"
            v-model="username"
            :error-messages="nameErrors"
            :counter="10"
            label="Логин"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          ></v-text-field>
          <v-text-field
            id="password"
            name="password"
            v-model="password"
            :error-messages="passwordErrors"
            label="Пароль"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-card-actions>
            <v-btn @click="submit">Войти</v-btn>
            <router-link :to="{ name: 'register' }" class="margin-left"
              >Получить аккаунт?</router-link
            >
            <v-spacer></v-spacer>
            <v-btn @click="clear">
              Сброс
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required },
  },

  data: () => ({
    username: "",
    password: "",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.username.required && errors.push("Имя необходимо");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Пароль необходим");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss">
.form {
  max-width: 500px;
}
.margin-left {
  margin-left: 20px;
}
</style>
