import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: localStorage.getItem("locale"),
  fallbackLocale: "ru",
  messages: {
    ru: {
      welcome: "Добро пожаловать",
      and: "и",
      buttons: {
        films: "Фильмы",
        addFilm: "Добавть фильм",
        profile: "Мой профиль",
        logout: "Выйти из учетной записи",
        close: "Закрыть",
      },
      pagesTitles: {
        About: "О нас",
        Director: "Режиссер",
        Film: "Сохранить / Редактировать фильм",
        Films: "Фильмы",
        FilmDetails: "О фильме",
        Home: "Приветствие",
        Login: "Логин",
        Register: "Регистрация",
        NotFound: "Не найдено",
        Profile: "Профиль",
        User: "Пользователь",
      },
      films: {
        extendedSearch: "Расширенный поиск",
        search: "Поиск по названию",
        chooseGenre: "Выберите жанр",
        chooseDirector: "Выберите режиссера",
        chooseYear: "Выберите год",
        seeMore: "рассмотреть подробнее",
        footerText: "Подписывайтесь на нас в социальных сетях!",
        mySite: "Мой сайт",
        noFilms: "Нет фильмов",
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
        validators: {
          onlyEngilsh: "Только латинские буквы",
          minLength: "Минимальное количество символов должно быть",
          maxLength: " Максимальное количество символов должно быть",
          match: "Пароли должны совпадать",
          required: "Обязательно",
          login: "Логин необходим",
          name: "Ф.И.О. необходимо",
          email: "E-mail необходим",
          emailValid: "Электронная почта должна быть валидной",
          password: "Пароль необходим",
          confirmPassword: "Подтверждение пароля необходимо",
        },
      },
      authLayout: {
        login: "Логин",
        register: "Регистрация",
      },
      filmDetails: {
        genre: "Жанр",
        director: "Режиссер",
        directors: "Режиссеры",
        year: "Год производства",
        trailer: "Трейлер",
        description: "Описание",
        noDescrition: "Описание отсутствует",
        rate: {
          voted: "Проголосовали",
          vote: "Поставить рейтинг",
          man: "человек",
          men: "человека",
          confirm: "Оценить",
        },
      },
      intro: {
        welcome: "Добро пожаловать!",
      },
      confirms: {
        message: "Выйти из учетной записи и перейти на страницу логина?",
        ok: "Да",
        no: "Нет",
        logout: "Выйти",
      },
    },
    ua: {
      welcome: "Ласкаво просимо",
      and: "та",
      buttons: {
        films: "Фільми",
        addFilm: "Додати фільм",
        profile: "Мій профіль",
        logout: "Вийти з облікового запису",
        close: "Закрити",
      },
      pagesTitles: {
        About: "Про нас",
        Director: "Режисер",
        Film: "Зберегти / Редагувати фільм",
        Films: "Фільми",
        FilmDetails: "Про фільм",
        Home: "Привітання",
        Login: "Логін",
        Register: "Реєстрація",
        NotFound: "Не знайдено",
        Profile: "Профіль",
        User: "Користувач",
      },
      films: {
        extendedSearch: "Розширений пошук",
        search: "Пошук за назвою",
        chooseGenre: "Оберіть жанр",
        chooseDirector: "Оберіть режисера",
        chooseYear: "Оберіть рік",
        seeMore: "розглянути докладніше",
        footerText: "Підписуйтесь на нас в соціальних мережах!",
        mySite: "Мій сайт",
        noFilms: "Немає фільмів",
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
        name: "П.І.Б.",
        email: "Електронна пошта",
        password: "Пароль",
        confirmPassword: "Підтвердити пароль",
        register: "Реєстрація",
        haveAccount: "Маєте аккаунт?",
        validators: {
          onlyEngilsh: "Тільки латинські букви",
          minLength: "Мінімальна кількість символів має бути",
          maxLength: " Максимальна кількість символів має бути",
          match: "Паролі повинні співпадати",
          required: "обов'язково",
          login: "Логін необхідний",
          name: "П.І.Б. необхідно",
          email: "E-mail необхідний",
          emailValid: "Електронна пошта повинна бути валідна",
          password: "Пароль необхідний",
          confirmPassword: "Підтвердження пароля необхідно",
        },
      },
      authLayout: {
        login: "Логін",
        register: "Реєстрація",
      },
      filmDetails: {
        genre: "Жанр",
        director: "Режисер",
        directors: "Режисери",
        year: "Рік виробництва",
        trailer: "Трейлер",
        description: "Опис",
        noDescrition: "Опис відсутній",
        rate: {
          voted: "Проголосували",
          vote: "Поставити рейтинг",
          man: "користувачів",
          men: "користувача",
          confirm: "Оцінити",
        },
      },
      intro: {
        welcome: "Ласкаво просимо!",
      },
      confirms: {
        message: "Вийти з облікового запису і перейти на сторінку логіна?",
        ok: "Так",
        no: "Ні",
        logout: "Вийти",
      },
    },
    us: {
      welcome: "Welcome",
      and: "and",
      buttons: {
        films: "Films",
        addFilm: "Add film",
        profile: "My profile",
        logout: "Logout",
        close: "Close",
      },
      pagesTitles: {
        About: "About us",
        Director: "Director",
        Film: "Save / Edit film",
        Films: "Films",
        FilmDetails: "About film",
        Home: "Welcome page",
        Login: "Login",
        Register: "Register",
        NotFound: "Not found",
        Profile: "Profile",
        User: "User",
      },
      films: {
        extendedSearch: "Extended search",
        search: "Search by name",
        chooseGenre: "Choose genre",
        chooseDirector: "Сhoose director",
        chooseYear: "Сhoose year",
        seeMore: "see more",
        footerText: "Follow us on our social networks!",
        mySite: "My site",
        noFilms: "No films",
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
        validators: {
          onlyEngilsh: "Only latin letters",
          minLength: "min length should be",
          maxLength: "max length should be",
          match: "Passwords should match",
          required: "required",
          login: "Login required",
          name: "Name required",
          email: "E-mail required",
          emailValid: "E-mail should be valid",
          password: "Password required",
          confirmPassword: "Confirm password required",
        },
      },
      authLayout: {
        login: "Login",
        register: "Registration",
      },
      filmDetails: {
        genre: "Genre",
        director: "Director",
        directors: "Directors",
        year: "Year of release",
        trailer: "Trailer",
        description: "Description",
        noDescrition: "No description",
        rate: {
          voted: "Voted",
          vote: "Put rating",
          man: "people",
          men: "people",
          confirm: "Rate",
        },
      },
      intro: {
        welcome: "Welcome",
      },
      confirms: {
        message: "Sign out and go to the login page?",
        ok: "Yes",
        no: "No",
        logout: "Logout",
      },
    },
  },
});
