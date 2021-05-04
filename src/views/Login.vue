<template>
  <div>
    <v-card-text>
      <v-text-field
        id="username"
        name="username"
        v-model="username"
        :error-messages="nameErrors"
        :label="$t('login.login')"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      ></v-text-field>
      <v-text-field
        id="password"
        name="password"
        v-model="password"
        :error-messages="passwordErrors"
        :label="$t('login.password')"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-switch
        color="cyan accent-3"
        v-model="checkbox"
        :label="$t('login.asAdmin')"
      ></v-switch>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="cyan accent-3"
        rounded
        width="150px"
        elevation="6"
        @click="loginUser"
        >{{ $t("login.enter") }}</v-btn
      >
      <router-link :to="{ name: 'register' }" class="margin-left">{{
        $t("login.getAccount")
      }}</router-link>
    </v-card-actions>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  metaInfo: {
    title: "Login",
  },
  data: () => ({
    username: "",
    password: "",
    checkbox: false,
    error: null,
  }),
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(10) },
    password: { required },
  },

  computed: {
    authErrorOnPage() {
      return this.getError();
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
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
    ...mapMutations({ mut_CLEAR_ERROR: "auth/CLEAR_ERROR" }),
    ...mapActions({ LOGIN: "auth/LOGIN", LOGIN_ADMIN: "auth/LOGIN_ADMIN" }),
    ...mapGetters({ getError: "auth/ERROR" }),
    clearError() {
      this.mut_CLEAR_ERROR();
    },
    loginUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );

        return;
      }
      const user = {
        username: this.username,
        password: this.password,
      };
      if (this.checkbox) {
        console.log("LOGIN ADMIN");
        this.LOGIN_ADMIN(user)
          .then((res) => {
            if (res.data.success) {
              this.$router.push("/");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log("LOGIN USER");
        this.LOGIN(user)
          .then((res) => {
            if (res) {
              if (res.data.success) {
                this.$router.push("/");
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  watch: {
    authErrorOnPage: function(message) {
      if (message) {
        this.appAlert("Логин", message, "error");
      }
    },
  },
  created() {
    this.mut_CLEAR_ERROR();
  },
};
</script>
<style lang="scss" scoped>
.myAlert {
  position: absolute;
  width: 100%;
}
</style>
