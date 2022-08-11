import "./profile.css";
import Block from "../../utils/block";
import template from "./profile.hbs";
import FormElement from "../form-element";
import Button from "../button";
import ButtonLink from "../button-link";

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
  events?: {
    click?: (e?: Event) => void;
  };
}
export class Profile extends Block {
  constructor(props: IProfile) {
    super("div", { ...props });
  }
  render() {
    return this.compile(template, this.props);
  }
}
