import Block from "../../utils/block";
import "./input.css";
import Template from "./input.hbs";

interface IInputProps {
  typeInput: "text" | "email" | "password";
  idInput: string;
  valueInput?: string;
  nameInput: string;
  placeholderInput: string;
  classNameInput: string;
  events?: {
    focus: Function;
    blur: Function;
  };
}
export class Input extends Block {
  constructor(props: IInputProps) {
    super("div", {
      ...props,
      events: {
        focus: () => console.log("focus"),
        blur: () => console.log("blur"),
      },
    });
  }
  render() {
    return this.compile(Template, this.props);
  }
}
