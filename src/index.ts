import ChatPage from "./component/chat-page";
import error from "./component/error";
import LoginForm from "./component/login-form";
import Popup from "./component/popup";
import Profile from "./component/profile";
import { changePasswordProps } from "./pages/change-password";
import { changeProfileProps } from "./pages/change-profile";
import { chatPageProps } from "./pages/chat";
import { chatsPageProps } from "./pages/chats";
import { errorPageProps } from "./pages/error-server";
import { loginProps } from "./pages/login";
import { notFoundPageProps } from "./pages/not-found";
import { popupProps } from "./pages/popup";
import { profileProps } from "./pages/profile";
import { registrationProps } from "./pages/registration";
import Router from "./utils/router";
import AuthController from "./controllers/auth-controller";
import ChatController from "./controllers/chat-controller";

const router = new Router();

router
  .use("/", LoginForm, loginProps)
  .use("/500", error, errorPageProps)
  .use("/sign-up", LoginForm, registrationProps)
  .use("/settings", Profile, profileProps())
  .use("/messenger", ChatPage, chatsPageProps())
  .use("/change-password", Profile, changePasswordProps())
  .use("/change-profile", Profile, changeProfileProps())
  .use("/chat", ChatPage, chatPageProps())
  .use("/popup", Popup, popupProps);

router.start();

const { pathname } = window.location;
if (!router.getRoute(pathname)) {
  router.use("/404", error, notFoundPageProps).go("/404");
}

AuthController.getUserInfo().then((res: any) => {
  if (res.status == 200) {
    ChatController.getChats().then((res) => {
      if (res?.status == 200) {
        router.go("/messenger");
      }
    });
  }
});
