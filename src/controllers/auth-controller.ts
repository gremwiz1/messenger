import { AuthAPI } from "../api/auth-api";
import { BaseUrlAvatar } from "../utils/const";
import store from "../utils/store";
import { IApi, IAuthData, IUser, IUserModel } from "../utils/types";

const avatar = "../../static/logo.png";
function setAvatarPath(path?: string): string | undefined {
  return path ? `${BaseUrlAvatar}${path}` : avatar;
}

function checkAvatarPath(user: IUserModel) {
  return Object.assign({}, user, {
    avatar: setAvatarPath(user.avatar),
  });
}

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
