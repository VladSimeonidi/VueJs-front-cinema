<template>
  <v-layout class="justify-center align-center">
    <v-card width="100%" max-width="700px" outlined>
      <v-card-title>Редактирование пользователя</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="Name"
          :error-messages="nameErrors"
          @input="$v.Name.$touch()"
          @blur="$v.Name.$touch()"
          label="Ф.И.О"
        ></v-text-field>

        <v-text-field
          v-model="UserName"
          :error-messages="usernameErrors"
          @input="$v.UserName.$touch()"
          @blur="$v.UserName.$touch()"
          label="Логин"
        ></v-text-field>

        <v-text-field
          v-model="Password"
          :error-messages="passwordErrors"
          label="Пароль"
          @input="$v.Password.$touch()"
          @blur="$v.Password.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="Email"
          :error-messages="emailErrors"
          @input="$v.Email.$touch()"
          @blur="$v.Email.$touch()"
          label="Электронная почта"
        ></v-text-field>
        <v-checkbox v-model="checkbox" label="Сделать администратором?" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="save">Сохранить</v-btn>
        <v-btn @click="$router.go(-1)">Назад</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      checkbox: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    Name: { required },
    UserName: { required },
    Password: { required },
    Email: { required, email },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.Name.$dirty) return errors;
      !this.$v.Name.required && errors.push("Ф.И.О. необходимы");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.UserName.$dirty) return errors;
      !this.$v.UserName.required && errors.push("Логин необходим");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.Password.$dirty) return errors;
      !this.$v.Password.required && errors.push("Пароль необходим");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.Email.$dirty) return errors;
      !this.$v.Email.email &&
        errors.push("Электронная почта должена быть валидной");
      !this.$v.Email.required && errors.push("Электронная почта необходима");
      return errors;
    },
    Name: {
      get() {
        return this.getUserName();
      },
      set(value) {
        console.log(this.$v);
        this.setUserName(value);
      },
    },
    UserName: {
      get() {
        return this.getUserLogin();
      },
      set(value) {
        this.setUserLogin(value);
      },
    },
    Email: {
      get() {
        return this.getUserEmail();
      },
      set(value) {
        this.setUserEmail(value);
      },
    },
    Password: {
      get() {
        return this.getUserPassword();
      },
      set(value) {
        this.setUserPassword(value);
      },
    },
    SetAdmin: {
      get() {
        return this.getUserAdmin();
      },
      set(value) {
        if (this.checkbox) {
          this.setUserAdmin(value);
        }
      },
    },
  },
  methods: {
    ...mapActions({
      uploadUserProfile: "profile/SET_CURRENT_USER",
      editUser: "profile/EDIT_CURRENT_USER",
    }),
    ...mapGetters({
      getUserName: "profile/GET_NAME",
      getUserLogin: "profile/GET_USERNAME",
      getUserEmail: "profile/GET_EMAIL",
      getUserPassword: "profile/GET_PASSWORD",
      getUserAdmin: "profile/GET_ADMIN",
    }),

    ...mapMutations({
      setUserName: "profile/SET_USER_NAME",
      setUserLogin: "profile/SET_USER_USERNAME",
      setUserEmail: "profile/SET_USER_EMAIL",
      setUserPassword: "profile/SET_USER_PASSWORD",
      setUserAdmin: "profile/SET_USER_ADMIN",
    }),
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.editUser();
      this.$router.go(-1);
    },
  },
  created() {
    this.uploadUserProfile(this.$route.params.id);
  },
};
</script>
