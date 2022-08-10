import Block from "../../utils/block";
import "./form-element.css";
import template from "./form-element.hbs";

interface IFormElementProps {
  labelText?: string;
  typeInput: "text" | "email" | "password";
  idInput: string;
  valueInput?: string;
  nameInput: string;
  placeholderInput?: string;
  classNameInput: string;
  spanId?: string;
  errorText?: string;
  readonly?: boolean;
  events?: {
    click?: (e?: Event) => void;
    blur?: (e?: Event) => void;
  };
}
export class FormElement extends Block {
  constructor({
    labelText,
    typeInput,
    idInput,
    valueInput,
    nameInput,
    placeholderInput,
    classNameInput,
    events,
    spanId,
    errorText,
    readonly,
  }: IFormElementProps) {
    super("div", {
      labelText,
      typeInput,
      idInput,
      valueInput,
      nameInput,
      placeholderInput,
      classNameInput,
      events,
      spanId,
      errorText,
      readonly,
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
