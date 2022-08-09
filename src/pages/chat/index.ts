import ChatPage from "../../component/chat-page";
import { renderBlock } from "../../utils/render-block";
import Input from "../../component/input";
import ButtonLink from "../../component/button-link";
import { dataChats, chatMessages, imageUrlChat } from "../../utils/mock-data";

let Input1 = new Input({
  typeInput: "text",
  idInput: "idSearch",
  nameInput: "search",
  placeholderInput: "Поиск",
  classNameInput: "section-left__search",
});
let Input2 = new Input({
  typeInput: "text",
  idInput: "idMessage",
  nameInput: "message",
  placeholderInput: "Сообщение",
  classNameInput: "chat__bottom_input",
});
const avatarChat = imageUrlChat;
const titleChat = "Михаил";
const date = "19 июня";
const ButtonLink1 = new ButtonLink({
  className: "chat__top_button",
});
const ButtonLink2 = new ButtonLink({
  className: "chat__bottom_link",
});
const ButtonLink3 = new ButtonLink({
  className: "chat__bottom_button",
});
const chatPage = new ChatPage({
  Input1: Input1,
  Input2: Input2,
  chats: dataChats,
  imageUrlChat: avatarChat,
  titleChat: titleChat,
  ButtonLink1: ButtonLink1,
  ButtonLink2: ButtonLink2,
  ButtonLink3: ButtonLink3,
  date: date,
  messages: chatMessages,
  chatPage: true,
});
renderBlock("#app", chatPage);
