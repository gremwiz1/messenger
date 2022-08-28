import MessageAPI from "../api/message-api";
import store from "../utils/store";
import { IMessage, IMessageFormModel } from "../utils/types";
import chatsController from "./chat-controller";

const Interval = 10000;
class MessagesController {
  static status: string;
  static timeout: NodeJS.Timer | undefined;
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
    if (res.data?.type === "pong") {
      MessagesController.status = "online";
    } else if (Array.isArray(res.data) || res.data?.type === "message") {
      const messages = store.getState().activeChatMessages || [];
      const newMessages = Array.isArray(res.data) ? res.data : [res.data];
      store.set("activeChatMessages", newMessages.concat(messages));
      chatsController.getChats();
      this._ping();
    }
  }

  private _onErrorHandler() {
    MessagesController.status = "offline";
    this.wss.close();
  }

  private _ping() {
    if (MessagesController.timeout) {
      clearTimeout(MessagesController.timeout);
      MessagesController.timeout = undefined;
    }

    MessagesController.timeout = setTimeout(() => {
      this._sendPing();
    }, Interval);
  }

  private _sendPing() {
    this.wss.send({ type: "ping" });
  }
}

export default new MessagesController();
