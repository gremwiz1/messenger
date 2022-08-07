import  Popup from "../../component/popup";
import { renderBlock } from "../../utils/render-block";
import ButtonLink from "../../component/button-link";

let Button = new ButtonLink({
title: "Поменять"
});
const popup = new Popup({
  Button: Button
})

renderBlock('#app', popup);