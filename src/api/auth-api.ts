import { BaseUrl } from "../utils/const";
import { HTTPTransport } from "../utils/http-transport";

const settingsAPIInstance = new HTTPTransport(BaseUrl);

interface IAuthData {
  login: string;
  password: string;
}
interface IUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}
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
