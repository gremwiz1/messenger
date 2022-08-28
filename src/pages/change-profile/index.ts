import FormElement from "../../component/form-element";
import Button from "../../component/button";
import {
  displayNameValidate,
  emailValidate,
  firstNameValidate,
  loginValidate,
  phoneValidate,
  secondNameValidate,
} from "../../utils/validate";
import ButtonLink from "../../component/button-link";
import Router from "../../utils/router";
import store from "../../utils/store";
import userController from "../../controllers/user-controller";
import { IProfile } from "../../utils/types";
import authController from "../../controllers/auth-controller";

const router = new Router();
const user = store.getState().user;
let FormElementEmail = new FormElement({
  idInput: "idEmail",
  labelText: "Email",
  valueInput: user?.email,
  nameInput: "email",
  placeholderInput: "123@yandex.ru",
  classNameInput: "form__input",
  typeInput: "email",
  spanId: "email-input-error",
  errorText: "Некорректный адрес почты",
  events: {
    blur: function () {
      const error = document.getElementById("email-input-error");
      const inputEmail = document.getElementById("idEmail") as HTMLInputElement;
      const inputEmailValue = inputEmail.value;
      if (error) {
        error.hidden = emailValidate(inputEmailValue) || inputEmailValue === "";
      }
    },
  },
});

let FormElementLogin = new FormElement({
  typeInput: "text",
  idInput: "idLogin",
  labelText: "Логин",
  valueInput: user?.login,
  nameInput: "login",
  placeholderInput: "Введите логин",
  classNameInput: "form__input",
  spanId: "login-input-error",
  errorText: "Некорректный логин",
  events: {
    blur: function () {
      const error = document.getElementById("login-input-error");
      const inputLogin = document.getElementById("idLogin") as HTMLInputElement;
      const inputLoginValue = inputLogin.value;
      if (error) {
        error.hidden = loginValidate(inputLoginValue) || inputLoginValue === "";
      }
    },
  },
});

let FormElementFirstName = new FormElement({
  typeInput: "text",
  idInput: "idFirstName",
  labelText: "Имя",
  valueInput: user?.first_name,
  nameInput: "firstName",
  placeholderInput: "Введите имя",
  classNameInput: "form__input",
  spanId: "firstName-input-error",
  errorText: "Некорректное имя",
  events: {
    blur: function () {
      const error = document.getElementById("firstName-input-error");
      const inputFirstName = document.getElementById(
        "idFirstName"
      ) as HTMLInputElement;
      const inputFirstNameValue = inputFirstName.value;
      if (error) {
        error.hidden =
          firstNameValidate(inputFirstNameValue) || inputFirstNameValue === "";
      }
    },
  },
});

let FormElementSecondName = new FormElement({
  typeInput: "text",
  idInput: "idSecondName",
  labelText: "Фамилия",
  valueInput: user?.second_name,
  nameInput: "secondName",
  placeholderInput: "Введите фамилию",
  classNameInput: "form__input",
  spanId: "secondName-input-error",
  errorText: "Некорректная фамилия",
  events: {
    blur: function () {
      const error = document.getElementById("secondName-input-error");
      const inputSecondName = document.getElementById(
        "idSecondName"
      ) as HTMLInputElement;
      const inputSecondNameValue = inputSecondName.value;
      if (error) {
        error.hidden =
          secondNameValidate(inputSecondNameValue) ||
          inputSecondNameValue === "";
      }
    },
  },
});

let FormElementNickName = new FormElement({
  typeInput: "text",
  idInput: "idNickName",
  labelText: "Имя в чате",
  valueInput: user?.display_name || "",
  nameInput: "nickName",
  placeholderInput: "Введите имя в чате",
  classNameInput: "form__input",
});

let FormElementPhone = new FormElement({
  typeInput: "text",
  idInput: "idPhone",
  labelText: "Телефон",
  valueInput: user?.phone,
  nameInput: "phone",
  placeholderInput: "+71112223344",
  classNameInput: "form__input",
  spanId: "phone-input-error",
  errorText: "Неправильный номер телефона",
  events: {
    blur: function () {
      const error = document.getElementById("phone-input-error");
      const inputPhone = document.getElementById("idPhone") as HTMLInputElement;
      const inputPhoneValue = inputPhone.value;
      if (error) {
        error.hidden = phoneValidate(inputPhoneValue) || inputPhoneValue === "";
      }
    },
  },
});

let ButtonSubmit = new Button({
  title: "Сохранить",
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
        display_name: formData.get("nickName")?.toString(),
        phone: formData.get("phone")?.toString(),
      };
      if (
        emailValidate(data.email) &&
        loginValidate(data.login) &&
        firstNameValidate(data.first_name) &&
        secondNameValidate(data.second_name) &&
        phoneValidate(data.phone) &&
        displayNameValidate(data.display_name)
      ) {
        const res = userController.changeUserProfile(data as IProfile);
        if (res.status === 200) {
          store.set("user", res.data);
          router.go("/settings");
        } else {
          console.log("Не удалось изменить профайл");
        }
      }
    },
  },
});

let ButtonLinkBack = new ButtonLink({
  className: "profile__left_link",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      router.go("/messenger");
    },
  },
});

let ButtonLogOut = new ButtonLink({
  className: "form__link",
  title: "Выйти",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const res = authController.logout();
      if (res.status === 200) {
        router.go("/");
      } else {
        console.log("Не удалось разлогиниться");
      }
    },
  },
});

let Avatar = new ButtonLink({
  className: "avatar",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      router.go("/popup");
    },
  },
});

export const changeProfileProps = {
  email: user?.email,
  login: user?.login,
  firstName: user?.first_name,
  secondName: user?.second_name,
  nickName: user?.display_name || "",
  phone: user?.phone,
  FormElementEmail: FormElementEmail,
  FormElementLogin: FormElementLogin,
  FormElementFirstName: FormElementFirstName,
  FormElementSecondName: FormElementSecondName,
  FormElementNickName: FormElementNickName,
  FormElementPhone: FormElementPhone,
  ButtonSubmit: ButtonSubmit,
  ButtonLinkBack: ButtonLinkBack,
  ButtonLogOut: ButtonLogOut,
  Avatar: Avatar,
};
