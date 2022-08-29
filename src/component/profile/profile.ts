import "./profile.css";
import Block from "../../utils/block";
import template from "./profile.hbs";
import FormElement from "../form-element";
import Button from "../button";
import ButtonLink from "../button-link";
import Router from "../../utils/router";
import store from "../../utils/store";

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
  Avatar: ButtonLink;
  events?: {
    click?: (e?: Event) => void;
  };
}
export class Profile extends Block {
  constructor(props: IProfile) {
    super("div", { ...props });
  }
  componentDidMount(): void {
    const allErrors = document.querySelectorAll(
      ".form1__error"
    ) as NodeListOf<HTMLElement>;
    Array.from(allErrors).forEach((error) => {
      error.hidden = true;
    });
    const user = store.getState().user;
    if (!user) {
      router.go("/");
    }
  }
  render() {
    return this.compile(template, this.props);
  }
}
