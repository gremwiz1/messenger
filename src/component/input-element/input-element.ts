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
  constructor({
    labelText,
    typeInput,
    idInput,
    valueInput,
    nameInput,
    placeholderInput,
    spanId,
    events,
    errorText,
  }: IInputElementProps) {
    super("div", {
      labelText,
      typeInput,
      idInput,
      valueInput,
      nameInput,
      placeholderInput,
      spanId,
      events,
      errorText,
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
