import { AuthAPI } from "../api/auth-api";
import { checkAvatarPath } from "../utils/helpers";
import store from "../utils/store";
import { IApi, IAuthData, IUser } from "../utils/types";

const authApi = new AuthAPI();

export default class AuthController {
  public signup(data: IUser) {
    try {
      return authApi.signup(data);
    } catch (error) {
      return error;
    }
  }

  public signin(data: IAuthData) {
    try {
      return authApi.signin(data);
    } catch (error) {
      return error;
    }
  }

  public logout() {
    try {
      return authApi.logout().then((res: IApi) => {
        if (res.data) {
          if (!res.data.reason) {
            store.clear();
          }
        }

        return res;
      });
    } catch (error) {
      return error;
    }
  }

  public getUserInfo() {
    try {
      return authApi.getUserInfo().then((res: IApi) => {
        if (res.data) {
          if (!res.data.reason) {
            store.set("user", checkAvatarPath(JSON.parse(res.response)));
          }
        }

        return res;
      });
    } catch (error) {
      return error;
    }
  }
}
