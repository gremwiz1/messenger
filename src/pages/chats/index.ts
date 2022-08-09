import ChatPage from "../../component/chat-page";
import { renderBlock } from "../../utils/render-block";
import Input from "../../component/input";
import { dataChats } from "../../utils/mock-data";

let Input1 = new Input({
  typeInput: "text",
  idInput: "idSearch",
  nameInput: "search",
  placeholderInput: "Поиск",
  classNameInput: "section-left__search",
});
const chatPage = new ChatPage({
  Input1: Input1,
  chats: dataChats,
  chatPage: false,
});
renderBlock("#app", chatPage);
