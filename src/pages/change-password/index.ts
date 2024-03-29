import FormElement from "../../component/form-element";
import Button from "../../component/button";
import { checkRepeatPassword, passwordValidate } from "../../utils/validate";
import userController from "../../controllers/user-controller";
import { IPassword, IUserModel } from "../../utils/types";
import Router from "../../utils/router";
import ButtonLink from "../../component/button-link";
import authController from "../../controllers/auth-controller";
import Avatar from "../../component/avatar";

export function changePasswordProps(user?: IUserModel) {
  const router = new Router();
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
          oldPassword: formData.get("password")?.toString(),
          newPassword: formData.get("newPassword")?.toString(),
          repeatPassword: formData.get("repeatPassword")?.toString(),
        };
        if (
          checkRepeatPassword(data.newPassword, data.repeatPassword) &&
          passwordValidate(data.newPassword)
        ) {
          userController.changeUserPassword(data as IPassword).then((res) => {
            if (res.status === 200) {
              router.go("/settings");
            } else {
              console.log("Не удалось сменить пароль");
            }
          });
        }
      },
    },
  });

  let ButtonLogOut = new ButtonLink({
    className: "form__link",
    title: "Выйти",
    events: {
      click: function (e: Event) {
        e.preventDefault();
        authController.logout().then((res) => {
          if (res.status === 200) {
            router.go("/");
          } else {
            console.log("Не удалось разлогиниться");
          }
        });
      },
    },
  });

  let Avatar1 = new Avatar({
    className: "avatar",
    url: user?.avatar || "",
    noImage: user?.avatar === "../../static/logo.png" ? true : false,
    events: {
      click: function (e: Event) {
        e.preventDefault();
        router.go("/popup");
      },
    },
  });

  return {
    firstName: user?.first_name || "",
    FormOldPassword: FormOldPassword,
    FormNewPassword: FormNewPassword,
    FormRepeatPassword: FormRepeatPassword,
    ButtonSubmit: ButtonSubmit,
    ButtonLogOut: ButtonLogOut,
    Avatar: Avatar1,
  };
}
