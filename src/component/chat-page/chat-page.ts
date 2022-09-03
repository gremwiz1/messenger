import Block from "../../utils/block";
import "./chat-page.css";
import template from "./chat-page.hbs";
import Input from "../../component/input";
import ButtonLink from "../../component/button-link";
import ButtonAddUser from "../button-add-user";
import ButtonDeleteUser from "../button-delete-user";
import ButtonCreateChat from "../button-create-chat";
import store from "../../utils/store";
import Router from "../../utils/router";
import { chatsPageProps } from "../../pages/chats";
import { chatPageProps } from "../../pages/chat";
import MessagesController from "../../controllers/message-controller";

const router = new Router();

interface IChat {
  imageUrl: string;
  title: string;
  lastUserName: string;
  lastMessage: string;
  timeLastMessage: string;
  isNewMessages: boolean;
  countNewMessages?: number;
  noImageChat: boolean;
}
interface IChatMessages {
  isMyMessage: Boolean;
  textMessage: string;
  timeMessage: string;
  dateMessage: string;
}
interface IChatPage {
  InputSearch: Input;
  InputMessage?: Input;
  chats: IChat[];
  imageUrlChat?: string;
  titleChat?: string;
  ButtonLink1?: ButtonLink;
  ButtonLink2?: ButtonLink;
  ButtonLink3?: ButtonLink;
  date?: string;
  messages?: IChatMessages[];
  chatPage: Boolean;
  ButtonLinkProfile: ButtonLink;
  AddButton?: ButtonAddUser;
  DeleteButton?: ButtonDeleteUser;
  ButtonCreateNewChat: ButtonCreateChat;
  noImage?: boolean;
  events?: {
    click?: (e?: Event) => void;
  };
}
export class ChatPage extends Block {
  constructor(props: IChatPage) {
    super("div", props);
  }
  componentDidMount(): void {
    const user = store.getState().user;
    if (!user) {
      router.go("/");
    }
    const chats = store.getState().chats;
    const chatId = store.getState().activeChat;
    const { pathname } = window.location;
    if (pathname === "/messenger") {
      this.setProps(chatsPageProps(chats));
    } else if (pathname === "/chat") {
      this.setProps(chatPageProps(chats, chatId?.chatId));
      setTimeout(() => MessagesController.openWSS(), 100);
    }

    const chatButtons = document.querySelector(".chat-buttons") as HTMLElement;
    if (chatButtons) {
      chatButtons.style.display = "none";
    }
  }
  render() {
    return this.compile(template, this.props);
  }
}
