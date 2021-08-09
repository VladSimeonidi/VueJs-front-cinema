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
        <v-card-title> {{ $t("forgotPassword.title") }}</v-card-title>
        <v-card-subtitle>{{ $t("forgotPassword.subtitle") }}</v-card-subtitle>
        <v-card-text>
          <v-text-field
            :label="$t('forgotPassword.emailTextField')"
            :placeholder="$t('forgotPassword.subtitle')"
            v-model="Email"
            :error-messages="emailErrors"
            @input="$v.Email.$touch()"
            @blur="$v.Email.$touch()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="sendMail">
            {{ $t("forgotPassword.btnSendLetter") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="$router.go(-1)">
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
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import myLocale from "@/components/AppLocale.vue";
export default {
  data() {
    return {
      Email: null,
    };
  },
  components: { myLocale },
  mixins: [validationMixin],
  validations: {
    Email: { required, email, maxLength: maxLength(200) },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.Email.$dirty) return errors;
      !this.$v.Email.email &&
        errors.push(this.$t("register.validators.emailValid"));
      !this.$v.Email.required &&
        errors.push(this.$t("register.validators.email"));
      !this.$v.Email.maxLength &&
        errors.push(
          `Количество символов не должно превышать ${this.$v.Email.$params.maxLength.max}`
        );
      return errors;
    },
  },
  methods: {
    ...mapActions({
      FORGOT_PASSWORD: "auth/FORGOT_PASSWORD",
    }),
    sendMail() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );
        return;
      }
      this.FORGOT_PASSWORD({ email: this.Email }).then((res) => {
        if (res.status === 200) {
          this.appAlert(
            "Отправка E-mail",
            `Вам успешно отправлено письмо с инструкцией от e-mail ${res.data.msg.envelope.from} на e-mail ${res.data.msg.envelope.to[0]}`,
            "success"
          );
        } else {
          this.appAlert(
            "Отправка E-mail",
            `Ошибка отправки E-mail: ${res.response.data.msg}`,
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
