export default {
  nameErrors() {
    const errors = [];
    if (!this.$v.Name.$dirty) return errors;
    !this.$v.Name.required && errors.push("Название необходимо");
    !this.$v.Name.maxLength &&
      errors.push(
        `Количество символов не должно превышать ${this.$v.Name.$params.maxLength.max}`
      );
    return errors;
  },
  teaserErrors() {
    const errors = [];
    if (!this.$v.Teaser.$dirty) return errors;
    !this.$v.Teaser.required && errors.push("Тизер необходим");
    !this.$v.Teaser.maxLength &&
      errors.push(
        `Количество символов не должно превышать ${this.$v.Teaser.$params.maxLength.max}`
      );
    return errors;
  },
  descErrors() {
    const errors = [];
    if (!this.$v.Description.$dirty) return errors;
    !this.$v.Description.maxLength &&
      errors.push(
        `Количество символов не должно превышать ${this.$v.Description.$params.maxLength.max}`
      );
    return errors;
  },
  genreErrors() {
    const errors = [];
    if (!this.$v.Genre.$dirty) return errors;
    !this.$v.Genre.required && errors.push("Жанр необходим");
    return errors;
  },
  directorErrors() {
    const errors = [];
    if (!this.$v.Director.$dirty) return errors;
    !this.$v.Director.required && errors.push("Режиссер необходим");
    return errors;
  },
  yearErrors() {
    const errors = [];
    if (!this.$v.Year.$dirty) return errors;
    !this.$v.Year.required && errors.push("Год производства необходим");
    !this.$v.Year.numeric && errors.push("Год производства должен быть числом");
    !this.$v.Year.between &&
      errors.push("Год производства должен быть от 1950 по 2021");
    return errors;
  },
  linkErrors() {
    const errors = [];
    if (!this.$v.Link.$dirty) return errors;
    !this.$v.Link.required && errors.push("Трейлер необходим");
    return errors;
  },
  posterErrors() {
    const errors = [];
    if (!this.$v.Poster.$dirty) return errors;
    !this.$v.Poster.required && errors.push("Постер необходим");
    return errors;
  },
  FacebookErrors() {
    const errors = [];
    if (!this.$v.Facebook.$dirty) return errors;
    !this.$v.Facebook.url && errors.push("Необходмио ввести URL");
    return errors;
  },
  TwitterErrors() {
    const errors = [];
    if (!this.$v.Twitter.$dirty) return errors;
    !this.$v.Twitter.url && errors.push("Необходмио ввести URL");
    return errors;
  },
  InstagramErrors() {
    const errors = [];
    if (!this.$v.Instagram.$dirty) return errors;
    !this.$v.Instagram.url && errors.push("Необходмио ввести URL");
    return errors;
  },
};
