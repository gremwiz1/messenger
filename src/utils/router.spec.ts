import { assert } from "chai";
import error from "../component/error";
import LoginForm from "../component/login-form";
import { errorPageProps } from "../pages/error-server";
import { notFoundPageProps } from "../pages/not-found";
import { registrationProps } from "../pages/registration";
import Router from "./router";

const router = new Router();
describe("Тестирование роутера", () => {
  describe("Тестирование роутера", () => {
    it("Функция роутера getRoute", () => {
      router.use("/404", error, notFoundPageProps);
      const route = router.getRoute("/404");

      assert.isObject(route);
    });

    it("Функция роутера go", () => {
      router
        .use("/sign-up", LoginForm, registrationProps)
        .use("/404", error, notFoundPageProps)
        .use("/500", error, errorPageProps)
        .start();
      router.go("/sign-up");
      router.go("/404");

      assert.equal(window.location.pathname, "/404");
    });

    it("Функция роутера replace", () => {
      router.replace("/sign-up");

      assert.equal(window.location.pathname, "/sign-up");
    });
  });

  describe("Тестирование инициализации роутера", () => {
    it("Это тот же роутер", () => {
      assert.deepEqual(router, new Router());
    });
  });
});
