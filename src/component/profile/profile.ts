import "./profile.css";
import Block from "../../utils/block";
import template from "./profile.hbs";
import FormElement from "../form-element";
import Button from "../button";
import ButtonLink from "../button-link";
import Router from "../../utils/router";
import store from "../../utils/store";
import { profileProps } from "../../pages/profile";
import { changeProfileProps } from "../../pages/change-profile";
import { changePasswordProps } from "../../pages/change-password";
import Avatar from "../avatar";

const router = new Router();
interface IProfile {
  email?: string;
  login?: string;
  firstName: string;
  secondName?: string;
  nickName?: string;
  phone?: string;
  FormElementEmail?: FormElement;
  FormElementLogin?: FormElement;
  FormElementFirstName?: FormElement;
  FormElementSecondName?: FormElement;
  FormElementNickName?: FormElement;
  FormElementPhone?: FormElement;
  FormOldPassword?: FormElement;
  FormNewPassword?: FormElement;
  FormRepeatPassword?: FormElement;
  ButtonSubmit: Button;
  ButtonLink?: ButtonLink;
  ButtonLinkBack: ButtonLink;
  ButtonLogOut: ButtonLink;
  Avatar: Avatar;
  events?: {
    click?: (e?: Event) => void;
  };
}
export class Profile extends Block {
  constructor(props: IProfile) {
    super("div", { ...props });
  }
  componentDidMount(): void {
    const user = store.getState().user;
    if (!user) {
      router.go("/");
    }
    const { pathname } = window.location;
    if (pathname === "/settings") {
      this.setProps(profileProps(user));
    } else if (pathname === "/change-profile") {
      this.setProps(changeProfileProps(user));
    } else if (pathname === "/change-password") {
      this.setProps(changePasswordProps(user));
    }
    const allErrors = document.querySelectorAll(
      ".form1__error"
    ) as NodeListOf<HTMLElement>;
    Array.from(allErrors).forEach((error) => {
      error.hidden = true;
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
