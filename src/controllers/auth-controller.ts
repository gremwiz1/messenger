import { AuthAPI } from "../api/auth-api";
import { checkAvatarPath } from "../utils/helpers";
import store from "../utils/store";
import { IAuthData, IUser } from "../utils/types";

const authApi = new AuthAPI();

class AuthController {
  public async signup(data: IUser) {
    try {
      const res = await authApi.signup(data);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async signin(data: IAuthData) {
    try {
      const res = await authApi.signin(data);
      return res;
    } catch (error) {
      return error;
    }
  }

  public async logout() {
    try {
      const res: any = await authApi.logout();
      if (res.status == 200) {
        store.clear();
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  public async getUserInfo() {
    try {
      const res: any = await authApi.getUserInfo();
      if (res.status == 200) {
        store.set("user", checkAvatarPath(JSON.parse(res.response)));
      }
      return res;
    } catch (error) {
      return error;
    }
  }
}
export default new AuthController();
