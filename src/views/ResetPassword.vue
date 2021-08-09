<template>
  <v-app>
    <myLocale class="langComponent" />
    <v-container fluid class="d-flex justify-center align-center pa-10 Wrapper">
      <v-card
        dark
        elevation="15"
        max-width="800px"
        width="100%"
        class="card-color"
      >
        <v-card-title>{{ $t("resetPassword.title") }}</v-card-title>
        <v-card-text>
          <v-text-field
            :label="$t('register.password')"
            v-model="Password"
            :error-messages="passwordErrors"
            @input="$v.Password.$touch()"
            @blur="$v.Password.$touch()"
          ></v-text-field>
          <v-text-field
            :label="$t('register.confirmPassword')"
            v-model="confirmPassword"
            :error-messages="confirmPasswordErrors"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="resetPassword">
            {{ $t("buttons.changePassword") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :to="{ name: 'login' }">
            {{ $t("buttons.back") }}
          </v-btn>
          <!-- <v-btn @click="check">
            check
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import myLocale from "@/components/AppLocale.vue";
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  sameAs,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      Password: null,
      confirmPassword: null,
    };
  },
  components: { myLocale },
  mixins: [validationMixin],
  validations: {
    Password: { required, maxLength: maxLength(20), minLength: minLength(5) },
    confirmPassword: {
      required,
      sameAs: sameAs("Password"),
      maxLength: maxLength(20),
      minLength: minLength(5),
    },
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.Password.$dirty) return errors;
      !this.$v.Password.required &&
        errors.push(this.$t("register.validators.password"));
      !this.$v.Password.maxLength &&
        errors.push(
          `${this.$t("register.validators.maxLength")} ${
            this.$v.Password.$params.maxLength.max
          }`
        );
      !this.$v.Password.minLength &&
        errors.push(
          `${this.$t("register.validators.minLength")} ${
            this.$v.Password.$params.minLength.min
          }`
        );
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push(this.$t("register.validators.confirmPassword"));
      this.confirmPassword !== this.Password &&
        errors.push(this.$t("register.validators.match"));
      !this.$v.confirmPassword.maxLength &&
        errors.push(
          `${this.$t("register.validators.maxLength")} ${
            this.$v.confirmPassword.$params.maxLength.max
          }`
        );
      !this.$v.confirmPassword.minLength &&
        errors.push(
          `${this.$t("register.validators.minLength")} ${
            this.$v.confirmPassword.$params.minLength.min
          }`
        );
      return errors;
    },
  },
  methods: {
    ...mapActions({
      RESET_PASSWORD: "auth/RESET_PASSWORD",
    }),
    resetPassword() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );
        return;
      }
      const payload = {
        token: this.$route.params.token,
        password: this.Password,
        confirm_password: this.confirmPassword,
      };
      this.RESET_PASSWORD(payload).then((res) => {
        if (res.status === 200) {
          this.appAlert("Восстановление пароля", `${res.data.msg}`, "success");
          this.$router.push("/login");
        } else {
          this.appAlert(
            "Восстановление пароля",
            `Ошибка сброса пароля: ${res.response.data.msg}`,
            "error"
          );
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.Wrapper {
  min-height: 100vh;
  background: linear-gradient(
    315deg,
    rgba(202, 102, 121, 1) 0%,
    rgba(156, 59, 87, 1) 100%
  );
}
.card-color {
  background: linear-gradient(
    125deg,
    rgba(23, 23, 23, 1) 0%,
    rgba(20, 20, 20, 1) 54%,
    rgba(17, 17, 17, 1) 88%
  );
}
.langComponent {
  max-width: 135px;
  width: 100%;
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
