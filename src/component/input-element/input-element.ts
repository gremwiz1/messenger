import Block from "../../utils/block";
import "./input-element.css";
import template from "./input-element.hbs";

interface IInputElementProps {
  labelText?: string;
  typeInput: "text" | "email" | "password" | "tel";
  idInput: string;
  valueInput?: string;
  nameInput: string;
  placeholderInput?: string;
  spanId?: string;
  errorText?: string;
  events?: {
    click?: (e?: Event) => void;
    blur?: (e?: Event) => void;
  };
}
export class InputElement extends Block {
  constructor(props: IInputElementProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
