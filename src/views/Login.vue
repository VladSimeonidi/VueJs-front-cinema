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
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
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
  metaInfo() {
    return { title: this.$t("pagesTitles.Login") };
  },
  data: () => ({
    username: "",
    password: "",
    checkbox: false,
    error: null,
    showPassword: false,
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
      !this.$v.username.required &&
        errors.push(this.$t("register.validators.login"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(this.$t("register.validators.password"));
      return errors;
    },
  },

  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
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
        this.LOGIN_ADMIN(user)
          .then((res) => {
            if (res.data.success) {
              if (window.innerWidth > 950) {
                this.$router.push("/");
              } else {
                this.$router.push("/films");
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.LOGIN(user)
          .then((res) => {
            if (res) {
              if (res.data.success) {
                if (window.innerWidth > 950) {
                  this.$router.push("/");
                } else {
                  this.$router.push("/films");
                }
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
