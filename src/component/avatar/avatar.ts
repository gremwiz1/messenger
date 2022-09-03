import Block from "../../utils/block";
import "./avatar.css";
import template from "./avatar.hbs";

interface IAvatarProps {
  className: string;
  url: string;
  noImage: boolean;
  events?: {
    click?: (e?: Event) => void;
  };
}
export class Avatar extends Block {
  constructor(props: IAvatarProps) {
    super("div", props);
  }
  render() {
    return this.compile(template, this.props);
  }
}
