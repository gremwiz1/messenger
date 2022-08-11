import FormElement from "../../component/form-element";
import { renderBlock } from "../../utils/render-block";
import Profile from "../../component/profile";
import Button from "../../component/button";
import {
  emailValidate,
  firstNameValidate,
  loginValidate,
  phoneValidate,
  secondNameValidate,
} from "../../utils/validate";

let FormElementEmail = new FormElement({
  idInput: "idEmail",
  labelText: "Email",
  valueInput: "gremwiz@yandex.ru",
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
  valueInput: "gremwiz",
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
  valueInput: "Михаил",
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
  valueInput: "Зотов",
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
  valueInput: "Mike",
  nameInput: "nickName",
  placeholderInput: "Введите имя в чате",
  classNameInput: "form__input",
});

let FormElementPhone = new FormElement({
  typeInput: "text",
  idInput: "idPhone",
  labelText: "Телефон",
  valueInput: "+70021234567",
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
        email: formData.get("email"),
        login: formData.get("login"),
        first_name: formData.get("firstName"),
        second_name: formData.get("secondName"),
        nick_name: formData.get("nickName"),
        phone: formData.get("phone"),
      };

      console.log(data);
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
});

renderBlock("#app", profile);

const allErrors: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".form1__error"
) as NodeListOf<HTMLElement>;
Array.from(allErrors).forEach((error) => {
  error.hidden = true;
});
