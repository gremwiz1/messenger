import ButtonCreateChat from "../../component/button-create-chat";
import ButtonLink from "../../component/button-link";
import Input from "../../component/input";
import ChatController from "../../controllers/chat-controller";
import Router from "../../utils/router";
import store from "../../utils/store";

const router = new Router();
const dataChats = store.getState().chats;
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
      const titleChat = prompt("Введите название чата");
      if (titleChat) {
        try {
          ChatController.createChat({ title: titleChat });
        } catch {
          console.log("Что-то пошло не так при создании чата");
        }
      }
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
