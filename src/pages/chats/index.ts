import Input from "../../component/input";
import { dataChats } from "../../utils/mock-data";

let InputSearch = new Input({
  typeInput: "text",
  idInput: "idSearch",
  nameInput: "search",
  placeholderInput: "Поиск",
  classNameInput: "section-left__search",
});

export const chatsPageProps = {
  InputSearch: InputSearch,
  chats: dataChats,
  chatPage: false,
};
