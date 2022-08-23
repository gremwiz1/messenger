import { BaseUrl } from "../utils/const";
import { HTTPTransport } from "../utils/http-transport";
import { IAuthData, IUser } from "../utils/types";

const settingsAPIInstance = new HTTPTransport(BaseUrl);

export class AuthAPI {
  public signin(data: IAuthData) {
    return settingsAPIInstance.post("/auth/signin", {
      data: JSON.stringify(data),
    });
  }
  public signup(data: IUser) {
    return settingsAPIInstance.post("/auth/signup", {
      data: JSON.stringify(data),
    });
  }
  public getUserInfo() {
    return settingsAPIInstance.get("/auth/user");
  }
  public logout() {
    return settingsAPIInstance.post("/auth/logout");
  }
}
