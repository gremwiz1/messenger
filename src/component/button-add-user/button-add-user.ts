import Block from "../../utils/block";
import "./button-add-user.css";
import template from "./button-add-user.hbs";

interface IButtonProps {
  events?: {
    click?: (e?: Event) => void;
  };
}
export class ButtonAddUser extends Block {
  constructor(props: IButtonProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
