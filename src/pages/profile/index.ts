import FormElement from "../../component/form-element";
import { renderBlock } from "../../utils/render-block";
import Profile from "../../component/profile";
import Button from "../../component/button";
import ButtonLink from "../../component/button-link";

let FormElementEmail = new FormElement({
  idInput: "idEmail",
  labelText: "Email",
  valueInput: "gremwiz@yandex.ru",
  nameInput: "email",
  placeholderInput: "123@yandex.ru",
  classNameInput: "form__input",
  typeInput: "email",
  readonly: true,
});

let FormElementLogin = new FormElement({
  typeInput: "text",
  idInput: "idLogin",
  labelText: "Логин",
  valueInput: "gremwiz",
  nameInput: "login",
  placeholderInput: "Введите логин",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementFirstName = new FormElement({
  typeInput: "text",
  idInput: "idFirstName",
  labelText: "Имя",
  valueInput: "Михаил",
  nameInput: "firstName",
  placeholderInput: "Введите имя",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementSecondName = new FormElement({
  typeInput: "text",
  idInput: "idSecondName",
  labelText: "Фамилия",
  valueInput: "Зотов",
  nameInput: "secondName",
  placeholderInput: "Введите фамилию",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementNickName = new FormElement({
  typeInput: "text",
  idInput: "idNickName",
  labelText: "Имя в чате",
  valueInput: "Mike",
  nameInput: "nickName",
  placeholderInput: "Введите имя в чате",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementPhone = new FormElement({
  typeInput: "text",
  idInput: "idPhone",
  labelText: "Телефон",
  valueInput: "+70021234567",
  nameInput: "phone",
  placeholderInput: "+71112223344",
  classNameInput: "form__input",
  readonly: true,
});

let ButtonSubmit = new Button({
  title: "Изменить данные",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      window.location.href = "/pages/change-profile/index.html";
    },
  },
});

let LinkButton = new ButtonLink({
  title: "Изменить пароль",
  className: "form__button",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      window.location.href = "/pages/change-password/index.html";
    },
  },
});

const profile = new Profile({
  email: "gremwiz@yandex.ru",
  login: "gremwiz",
  firstName: "Михаил",
  secondName: "Зотов",
  nickName: "Mike",
  phone: "+79921234567",
  FormElementEmail: FormElementEmail,
  FormElementLogin: FormElementLogin,
  FormElementFirstName: FormElementFirstName,
  FormElementSecondName: FormElementSecondName,
  FormElementNickName: FormElementNickName,
  FormElementPhone: FormElementPhone,
  ButtonSubmit: ButtonSubmit,
  ButtonLink: LinkButton,
});

renderBlock("#app", profile);
