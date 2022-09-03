import ButtonCreateChat from "../../component/button-create-chat";
import ButtonLink from "../../component/button-link";
import Input from "../../component/input";
import ChatController from "../../controllers/chat-controller";
import Router from "../../utils/router";
import store from "../../utils/store";
import { IChats } from "../../utils/types";

export function chatsPageProps(dataChats?: IChats[]) {
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
        const titleChat = prompt("Введите название чата");
        if (titleChat) {
          try {
            ChatController.createChat({ title: titleChat }).then((res) => {
              if (res.status === 200) {
                router.go("/messenger");
              }
            });
          } catch {
            console.log("Что-то пошло не так при создании чата");
          }
        }
      },
    },
  });

  return {
    InputSearch: InputSearch,
    chats: dataChats || [],
    chatPage: false,
    ButtonLinkProfile: ButtonLinkProfile,
    ButtonCreateNewChat: ButtonCreateNewChat,
    events: {
      click: function (event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target) {
          const chat = target.closest(".chat");
          if (chat) {
            if (chat.id) {
              const id = chat.id;
              store.set("activeChat", { chatId: id });
              router.go("/chat");
            }
          }
        }
      },
    },
  };
}
