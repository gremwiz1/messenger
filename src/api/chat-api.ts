import { BaseUrl } from "../utils/const";
import { HTTPTransport } from "../utils/http-transport";
import { IChat, IUserInChats } from "../utils/types";

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
  public addUserInChat(data: IUserInChats) {
    return settingsAPIInstance.put("/chats/users", {
      data: JSON.stringify(data),
    });
  }
  public deleteUserFromChat(data: IUserInChats) {
    return settingsAPIInstance.delete("/chats/users", {
      data: JSON.stringify(data),
    });
  }
  public getTokenChat(chatId: string) {
    return settingsAPIInstance.post(`/chats/token/${chatId}`);
  }
}
