import FormElement from "../../component/form-element";
import Button from "../../component/button";
import { checkRepeatPassword, passwordValidate } from "../../utils/validate";

let FormOldPassword = new FormElement({
  idInput: "idPassword",
  labelText: "Старый пароль",
  nameInput: "password",
  classNameInput: "form__input",
  typeInput: "password",
});

let FormNewPassword = new FormElement({
  typeInput: "password",
  idInput: "idNewPassword",
  labelText: "Новый пароль",
  nameInput: "newPassword",
  classNameInput: "form__input",
  spanId: "new-password-error",
  errorText: "Некорректный пароль",
  events: {
    blur: function () {
      const error = document.getElementById("new-password-error");
      if (error) {
        error.hidden = passwordValidate(this.value) || this.value === "";
      }
    },
  },
});

let FormRepeatPassword = new FormElement({
  typeInput: "password",
  idInput: "idRepeatPassword",
  labelText: "Повторите новый пароль",
  nameInput: "repeatPassword",
  classNameInput: "form__input",
  spanId: "repeat-new-password-error",
  errorText: "Пароли не совпадают",
  events: {
    blur: function () {
      const error = document.getElementById("repeat-new-password-error");
      const passwordInput = document.getElementById(
        "idNewPassword"
      ) as HTMLInputElement;
      const password = passwordInput.value;
      if (error) {
        error.hidden =
          checkRepeatPassword(this.value, password) || this.value === "";
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
        password: formData.get("password"),
        newPassword: formData.get("newPassword"),
        repeatPassword: formData.get("repeatPassword"),
      };

      console.log(data);
    },
  },
});

export const changePasswordProps = {
  firstName: "Михаил",
  FormOldPassword: FormOldPassword,
  FormNewPassword: FormNewPassword,
  FormRepeatPassword: FormRepeatPassword,
  ButtonSubmit: ButtonSubmit,
};
