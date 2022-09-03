import { UserAPI } from "../api/user-api";
import { checkAvatarPath } from "../utils/helpers";
import store from "../utils/store";
import { ILogin, IPassword, IProfile } from "../utils/types";

const userApi = new UserAPI();

class UserController {
  public async changeUserAvatar(form: FormData) {
    try {
      const res: any = await userApi.changeUserAvatar(form);
      if (res.status == 200) {
        store.set("user", checkAvatarPath(JSON.parse(res.response)));
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  public async changeUserPassword(data: IPassword) {
    try {
      const res = await userApi.changeUserPassword(data);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async changeUserProfile(data: IProfile) {
    try {
      const res: any = await userApi.changeUserProfile(data);
      if (res.status == 200) {
        store.set("user", checkAvatarPath(JSON.parse(res.response)));
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  public async searchUserByLogin(data: ILogin) {
    try {
      const res = await userApi.searchUserByLogin(data);
      return res;
    } catch (error) {
      return error;
    }
  }
}
export default new UserController();
