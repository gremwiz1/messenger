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
  constructor(props: IErrorProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
