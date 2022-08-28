import Block from "../../utils/block";
import "./button-delete-user.css";
import template from "./button-delete-user.hbs";

interface IButtonProps {
  events?: {
    click?: (e?: Event) => void;
  };
}
export class ButtonDeleteUser extends Block {
  constructor(props: IButtonProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
