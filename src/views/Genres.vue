<template>
  <v-main>
    <loading :active.sync="this.Loading" color="blue"></loading>
    <v-container fluid class="container-bgc">
      <v-card v-if="genreArrClone" class="mt-lg-10 crad-bgc">
        <v-card-title
          >Таблица жанров<v-spacer></v-spacer>

          <v-btn rounded @click.stop="openDialog('edit')" class="mr-5"
            ><v-badge
              v-if="editArr.length > 0"
              color="pink"
              offset-x="20px"
              offset-y="-5px"
              :content="editArr.length"
            ></v-badge
            >Редактирование</v-btn
          >

          <v-btn rounded @click.stop="openDialog('save')"
            ><v-badge
              v-if="saveArr.length > 0"
              color="pink"
              offset-x="20px"
              offset-y="-5px"
              :content="saveArr.length"
            ></v-badge
            >Сохранение</v-btn
          ></v-card-title
        >
        <v-card-text>
          <v-simple-table height="325px" fixed-header dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-subtitle-1 text--black">
                    Жанр
                  </th>
                  <th class="text-center text-subtitle-1 text--black">
                    Редактирование
                  </th>
                  <th class="text-center text-subtitle-1 text--black">
                    Удаление
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in genreArrClone" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td class="text-center">
                    <v-btn color="blue" icon @click.stop="edit(item, index)"
                      ><v-icon>mdi-pencil</v-icon></v-btn
                    >
                  </td>
                  <td class="text-center">
                    <v-btn icon color="black" @click="deleteItem(index)"
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="TotalSave">Сохранить</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="cancelAll">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="450" persistent>
      <v-card v-if="editDialog && editArr.length > 0 && !saveDialog">
        <v-card-title class="text-h5">Редактирование</v-card-title>

        <v-card-text>
          <v-text-field
            v-for="(edtgenre, edtgenreIndex) in editArr"
            :key="edtgenreIndex"
            v-model="edtgenre.name"
            @input="$v.editArr.$each[edtgenreIndex].$touch()"
            @blur="$v.editArr.$each[edtgenreIndex].$touch()"
            :error-messages="
              !$v.editArr.$each[edtgenreIndex].name.$dirty
                ? []
                : !$v.editArr.$each[edtgenreIndex].name.required
                ? ['Имя необходимо']
                : !$v.editArr.$each[edtgenreIndex].name.maxLength
                ? ['Максимальная длина 50']
                : null
            "
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="saveEditDialog">
            Сохранить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelEditDialog">
            Отмена
          </v-btn>
        </v-card-actions>
        <v-card-actions
          ><v-btn color="green darken-1" text @click="closeEditDialog">
            Закрыть
          </v-btn></v-card-actions
        >
      </v-card>

      <!-- сохранение -->

      <v-card v-if="saveDialog && saveArr.length > 0 && !editDialog">
        <v-card-title class="text-h5">Сохранение</v-card-title>
        <v-card-text>
          <v-text-field
            v-for="(saveGnre, saveGnreIndex) in saveArr"
            :key="saveGnreIndex"
            @input="$v.saveArr.$each[saveGnreIndex].$touch()"
            @blur="$v.saveArr.$each[saveGnreIndex].$touch()"
            :error-messages="
              !$v.saveArr.$each[saveGnreIndex].name.$dirty
                ? []
                : !$v.saveArr.$each[saveGnreIndex].name.required
                ? ['Имя необходимо']
                : !$v.saveArr.$each[saveGnreIndex].name.maxLength
                ? ['Максимальная длина 50']
                : null
            "
            v-model="saveGnre.name"
          >
          </v-text-field>

          <v-btn icon> <v-icon @click="addField()">mdi-plus</v-icon></v-btn>
          <v-btn icon> <v-icon @click="removeField()">mdi-minus</v-icon></v-btn>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="saveNewGenre">
            Сохранить
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelSaveDialog">
            Отмена
          </v-btn>
        </v-card-actions>
        <v-card-actions
          ><v-btn color="green darken-1" text @click="closeSaveDialog">
            Закрыть
          </v-btn></v-card-actions
        >
      </v-card>
      <v-card v-if="editDialog && editArr.length === 0 && !saveDialog">
        <v-card-title class="text-h5">
          Редактирование
        </v-card-title>

        <v-card-text>
          Нечего редактировать
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeEditDialog">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>
<script>
import { mapState, mapActions } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import LodashDifferenceBy from "lodash/differenceBy";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// const pair = (arr) => {
//   return (value, vm) => {
//     console.log("vm", vm.$data);
//     console.log("value", value);
//     let lowerCasedArr = arr.map((el) => {
//       return el.name.toLowerCase();
//     });
//     console.log("lowerCasedArr", lowerCasedArr);
//     let LowerCasedValue = value.toLowerCase();
//     console.log("LowerCasedValue", LowerCasedValue);
//     let ccc = lowerCasedArr.some((el) => {
//       console.log("el.name", el);
//       console.log("LowerCasedValueinSome", LowerCasedValue);
//       return el == LowerCasedValue;
//     });
//     console.log("ccc", ccc);
//     return ccc;
//   };
// };
export default {
  data() {
    return {
      dialog: false,
      text: null,
      genreArrClone: null,
      editDialog: false,
      saveDialog: false,
      saveArr: [],
      editArr: [],
      deleteArr: [],
      inputSaveValue: "",
      Loading: false,
    };
  },
  components: {
    Loading,
  },
  mixins: [validationMixin],
  validations: {
    saveArr: {
      $each: {
        name: { required, maxLength: maxLength(50) },
      },
    },
    editArr: {
      $each: {
        name: { required, maxLength: maxLength(50) },
      },
    },
  },
  methods: {
    ...mapActions({
      uploadGenresList: "genre/SET_LIST",
      manageMultipleGenres: "genre/SAVE_MULTIPLE",
    }),
    async TotalSave() {
      let errorMsg = null;

      if (this.saveArr.length > 0)
        errorMsg =
          "Не пустые поля в окне сохранения. Сохраните или отмените все данные в окне сохранения. Над кнопками не должно быть чисел";
      if (this.editArr.length > 0)
        errorMsg =
          "Не пустые поля в окне редактирования. Сохраните или отмените все данные в окне редактирования. Над кнопками не должно быть чисел";

      if (errorMsg) {
        this.appAlert("Сохранить", errorMsg, "error", 10000);
        return;
      }
      let difference = LodashDifferenceBy(
        this.genreArrClone,
        this.GenresList,
        "name"
      );
      if (difference.length == 0 && this.deleteArr.length == 0) {
        this.appAlert("Сохранить", "Нечего сохранять и редактировать", "warn");
        return;
      }
      const conf = await this.$confirm(
        "Сохранить все изменения? (Данные пойдут на сервер, если не уверены нажмите нет. Чтобы вернуть все в состояние по умолчанию нажмите отмена)",
        {
          title: "Сохраните все",
          color: "primary",
          buttonFalseText: "Нет",
          buttonTrueText: "Сохранить",
          icon: "mdi-content-save",
        }
      );
      if (conf) {
        let editArrPayload = [];
        let saveArrPayload = [];
        let deleteArrPayload = [];
        difference.forEach((el) => {
          el._id === "new" ? saveArrPayload.push(el) : editArrPayload.push(el);
        });
        deleteArrPayload = this.deleteArr.filter((el) => el._id !== "new");
        const payload = {
          saveArrPayload,
          editArrPayload,
          deleteArrPayload,
        };
        this.Loading = true;
        this.manageMultipleGenres(payload).then((res) => {
          if (res.status === 200) {
            this.genreArrClone = cloneDeep(res.data);
            this.appAlert("Сохранение", "Сохранено успешно!", "success");
          } else {
            this.appAlert(
              "Сохранение",
              `Ошибка сохранения ${res.status} - ${res.data}`,
              "error"
            );
          }
          this.Loading = false;
          this.deleteArr = [];
        });
      } else {
        return;
      }
    },
    edit(item) {
      const coincidenceCheck = this.editArr.find((e) => e._id == item._id);
      if (coincidenceCheck) {
        return;
      } else {
        this.editArr.push(Object.assign({}, item));
      }
    },
    openDialog(dialog) {
      this.dialog = true;
      if (dialog === "save") {
        this.saveDialog = true;
        if (this.saveArr.length == 0)
          this.saveArr.push({
            _id: "new",
            name: "",
          });
      }
      if (dialog === "edit") {
        this.editDialog = true;
      }
    },
    saveEditDialog() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );

        return;
      }
      this.editArr.forEach((value) => {
        let index = this.genreArrClone.findIndex((el) => {
          return el._id == value._id;
        });
        this.genreArrClone[index].name = value.name;
      });
      this.cancelEditDialog();
    },
    saveNewGenre() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.appAlert(
          "Валидация",
          "Заполните все необходимые поля правильно!",
          "error"
        );

        return;
      }
      if (this.$v.$invalid) return;
      if (this.saveArr.length < 2 && !this.saveArr[0].name) {
        return;
      }
      this.genreArrClone = this.genreArrClone.concat(this.saveArr);
      this.cancelSaveDialog();
    },
    addField() {
      const elementName = this.saveArr[this.saveArr.length - 1].name;
      if (!elementName) {
        this.appAlert("Добавить строку", "Заполните предыдущее поле", "error");
        return;
      }
      this.saveArr.push({
        _id: "new",
        name: this.inputSaveValue,
      });
      console.log("this.saveArr", this.saveArr);
    },
    removeField() {
      if (this.saveArr.length > 1) {
        this.saveArr.pop();
      } else {
        this.appAlert(
          "Убрать строку",
          "Просто нажмите отмена или закрыть",
          "error"
        );
      }
    },
    deleteItem(index) {
      const item = this.genreArrClone.splice(index, 1)[0];
      this.deleteArr.push(item);
      const foundEl = this.editArr.find((el) => el.name == item.name);
      const editItemIndex = this.editArr.indexOf(foundEl);
      if (editItemIndex >= 0) this.editArr.splice(editItemIndex, 1);
    },
    cancelAll() {
      this.genreArrClone = cloneDeep(this.GenresList);
      this.deleteArr = [];
      this.saveArr = [];
      this.editArr = [];
      this.$v.$reset();
    },
    closeSaveDialog() {
      this.dialog = false;
      this.saveDialog = false;
      if (this.saveArr.length < 2 && !this.saveArr[0].name) this.saveArr = [];
      this.$v.$reset();
    },
    closeEditDialog() {
      this.dialog = false;
      this.editDialog = false;
      this.$v.$reset();
    },
    cancelSaveDialog() {
      this.$v.$reset();
      this.dialog = false;
      this.saveDialog = false;
      this.saveArr = [];
    },
    cancelEditDialog() {
      this.$v.$reset();
      this.dialog = false;
      this.editDialog = false;
      this.editArr = [];
    },
  },
  computed: {
    ...mapState({ GenresList: (state) => state.genre.list }),
  },
  created() {
    this.uploadGenresList().then((res) => {
      this.genreArrClone = cloneDeep(res);
    });
  },
};
</script>
<style lang="scss" scoped>
.container-bgc {
  min-height: 100vh;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}
.crad-bgc {
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
}
</style>
