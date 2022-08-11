import "./login-form.css";
import Block from "../../utils/block";
import template from "./login-form.hbs";
import InputElement from "../input-element";
import Button from "../button";

interface ILoginForm {
  formTitle: string;
  InputEmail?: InputElement;
  InputLogin: InputElement;
  InputFirstName?: InputElement;
  InputSecondName?: InputElement;
  InputPhone?: InputElement;
  InputPassword: InputElement;
  InputRepeatPassword?: InputElement;
  ButtonSubmit: Button;
  link: string;
  linkText: string;
}
export class LoginForm extends Block {
  constructor(props: ILoginForm) {
    super("div", { ...props });
  }
  render() {
    return this.compile(template, this.props);
  }
}
