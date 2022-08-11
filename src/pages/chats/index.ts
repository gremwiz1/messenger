import ChatPage from "../../component/chat-page";
import { renderBlock } from "../../utils/render-block";
import Input from "../../component/input";
import { dataChats } from "../../utils/mock-data";

let InputSearch = new Input({
  typeInput: "text",
  idInput: "idSearch",
  nameInput: "search",
  placeholderInput: "Поиск",
  classNameInput: "section-left__search",
});

const chatPage = new ChatPage({
  InputSearch: InputSearch,
  chats: dataChats,
  chatPage: false,
});

renderBlock("#app", chatPage);
