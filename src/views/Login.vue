<template>
  <v-app>
    <v-layout class="center">
      <v-flex class="card">
        <v-alert type="error" dark v-if="getError">
          {{ getError }}
        </v-alert>
        <v-card>
          <v-toolbar dark>
            <v-toolbar-title>Логин</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                id="username"
                name="username"
                v-model="username"
                :error-messages="nameErrors"
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
                <v-btn @click="loginUser">Войти</v-btn>
                <router-link :to="{ name: 'register' }" class="margin-left"
                  >Получить аккаунт?</router-link
                >
                <v-spacer></v-spacer>
                <v-btn @click="clear">
                  Сброс
                </v-btn>
              </v-card-actions>
            </v-form>
            <v-checkbox
              v-model="checkbox"
              label="Войти как администратор?"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters({ getError: "auth/ERROR" }),
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
    ...mapActions({ LOGIN: "auth/LOGIN", LOGIN_ADMIN: "auth/LOGIN_ADMIN" }),
    loginUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      console.log(this.username + " " + this.password);
      const user = {
        username: this.username,
        password: this.password,
      };
      if (this.checkbox) {
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
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
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
