import error from "./component/error";
import LoginForm from "./component/login-form";
import { errorPageProps } from "./pages/error-server";
import { loginProps } from "./pages/login";
import { notFoundPageProps } from "./pages/not-found";
import { registrationProps } from "./pages/registration";
import Router from "./utils/router";

const router = new Router();

router
  .use("/", LoginForm, loginProps)
  .use("/500", error, errorPageProps)
  .use("/404", error, notFoundPageProps)
  .use("/sign-up", LoginForm, registrationProps);
router.start();
