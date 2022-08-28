import Input from "../../component/input";
import ButtonLink from "../../component/button-link";
import { chatMessages } from "../../utils/mock-data";
import { checkMessage } from "../../utils/validate";
import Router from "../../utils/router";
import ButtonAddUser from "../../component/button-add-user";
import ButtonDeleteUser from "../../component/button-delete-user";
import ButtonCreateChat from "../../component/button-create-chat";
import ChatController from "../../controllers/chat-controller";
import store from "../../utils/store";

const router = new Router();
const dataChats = store.getState().chats;
const idActiveChat = store.getState().activeChat?.chatId;
let avatarChat = "";
let titleChat = "";
if (idActiveChat) {
  const activeChat = dataChats?.find((item) => item.id === idActiveChat);
  if (activeChat) {
    avatarChat = activeChat.imageUrl;
    titleChat = activeChat.title;
  }
}
let InputSearch = new Input({
  typeInput: "text",
  idInput: "idSearch",
  nameInput: "search",
  placeholderInput: "Поиск",
  classNameInput: "section-left__search",
});

let InputMessage = new Input({
  typeInput: "text",
  idInput: "idMessage",
  nameInput: "message",
  placeholderInput: "Сообщение",
  classNameInput: "chat__bottom_input",
});

const date = "19 июня";

const ButtonLink1 = new ButtonLink({
  className: "chat__top_button",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const chatButtons = document.querySelector(
        ".chat-buttons"
      ) as HTMLElement;
      if (chatButtons) {
        chatButtons.style.display = "flex";
      }
    },
  },
});

const ButtonLink2 = new ButtonLink({
  className: "chat__bottom_link",
});

const ButtonLink3 = new ButtonLink({
  className: "chat__bottom_button",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const messageInput = document.getElementById(
        "idMessage"
      ) as HTMLInputElement;
      let messageText = messageInput.value;
      if (checkMessage(messageText)) {
        console.log(`message: ${messageText}`);
        messageInput.value = "";
      } else {
        console.log("Message не может быть пустым");
      }
    },
  },
});

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

let AddButton = new ButtonAddUser({
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const chatId = store.getState().activeChat?.chatId;
      const userId = prompt("Введите ID пользователя чтобы добавить его в чат");
      if (chatId && userId) {
        try {
          ChatController.addUserInChat({
            users: [+userId],
            chatId: chatId,
          });
        } catch {
          console.log("Не удалось добавить пользователя");
        }
      }
    },
  },
});

let DeleteButton = new ButtonDeleteUser({
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const chatId = store.getState().activeChat?.chatId;
      const userId = prompt(
        "Введите ID пользователя чтобы удалить его из чата"
      );
      if (chatId && userId) {
        try {
          ChatController.deleteUserFromChat({
            users: [+userId],
            chatId: chatId,
          });
        } catch {
          console.log("Не удалось удалить пользователя");
        }
      }
    },
  },
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

export const chatPageProps = {
  InputSearch: InputSearch,
  InputMessage: InputMessage,
  chats: dataChats,
  imageUrlChat: avatarChat,
  titleChat: titleChat,
  ButtonLink1: ButtonLink1,
  ButtonLink2: ButtonLink2,
  ButtonLink3: ButtonLink3,
  date: date,
  messages: chatMessages,
  chatPage: true,
  ButtonLinkProfile: ButtonLinkProfile,
  AddButton: AddButton,
  DeleteButton: DeleteButton,
  ButtonCreateNewChat: ButtonCreateNewChat,
};
