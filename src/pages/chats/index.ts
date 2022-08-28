import ButtonCreateChat from "../../component/button-create-chat";
import ButtonLink from "../../component/button-link";
import Input from "../../component/input";
import { dataChats } from "../../utils/mock-data";
import Router from "../../utils/router";

const router = new Router();
let ButtonLinkProfile = new ButtonLink({
  title: "Профиль >",
  className: "section-left__link",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      router.go("/settings");
    },
  },
});

let InputSearch = new Input({
  typeInput: "text",
  idInput: "idSearch",
  nameInput: "search",
  placeholderInput: "Поиск",
  classNameInput: "section-left__search",
});

let ButtonCreateNewChat = new ButtonCreateChat({
  events: {
    click: function (e: Event) {
      e.preventDefault();
    },
  },
});

export const chatsPageProps = {
  InputSearch: InputSearch,
  chats: dataChats,
  chatPage: false,
  ButtonLinkProfile: ButtonLinkProfile,
  ButtonCreateNewChat: ButtonCreateNewChat,
};
