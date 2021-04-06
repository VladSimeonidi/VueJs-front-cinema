<template>
  <div>
    <v-card-text>
      <v-text-field
        id="username"
        name="username"
        v-model="username"
        :error-messages="usernameErrors"
        :label="$t('register.login')"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      ></v-text-field>
      <v-text-field
        id="name"
        name="name"
        v-model="name"
        :error-messages="nameErrors"
        :label="$t('register.name')"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        id="email"
        name="email"
        v-model="email"
        :error-messages="emailErrors"
        :label="$t('register.email')"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        id="password"
        name="password"
        v-model="password"
        :error-messages="passwordErrors"
        :label="$t('register.password')"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-text-field
        id="confirmpassword"
        name="confirmpassword"
        v-model="confirmpassword"
        :error-messages="confirmPasswordErrors"
        :label="$t('register.confirmPassword')"
        required
        @input="$v.confirmpassword.$touch()"
        @blur="$v.confirmpassword.$touch()"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="cyan accent-3"
        rounded
        width="150px"
        elevation="6"
        @click="registerUser"
        >{{ $t("register.register") }}</v-btn
      >
      <router-link :to="{ name: 'login' }" class="margin-left">{{
        $t("register.haveAccount")
      }}</router-link>
    </v-card-actions>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  metaInfo: {
    title: "Register",
  },
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(20) },
    password: { required, maxLength: maxLength(20), minLength: minLength(5) },
    name: { required, maxLength: maxLength(100) },
    email: { required, email, maxLength: maxLength(100) },
    confirmpassword: {
      required,
      sameAs: sameAs("password"),
      maxLength: maxLength(20),
      minLength: minLength(5),
    },
  },

  data: () => ({
    username: "",
    password: "",
    name: "",
    email: "",
    confirmpassword: "",
  }),

  computed: {
    authErrorOnPage() {
      return this.getError();
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Ф.И.О. необходимы");
      !this.$v.name.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.name.$params.maxLength.max}`
        );
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Имя необходимо");
      !this.$v.username.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.username.$params.maxLength.max}`
        );
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push("Электронная почта должена быть валидной");
      !this.$v.email.required && errors.push("Электронная почта необходима");
      !this.$v.email.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.email.$params.maxLength.max}`
        );
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Пароль необходим");
      !this.$v.password.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.password.$params.maxLength.max}`
        );
      !this.$v.password.minLength &&
        errors.push(
          `Количество символов должно быть больше ${this.$v.password.$params.minLength.min}`
        );
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmpassword.$dirty) return errors;
      !this.$v.confirmpassword.required &&
        errors.push("Необходимо подтвердить");
      this.confirmpassword !== this.password &&
        errors.push("Пароли не совпадают");
      !this.$v.confirmpassword.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.confirmpassword.$params.maxLength.max}`
        );
      !this.$v.confirmpassword.minLength &&
        errors.push(
          `Количество символов должно быть больше ${this.$v.confirmpassword.$params.minLength.min}`
        );
      return errors;
    },
  },

  methods: {
    ...mapMutations({ mut_CLEAR_ERROR: "auth/CLEAR_ERROR" }),
    ...mapActions("auth", ["REGISTER"]),
    ...mapGetters({ getError: "auth/ERROR" }),
    registerUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$notify({
          group: "filmError",
          title: "Валидация",
          text: "Заполните все необходимые поля правильно!",
          type: "error",

          max: 3,
          duration: 5000,
        });
        return;
      }
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
  },
  watch: {
    authErrorOnPage: function(message) {
      if (message) {
        this.$notify({
          group: "AuthError",
          title: "Регистрация",
          text: message,
          type: "error",
          duration: 5000,
        });
      }
    },
  },
  created() {
    this.mut_CLEAR_ERROR();
    console.log(this.$v.password.$params);
  },
};
</script>

<style lang="scss">
.card {
  max-width: 500px !important;
}
.margin-left {
  margin-left: 20px;
}
</style>
