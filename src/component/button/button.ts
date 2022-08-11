import Block from "../../utils/block";
import "./button.css";
import template from "./button.hbs";

interface IButtonProps {
  title: string;
  events?: {
    click?: (e?: Event) => void;
  };
}
export class Button extends Block {
  constructor({ title, events }: IButtonProps) {
    super("div", { title, events });
  }
  render() {
    return this.compile(template, this.props);
  }
}
