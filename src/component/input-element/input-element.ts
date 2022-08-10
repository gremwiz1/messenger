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
  events?: {
    click?: (e?: Event) => void;
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
    });
  }
  render() {
    console.log("render input-element");
    return this.compile(template, this.props);
  }
}
