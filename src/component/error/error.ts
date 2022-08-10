import Block from "../../utils/block";
import "./error.css";
import template from "./error.hbs";

interface IErrorProps {
  code: string;
  text: string;
  linkText: string;
  link: string;
}
export class Error extends Block {
  constructor({ code, text, linkText, link }: IErrorProps) {
    super("div", { code, text, linkText, link });
  }
  render() {
    return this.compile(template, this.props);
  }
}
