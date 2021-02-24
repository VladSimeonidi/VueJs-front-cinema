import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: localStorage.getItem("locale"),
  fallbackLocale: "ru",
  messages: {
    ru: {
      films: {
        extendedSearch: "Расширенный поиск",
        search: "Поиск",
        chooseGenre: "Выберите жанр",
        chooseDirector: "Выберите режиссера",
        chooseYear: "Выберите год",
        footerText: "Подписывайтесь на нас в социальных сетях!",
        mySite: "Мой сайт",
      },
      login: {
        login: "Логин",
        password: "Пароль",
        asAdmin: "Войти как администратор?",
        enter: "Войти",
        getAccount: "Получить аккаунт?",
      },
      register: {
        login: "Логин",
        name: "Ф.И.О.",
        email: "Электронная почта",
        password: "Пароль",
        confirmPassword: "Подтвердить пароль",
        register: "Регистрация",
        haveAccount: "Есть аккаунт?",
      },
      authLayout: {
        login: "Логин",
        register: "Регистрация",
      },
    },
    ua: {
      films: {
        extendedSearch: "Розширений пошук",
        search: "Пошук",
        chooseGenre: "Оберіть жанр",
        chooseDirector: "Оберіть режисера",
        chooseYear: "Оберіть рік",
        footerText: "Підписуйтесь на нас в соціальних мережах!",
        mySite: "Мій сайт",
      },
      login: {
        login: "Логін",
        password: "Пароль",
        asAdmin: "Ввійти як адміністратор?",
        enter: "Увійти",
        getAccount: "Отримати аккаунт?",
      },
      register: {
        login: "Логін",
        name: "Ф.І.О.",
        email: "Електронна пошта",
        password: "Пароль",
        confirmPassword: "Підтвердити пароль",
        register: "Реєстрація",
        haveAccount: "Маєте аккаунт?",
      },
      authLayout: {
        login: "Логін",
        register: "Реєстрація",
      },
    },
    us: {
      films: {
        extendedSearch: "Extended search",
        search: "Search",
        chooseGenre: "Choose genre",
        chooseDirector: "Сhoose director",
        chooseYear: "Сhoose year",
        footerText: "Follow us on our social networks!",
        mySite: "My site",
      },
      login: {
        login: "Login",
        password: "Password",
        asAdmin: "Login as an administrator?",
        enter: "Enter",
        getAccount: "Get an account?",
      },
      register: {
        login: "Login",
        name: "Name",
        email: "E-mail",
        password: "Password",
        confirmPassword: "Confirm password",
        register: "Registration",
        haveAccount: "Have an account?",
      },
      authLayout: {
        login: "Login",
        register: "Registration",
      },
    },
  },
});
