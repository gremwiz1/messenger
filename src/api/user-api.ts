import { BaseUrl } from "../utils/const";
import { HTTPTransport } from "../utils/http-transport";
import { IId, ILogin, IPassword, IProfile } from "../utils/types";

const settingsAPIInstance = new HTTPTransport(BaseUrl);

export class UserAPI {
  public changeUserProfile(data: IProfile) {
    return settingsAPIInstance.put("/user/profile", {
      data: JSON.stringify(data),
    });
  }
  public changeUserAvatar(data: FormData) {
    return settingsAPIInstance.put("/user/profile/avatar", {
      data: data,
    });
  }
  public changeUserPassword(data: IPassword) {
    return settingsAPIInstance.put("/user/password", {
      data: JSON.stringify(data),
    });
  }
  public getUser(data: IId) {
    return settingsAPIInstance.get(`/user/${data}`);
  }
  public searchUserByLogin(data: ILogin) {
    return settingsAPIInstance.post("/user/search", {
      data: JSON.stringify(data),
    });
  }
}
