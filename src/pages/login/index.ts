import Button from "../../component/button";
import InputElement from "../../component/input-element";
import authController from "../../controllers/auth-controller";
import Router from "../../utils/router";
import { IAuthData } from "../../utils/types";

const router = new Router();
let ButtonSubmit = new Button({
  title: "Авторизироваться",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement
      );
      const data = {
        login: formData.get("login")?.toString(),
        password: formData.get("password")?.toString(),
      };
      if (data.login && data.password) {
        const res = authController.signin(data as IAuthData);
        if (res.status === 200) {
          const res = authController.getUserInfo();
          if (res.data?.id) {
            router.go("/messenger");
          } else {
            console.log("Не удалось получить информацию о пользователе");
          }
        } else {
          console.log("Авторизироваться не получилось");
        }
      }
    },
  },
});

let InputLogin = new InputElement({
  labelText: "Логин",
  typeInput: "text",
  idInput: "idLogin",
  nameInput: "login",
  spanId: "login-input-error-avtorization",
});

let InputPassword = new InputElement({
  labelText: "Пароль",
  typeInput: "password",
  idInput: "idPassword",
  nameInput: "password",
  spanId: "password-input-error-avtorization",
});

export const loginProps = {
  formTitle: "Вход",
  InputLogin: InputLogin,
  InputPassword: InputPassword,
  link: "/sign-up",
  linkText: "Нет аккаунта?",
  ButtonSubmit: ButtonSubmit,
};
