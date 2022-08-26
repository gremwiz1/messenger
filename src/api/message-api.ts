import { WSSUrl } from "../utils/const";
import { IMessage, IMessageFormModel } from "../utils/types";

export default class MessageAPI {
  protected socket: WebSocket;

  constructor(props: IMessage) {
    const { userId, chatId, token, callback } = props;
    this.socket = new WebSocket(`${WSSUrl}/${userId}/${chatId}/${token}`);
    this._registerEvents(callback);
  }

  private _registerEvents(events: IMessage["callback"]) {
    this.socket.addEventListener("open", events.onOpen);
    this.socket.addEventListener("close", events.onClose);
    this.socket.addEventListener("message", events.onMessage);
  }

  private _send(data: IMessageFormModel) {
    return this.socket.send(JSON.stringify(data));
  }

  public send({ type, content }: IMessageFormModel) {
    return this._send({ content, type });
  }

  public close() {
    return this.socket.close();
  }
}
