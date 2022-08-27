import MessageAPI from "../api/message-api";
import store from "../utils/store";
import { IMessage, IMessageFormModel } from "../utils/types";
import ChatsController from "./chat-controller";

const chatsController = new ChatsController();
class MessagesController {
  static status: string;
  private wss: MessageAPI;
  private _events(): IMessage["callback"] {
    return {
      onOpen: this._onOpenHandler.bind(this),
      onClose: this._onCloseHandler.bind(this),
      onMessage: this._onMessageHandler.bind(this),
      onError: this._onErrorHandler.bind(this),
    };
  }

  protected formingResponse(res: IMessageFormModel) {
    const { data: response, type } = res;
    let data;

    if (typeof response === "string") {
      try {
        data = JSON.parse(response);
      } catch (err) {
        data = JSON.parse(JSON.stringify(response));
      }
    }
    return { data, type };
  }

  public async openWSS() {
    if (MessagesController.status === "online") {
      this.closeWSS();
    }
    const chatId = store.getState().activeChat?.chatId;
    const userId = store.getState().user?.id;
    if (!chatId || !userId) return;
    const token = await chatsController.getTokenChat(chatId);
    if (!token) return;
    const callback = this._events();
    this.wss = new MessageAPI({ userId, chatId, token, callback });
  }

  public closeWSS() {
    this.wss.close();
  }

  public sendMessage(data: IMessageFormModel = {}) {
    const { type = "get old", content = "0" } = data;
    this.wss.send({ type, content });
  }

  private _onCloseHandler() {
    store.set("activeChatMessages", []);
    MessagesController.status = "offline";
  }

  private _onOpenHandler() {
    MessagesController.status = "online";
    this.sendMessage();
  }

  private _onMessageHandler(e: Event) {
    const res = this.formingResponse(e);
    !res.data.reason &&
      (Array.isArray(res.data) || res.data?.type === "message");
    {
      const messages = store.getState().activeChatMessages || [];
      const newMessages = Array.isArray(res.data) ? res.data : [res.data];
      store.set("activeChatMessages", newMessages.concat(messages));
      chatsController.getChats();
    }
  }

  private _onErrorHandler() {
    MessagesController.status = "offline";
    this.wss.close();
  }
}

export default new MessagesController();
