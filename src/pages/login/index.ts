import LoginForm from "../../component/login-form";
import { renderBlock } from "../../utils/render-block";
import Button from "../../component/button";
import InputElement from "../../component/input-element";

let ButtonSubmit = new Button({
  title: "Авторизироваться",
  events: {
    click: handleClickSubmitAutorization,
  },
});
let InputElement1 = new InputElement({
  labelText: "Логин",
  typeInput: "text",
  idInput: "idLogin",
  nameInput: "login",
  spanId: "login-input-error-avtorization",
});
let InputElement2 = new InputElement({
  labelText: "Пароль",
  typeInput: "password",
  idInput: "idPassword",
  nameInput: "password",
  spanId: "password-input-error-avtorization",
});
const login = new LoginForm({
  formTitle: "Вход",
  InputElement1: InputElement1,
  InputElement2: InputElement2,
  link: "../registration/index.html",
  linkText: "Нет аккаунта?",
  ButtonSubmit: ButtonSubmit,
});
function handleClickSubmitAutorization(e: Event) {
  e.preventDefault();
  const formData = new FormData(
    document.querySelector("form") as HTMLFormElement
  );
  const data = {
    login: formData.get("login"),
    password: formData.get("password"),
  };

  console.log(data);
}

renderBlock("#app", login);
