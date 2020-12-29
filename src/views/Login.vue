<template>
  <v-container class="form">
    <v-card>
      <v-toolbar color="blue darken-1" dark>
        <v-toolbar-title>Логин</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Имя"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="Пароль"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-card-actions>
            <v-btn class="mr-4" @click="submit">Сохранить </v-btn>
            <v-btn @click="clear">
              Очистить
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
    name: { required, maxLength: maxLength(10) },
    password: { required },
  },

  data: () => ({
    name: "",
    password: "",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Имя необходимо");
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
      this.name = "";
      this.password = "";
      this.select = null;
      this.checkbox = false;
    },
  },
};
</script>

<style lang="scss">
.form {
  max-width: 500px;
}
</style>
