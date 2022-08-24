import { BaseUrl } from "../utils/const";
import { HTTPTransport } from "../utils/http-transport";
import { IChat } from "../utils/types";

const settingsAPIInstance = new HTTPTransport(BaseUrl);

export class ChatAPI {
  public getChat() {
    return settingsAPIInstance.get("/chats");
  }
  public createChat(data: IChat) {
    return settingsAPIInstance.post("/chats", {
      data: JSON.stringify(data),
    });
  }
}
