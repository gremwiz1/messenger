import { UserAPI } from "../api/user-api";
import { checkAvatarPath } from "../utils/helpers";
import store from "../utils/store";
import { IApi, IAvatar, ILogin, IPassword, IProfile } from "../utils/types";

const userApi = new UserAPI();

class UserController {
  public changeUserAvatar(form: IAvatar) {
    try {
      return userApi.changeUserAvatar(form).then((res: IApi) => {
        if (res.data) {
          store.set("user", checkAvatarPath(JSON.parse(res.response)));
        }
        return res;
      });
    } catch (error) {
      return error;
    }
  }

  public changeUserPassword(data: IPassword) {
    try {
      return userApi.changeUserPassword(data);
    } catch (error) {
      return error;
    }
  }

  public changeUserProfile(data: IProfile) {
    try {
      return userApi.changeUserProfile(data).then((res: IApi) => {
        if (res.data) {
          store.set("user", checkAvatarPath(JSON.parse(res.response)));
        }
        return res;
      });
    } catch (error) {
      return error;
    }
  }

  public searchUserByLogin(data: ILogin) {
    try {
      return userApi.searchUserByLogin(data);
    } catch (error) {
      return error;
    }
  }
}
export default new UserController();
