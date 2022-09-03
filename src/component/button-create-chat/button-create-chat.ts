import Block from "../../utils/block";
import "./button-create-chat.css";
import template from "./button-create-chat.hbs";

interface IButtonProps {
  events?: {
    click?: (e?: Event) => void;
  };
}
export class ButtonCreateChat extends Block {
  constructor(props: IButtonProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
