import FormElement from "../../component/form-element";
import Button from "../../component/button";
import ButtonLink from "../../component/button-link";
import Router from "../../utils/router";
import authController from "../../controllers/auth-controller";
import store from "../../utils/store";

const router = new Router();
const user = store.getState().user;

let FormElementEmail = new FormElement({
  idInput: "idEmail",
  labelText: "Email",
  valueInput: user?.email,
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
  valueInput: user?.login,
  nameInput: "login",
  placeholderInput: "Введите-логин",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementFirstName = new FormElement({
  typeInput: "text",
  idInput: "idFirstName",
  labelText: "Имя",
  valueInput: user?.first_name,
  nameInput: "firstName",
  placeholderInput: "Введите-имя",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementSecondName = new FormElement({
  typeInput: "text",
  idInput: "idSecondName",
  labelText: "Фамилия",
  valueInput: user?.second_name,
  nameInput: "secondName",
  placeholderInput: "Введите-фамилию",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementNickName = new FormElement({
  typeInput: "text",
  idInput: "idNickName",
  labelText: "Имя в чате",
  valueInput: user?.display_name || "",
  nameInput: "nickName",
  placeholderInput: "Введите-имя-в-чате",
  classNameInput: "form__input",
  readonly: true,
});

let FormElementPhone = new FormElement({
  typeInput: "text",
  idInput: "idPhone",
  labelText: "Телефон",
  valueInput: user?.phone,
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
      router.go("/change-profile");
    },
  },
});

let LinkButton = new ButtonLink({
  title: "Изменить пароль",
  className: "form__button",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      router.go("/change-password");
    },
  },
});

let ButtonLinkBack = new ButtonLink({
  className: "profile__left_link",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      router.go("/messenger");
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

let Avatar = new ButtonLink({
  className: "avatar",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      router.go("/popup");
    },
  },
});

export const profileProps = {
  email: user?.email,
  login: user?.login,
  firstName: user?.first_name,
  secondName: user?.second_name,
  nickName: user?.display_name || "",
  phone: user?.phone,
  FormElementEmail: FormElementEmail,
  FormElementLogin: FormElementLogin,
  FormElementFirstName: FormElementFirstName,
  FormElementSecondName: FormElementSecondName,
  FormElementNickName: FormElementNickName,
  FormElementPhone: FormElementPhone,
  ButtonSubmit: ButtonSubmit,
  ButtonLink: LinkButton,
  ButtonLinkBack: ButtonLinkBack,
  ButtonLogOut: ButtonLogOut,
  Avatar: Avatar,
};
