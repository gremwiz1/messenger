import { ChatAPI } from "../api/chat-api";
import { setAvatarPath, setTime } from "../utils/helpers";
import store from "../utils/store";
import { IChat, IUserInChats } from "../utils/types";

const chatsApi = new ChatAPI();

class ChatController {
  public async getChats() {
    try {
      const res: any = await chatsApi.getChats();
      if (res.status !== 200) throw new Error("Неудачный запрос чатов");
      const arrayChats = JSON.parse(res.response).map((item: any) => {
        if (item.unread_count > 0) {
          return {
            id: item.id,
            imageUrl: setAvatarPath(item.avatar),
            title: item.title,
            lastUserName: item.last_message.first_name,
            lastMessage: item.last_message.content,
            timeLastMessage: setTime(item.last_message.time),
            isNewMessages: true,
            countNewMessages: item.unread_count,
          };
        } else {
          return {
            id: item.id,
            imageUrl: setAvatarPath(item.avatar),
            title: item.title,
            lastUserName: item.last_message ? item.last_message.first_name : "",
            lastMessage: item.last_message ? item.last_message.content : "",
            timeLastMessage: item.last_message
              ? setTime(item.last_message.time)
              : "",
            isNewMessages: false,
            countNewMessages: item.unread_count,
          };
        }
      });
      store.set("chats", arrayChats);
      return res;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async addUserInChat(data: IUserInChats) {
    try {
      const res: any = await chatsApi.addUserInChat(data);
      if (res.status !== 200)
        throw new Error("Не получилось добавить пользователя в чат");
      const chats = this.getChats();
      return chats;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async deleteUserFromChat(data: IUserInChats) {
    try {
      const res: any = await chatsApi.deleteUserFromChat(data);
      if (res.status !== 200)
        throw new Error("Не получилось удалить пользователя из чата");
      const chats = await this.getChats();
      return chats;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async createChat(data: IChat) {
    try {
      const res: any = await chatsApi.createChat(data);
      if (res.status !== 200) throw new Error("Не получилось создать чат");
      const chats = await this.getChats();
      return chats;
    } catch (error) {
      console.log(error.message);
    }
  }

  public async getTokenChat(chatId: number) {
    try {
      const res: any = chatsApi.getTokenChat(chatId);
      if (res.status !== 200) throw new Error("Не получилось взять токен");
      const result = JSON.parse(res.response);
      return result.token;
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default new ChatController();
