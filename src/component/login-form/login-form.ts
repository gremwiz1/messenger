import "./login-form.css";
import Block from "../../utils/block";
import template from "./login-form.hbs";
import InputElement from "../input-element";
import Button from "../button";

interface ILoginForm {
  formTitle: string;
  InputElement1: InputElement;
  InputElement2: InputElement;
  InputElement3?: InputElement;
  InputElement4?: InputElement;
  InputElement5?: InputElement;
  InputElement6?: InputElement;
  InputElement7?: InputElement;
  ButtonSubmit: Button;
  link: string;
  linkText: string;
}
export class LoginForm extends Block {
  constructor(props: ILoginForm) {
    super("div", { ...props });
  }
  render() {
    console.log("render login-form");
    return this.compile(template, this.props);
  }
}
