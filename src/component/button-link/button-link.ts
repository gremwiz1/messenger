import Block from "../../utils/block";
import "./button-link.css";
import template from "./button-link.hbs";

interface IButtonProps {
  title?: string;
  className: string;
  events?: {
    click?: (e?: Event) => void;
  };
}
export class ButtonLink extends Block {
  constructor({ title, events, className }: IButtonProps) {
    super("div", { title, events, className });
  }
  render() {
    console.log("render buttonLink");
    return this.compile(template, this.props);
  }
}
