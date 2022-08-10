import FormElement from "../../component/form-element";
import { renderBlock } from "../../utils/render-block";
import Profile from "../../component/profile";
import Button from "../../component/button";

let FormElement1 = new FormElement({
  idInput: "idEmail",
  labelText: "Email",
  valueInput: "gremwiz@yandex.ru",
  nameInput: "email",
  placeholderInput: "123@yandex.ru",
  classNameInput: "form__input",
  typeInput: "email",
});
let FormElement2 = new FormElement({
  typeInput: "text",
  idInput: "idLogin",
  labelText: "Логин",
  valueInput: "gremwiz",
  nameInput: "login",
  placeholderInput: "Введите логин",
  classNameInput: "form__input",
});
let FormElement3 = new FormElement({
  typeInput: "text",
  idInput: "idFirstName",
  labelText: "Имя",
  valueInput: "Михаил",
  nameInput: "firstName",
  placeholderInput: "Введите имя",
  classNameInput: "form__input",
});
let FormElement4 = new FormElement({
  typeInput: "text",
  idInput: "idSecondName",
  labelText: "Фамилия",
  valueInput: "Зотов",
  nameInput: "secondName",
  placeholderInput: "Введите фамилию",
  classNameInput: "form__input",
});
let FormElement5 = new FormElement({
  typeInput: "text",
  idInput: "idNickName",
  labelText: "Имя в чате",
  valueInput: "Mike",
  nameInput: "nickName",
  placeholderInput: "Введите имя в чате",
  classNameInput: "form__input",
});
let FormElement6 = new FormElement({
  typeInput: "text",
  idInput: "idPhone",
  labelText: "Телефон",
  valueInput: "+70021234567",
  nameInput: "phone",
  placeholderInput: "+71112223344",
  classNameInput: "form__input",
});
let ButtonSubmit = new Button({
  title: "Сохранить",
});
const profile = new Profile({
  email: "gremwiz@yandex.ru",
  login: "gremwiz",
  firstName: "Михаил",
  secondName: "Зотов",
  nickName: "Mike",
  phone: "+79921234567",
  FormElement1: FormElement1,
  FormElement2: FormElement2,
  FormElement3: FormElement3,
  FormElement4: FormElement4,
  FormElement5: FormElement5,
  FormElement6: FormElement6,
  ButtonSubmit: ButtonSubmit,
});

renderBlock("#app", profile);
