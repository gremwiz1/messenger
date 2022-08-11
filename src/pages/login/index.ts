import LoginForm from "../../component/login-form";
import { renderBlock } from "../../utils/render-block";
import Button from "../../component/button";
import InputElement from "../../component/input-element";

let ButtonSubmit = new Button({
  title: "Авторизироваться",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement
      );
      const data = {
        login: formData.get("login"),
        password: formData.get("password"),
      };

      console.log(data);
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

const login = new LoginForm({
  formTitle: "Вход",
  InputLogin: InputLogin,
  InputPassword: InputPassword,
  link: "../registration/index.html",
  linkText: "Нет аккаунта?",
  ButtonSubmit: ButtonSubmit,
});

renderBlock("#app", login);
