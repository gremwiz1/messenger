import "./popup.css";
import Block from "../../utils/block";
import template from "./popup.hbs";
import Button from "../button";

interface IPopup {
  Button: Button;
}

export class Popup extends Block {
  constructor(props: IPopup) {
    super("div", { ...props });
  }
  render() {
    return this.compile(template, this.props);
  }
}
