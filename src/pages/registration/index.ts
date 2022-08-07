import  LoginForm  from "../../component/login-form";
import { renderBlock } from "../../utils/render-block";
import Button from "../../component/button";
import InputElement from "../../component/input-element"

let ButtonSubmit = new Button({
title: "Зарегистрироваться"
});
let InputElement1 = new InputElement({
  labelText: "Почта",
  typeInput: 'email',
  idInput: "idEmail",
  nameInput: "email",
  spanId: "email-input-error",
  placeholderInput: "pochta@yandex.ru"
});
let InputElement2 = new InputElement({
  labelText: "Логин",
  typeInput: 'text',
  idInput: "idLoginRegistration",
  nameInput: "login",
  spanId: "login-input-error"
});
let InputElement3 = new InputElement({
  labelText: "Имя",
  typeInput: 'text',
  idInput: "idFirstName",
  nameInput: "firstName",
  spanId: "firstName-input-error",
  placeholderInput: "Имя"
});
let InputElement4 = new InputElement({
  labelText: "Фамилия",
  typeInput: 'text',
  idInput: "idSecondName",
  nameInput: "secondName",
  spanId: "secondName-input-error",
  placeholderInput: "Фамилия"
});
let InputElement5 = new InputElement({
  labelText: "Телефон",
  typeInput: 'tel',
  idInput: "idPhone",
  nameInput: "phone",
  spanId: "phone-input-error"
});
let InputElement6 = new InputElement({
  labelText: "Пароль",
  typeInput: 'password',
  idInput: "idPassword",
  nameInput: "password"
});
let InputElement7 = new InputElement({
  labelText: "Пароль (еще раз)",
  typeInput: 'password',
  idInput: "idPasswordRepeat",
  nameInput: "passwordRepeat",
  spanId: "password-input-error"
});
const registration = new LoginForm({
  formTitle: 'Регистрация',
  InputElement1: InputElement1,
  InputElement2: InputElement2,
  InputElement3: InputElement3,
  InputElement4: InputElement4,
  InputElement5: InputElement5,
  InputElement6: InputElement6,
  InputElement7: InputElement7,
  link: "../login/index.html",
  linkText: "Войти",
  ButtonSubmit: ButtonSubmit
})

renderBlock('#app', registration);