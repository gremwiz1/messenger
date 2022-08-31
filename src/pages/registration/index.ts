import Button from "../../component/button";
import InputElement from "../../component/input-element";
import authController from "../../controllers/auth-controller";
import Router from "../../utils/router";
import { IUser } from "../../utils/types";
import {
  checkRepeatPassword,
  emailValidate,
  firstNameValidate,
  loginValidate,
  passwordValidate,
  phoneValidate,
  secondNameValidate,
} from "../../utils/validate";

const router = new Router();
let ButtonSubmit = new Button({
  title: "Зарегистрироваться",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement
      );
      const data = {
        email: formData.get("email")?.toString(),
        login: formData.get("login")?.toString(),
        first_name: formData.get("firstName")?.toString(),
        second_name: formData.get("secondName")?.toString(),
        password: formData.get("password")?.toString(),
        phone: formData.get("phone")?.toString(),
        password_repeat: formData.get("passwordRepeat")?.toString(),
      };
      if (
        emailValidate(data.email) &&
        loginValidate(data.login) &&
        firstNameValidate(data.first_name) &&
        secondNameValidate(data.second_name) &&
        passwordValidate(data.password) &&
        phoneValidate(data.phone) &&
        checkRepeatPassword(data.password, data.password_repeat)
      ) {
        authController.signup(data as IUser).then((res) => {
          if (res.status === 200) {
            authController.getUserInfo().then((res) => {
              if (res.data?.id) {
                router.go("/messenger");
              } else {
                console.log("Не удалось получить информацию о пользователе");
              }
            });
          } else {
            console.log("Не удалось зарегистрировать пользователя");
          }
        });
      }
    },
  },
});

let InputEmail = new InputElement({
  labelText: "Почта",
  typeInput: "email",
  idInput: "idEmail",
  nameInput: "email",
  spanId: "email-input-error",
  placeholderInput: "pochta@yandex.ru",
  errorText: "Некорректный адрес почты",
  events: {
    blur: function () {
      const error = document.getElementById("email-input-error");
      if (error) {
        error.hidden = emailValidate(this.value) || this.value === "";
      }
    },
  },
});

let InputLogin = new InputElement({
  labelText: "Логин",
  typeInput: "text",
  idInput: "idLoginRegistration",
  nameInput: "login",
  spanId: "login-input-error",
  errorText: "Некорректный логин",
  events: {
    blur: function () {
      const error = document.getElementById("login-input-error");
      if (error) {
        error.hidden = loginValidate(this.value) || this.value === "";
      }
    },
  },
});

let InputFirstName = new InputElement({
  labelText: "Имя",
  typeInput: "text",
  idInput: "idFirstName",
  nameInput: "firstName",
  spanId: "firstName-input-error",
  placeholderInput: "Имя",
  errorText: "Некорректное имя",
  events: {
    blur: function () {
      const error = document.getElementById("firstName-input-error");
      if (error) {
        error.hidden = firstNameValidate(this.value) || this.value === "";
      }
    },
  },
});

let InputSecondName = new InputElement({
  labelText: "Фамилия",
  typeInput: "text",
  idInput: "idSecondName",
  nameInput: "secondName",
  spanId: "secondName-input-error",
  placeholderInput: "Фамилия",
  errorText: "Некорректная фамилия",
  events: {
    blur: function () {
      const error = document.getElementById("secondName-input-error");
      if (error) {
        error.hidden = secondNameValidate(this.value) || this.value === "";
      }
    },
  },
});

let InputPhone = new InputElement({
  labelText: "Телефон",
  typeInput: "tel",
  idInput: "idPhone",
  nameInput: "phone",
  spanId: "phone-input-error",
  errorText: "Неправильный номер телефона",
  events: {
    blur: function () {
      const error = document.getElementById("phone-input-error");
      if (error) {
        error.hidden = phoneValidate(this.value) || this.value === "";
      }
    },
  },
});

let InputPassword = new InputElement({
  labelText: "Пароль",
  typeInput: "password",
  idInput: "idPassword",
  nameInput: "password",
  spanId: "password-input-error",
  errorText: "Некорректный пароль",
  events: {
    blur: function () {
      const error = document.getElementById("password-input-error");
      if (error) {
        error.hidden = passwordValidate(this.value) || this.value === "";
      }
    },
  },
});

let InputRepeatPassword = new InputElement({
  labelText: "Пароль (еще раз)",
  typeInput: "password",
  idInput: "idPasswordRepeat",
  nameInput: "passwordRepeat",
  spanId: "password-repeat-input-error",
  errorText: "Пароли не совпадают",
  events: {
    blur: function () {
      const error = document.getElementById("password-repeat-input-error");
      const passwordInput = document.getElementById(
        "idPassword"
      ) as HTMLInputElement;
      const password = passwordInput.value;
      if (error) {
        error.hidden =
          checkRepeatPassword(this.value, password) || this.value === "";
      }
    },
  },
});

export const registrationProps = {
  formTitle: "Регистрация",
  InputEmail: InputEmail,
  InputLogin: InputLogin,
  InputFirstName: InputFirstName,
  InputSecondName: InputSecondName,
  InputPhone: InputPhone,
  InputPassword: InputPassword,
  InputRepeatPassword: InputRepeatPassword,
  link: "/",
  linkText: "Войти",
  ButtonSubmit: ButtonSubmit,
};
