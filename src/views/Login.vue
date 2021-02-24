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
      <v-checkbox v-model="checkbox" :label="$t('login.asAdmin')"></v-checkbox>
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
    <!-- <v-card-actions>
      <v-btn @click="test" color="green" rounded width="150px" elevation="6"
        >Тест</v-btn
      >
      <v-btn
        @click="testProfile"
        color="green"
        rounded
        width="150px"
        elevation="6"
        >Тест Профиля</v-btn
      >
    </v-card-actions> -->
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { config } from "@/config/config";

export default {
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
    testProfile() {
      this.axios
        .get(config.API.BASE_URL + config.API.USER.PROFILE, {
          withCredentials: true,
        })
        .then((value) => {
          console.log(value);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    test() {
      const user = {
        username: this.username,
        password: this.password,
      };
      console.log(user);
      this.axios
        .post(config.API.BASE_URL + config.API.USER.LOGIN, user, {
          withCredentials: true,
        })
        .catch((e) => {
          console.log(e);
        });
      // this.LOGIN(user)
      //   .then((res) => {
      //     if (res) {
      //       if (res.data.success) {
      //         this.$router.push("/");
      //       }
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
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
        this.$notify({
          group: "AuthError",
          title: "Логин",
          text: message,
          type: "error",
          duration: 5000,
        });
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
