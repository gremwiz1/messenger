import FormElement from "../../component/form-element";
import { renderBlock } from "../../utils/render-block";
import Profile from "../../component/profile";
import Button from "../../component/button";

let FormElement1 = new FormElement({
  idInput: "idPassword",
  labelText: "Старый пароль",
  nameInput: "password",
  classNameInput: "form__input",
  typeInput: "password",
});
let FormElement2 = new FormElement({
  typeInput: "password",
  idInput: "idNewPassword",
  labelText: "Новый пароль",
  nameInput: "newPassword",
  classNameInput: "form__input",
});
let FormElement3 = new FormElement({
  typeInput: "password",
  idInput: "idRepeatPassword",
  labelText: "Повторите новый пароль",
  nameInput: "repeatPassword",
  classNameInput: "form__input",
});
let ButtonSubmit = new Button({
  title: "Сохранить",
  events: {
    click: handleClickSubmitChangePassword,
  },
});
const profile = new Profile({
  firstName: "Михаил",
  FormElement1: FormElement1,
  FormElement2: FormElement2,
  FormElement3: FormElement3,
  ButtonSubmit: ButtonSubmit,
});
function handleClickSubmitChangePassword(e: Event) {
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
}
renderBlock("#app", profile);
