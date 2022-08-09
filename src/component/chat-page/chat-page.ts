import Block from "../../utils/block";
import "./chat-page.css";
import template from "./chat-page.hbs";
import Input from "../../component/input";
import ButtonLink from "../../component/button-link";

interface IChat {
  imageUrl: string;
  title: string;
  lastUserName: string;
  lastMessage: string;
  timeLastMessage: string;
  isNewMessages: boolean;
  countNewMessages?: number;
}
interface IChatMessages {
  isMyMessage: Boolean;
  textMessage: string;
  timeMessage: string;
  dateMessage: string;
}
interface IChatPage {
  Input1: Input;
  Input2: Input;
  chats: IChat[];
  imageUrlChat: string;
  titleChat: string;
  ButtonLink1: ButtonLink;
  ButtonLink2: ButtonLink;
  ButtonLink3: ButtonLink;
  date: string;
  messages: IChatMessages[];
}
export class ChatPage extends Block {
  constructor(props: IChatPage) {
    super("div", props);
  }
  render() {
    console.log("render chatPage");
    return this.compile(template, this.props);
  }
}
