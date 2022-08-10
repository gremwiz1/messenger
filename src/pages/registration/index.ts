import LoginForm from "../../component/login-form";
import { renderBlock } from "../../utils/render-block";
import Button from "../../component/button";
import InputElement from "../../component/input-element";
import {
  checkRepeatPassword,
  emailValidate,
  firstNameValidate,
  loginValidate,
  passwordValidate,
  phoneValidate,
  secondNameValidate,
} from "../../utils/validate";

let ButtonSubmit = new Button({
  title: "Зарегистрироваться",
  events: {
    click: handleClickSubmitRegistration,
  },
});
let InputElement1 = new InputElement({
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
let InputElement2 = new InputElement({
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
let InputElement3 = new InputElement({
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
let InputElement4 = new InputElement({
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
let InputElement5 = new InputElement({
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
let InputElement6 = new InputElement({
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
let InputElement7 = new InputElement({
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
const registration = new LoginForm({
  formTitle: "Регистрация",
  InputElement1: InputElement1,
  InputElement2: InputElement2,
  InputElement3: InputElement3,
  InputElement4: InputElement4,
  InputElement5: InputElement5,
  InputElement6: InputElement6,
  InputElement7: InputElement7,
  link: "../login/index.html",
  linkText: "Войти",
  ButtonSubmit: ButtonSubmit,
});
function handleClickSubmitRegistration(e: Event) {
  e.preventDefault();
  const formData = new FormData(
    document.querySelector("form") as HTMLFormElement
  );
  const data = {
    email: formData.get("email"),
    login: formData.get("login"),
    first_name: formData.get("firstName"),
    second_name: formData.get("secondName"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    password_repeat: formData.get("passwordRepeat"),
  };

  console.log(data);
}
renderBlock("#app", registration);
const allErrors: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".form1__error"
) as NodeListOf<HTMLElement>;
Array.from(allErrors).forEach((error) => {
  error.hidden = true;
});
