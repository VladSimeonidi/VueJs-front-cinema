<template>
  <v-app>
    <v-layout class="center">
      <v-flex class="card">
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                id="username"
                name="username"
                v-model="username"
                :error-messages="usernameErrors"
                label="Логин"
                required
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              ></v-text-field>
              <v-text-field
                id="name"
                name="name"
                v-model="name"
                :error-messages="nameErrors"
                label="Ф.И.О."
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                id="email"
                name="email"
                v-model="email"
                :error-messages="emailErrors"
                label="Электронная почта"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
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
              <v-text-field
                id="confirmpassword"
                name="confirmpassword"
                v-model="confirmpassword"
                :error-messages="confirmPasswordErrors"
                label="Подтвердите пароль"
                required
                @input="$v.confirmpassword.$touch()"
                @blur="$v.confirmpassword.$touch()"
              ></v-text-field>
              <v-card-actions>
                <v-btn @click="registerUser">Регистрация</v-btn>
                <router-link :to="{ name: 'login' }" class="margin-left"
                  >Есть аккаунт?</router-link
                >
                <v-spacer></v-spacer>
                <v-btn @click="clear">
                  Сброс
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required },
    name: { required },
    email: { required, email },
    confirmpassword: { required, sameAs: sameAs("password") },
  },

  data: () => ({
    username: "",
    password: "",
    name: "",
    email: "",
    confirmpassword: "",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Ф.И.О. необходимы");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Имя необходимо");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push("Электронная почта должена быть валидной");
      !this.$v.email.required && errors.push("Электронная почта необходима");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Пароль необходим");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmpassword.$dirty) return errors;
      !this.$v.confirmpassword.required &&
        errors.push("Необходимо подтвердить");
      this.confirmpassword !== this.password &&
        errors.push("Пароли не совпадают");
      return errors;
    },
  },

  methods: {
    ...mapActions("auth", ["REGISTER"]),
    registerUser() {
      console.log(this.$v.$invalid);
      this.$v.$touch();
      if (this.$v.$invalid) return;
      let userData = {
        username: this.username,
        name: this.name,
        password: this.password,
        confirm_password: this.confirmpassword,
        email: this.email,
      };
      this.REGISTER(userData)
        .then((res) => {
          if (res.data.success) {
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
      this.name = "";
      this.confirmpassword = "";
      this.email = "";
    },
  },
};
</script>

<style lang="scss">
.center {
  background-image: url("../assets/register.jpg");
  background-size: 100% 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
.card {
  max-width: 500px !important;
}
.margin-left {
  margin-left: 20px;
}
</style>
