import "./popup.css";
import Block from "../../utils/block";
import template from "./popup.hbs";
import ButtonLink from "../button-link";

interface IPopup {
  Button: ButtonLink;
}
export class Popup extends Block {
  constructor(props: IPopup) {
    super("div", { ...props });
  }
  render() {
    console.log("render popup");
    return this.compile(template, this.props);
  }
}
