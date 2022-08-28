import Button from "../../component/button";
import userController from "../../controllers/user-controller";
import Router from "../../utils/router";
import store from "../../utils/store";

const router = new Router();
let ButtonSubmit = new Button({
  title: "Поменять",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const res = userController.changeUserAvatar({ avatar: formData });
      if (res.status === 200) {
        store.set("user", res.data);
        router.go("/settings");
      } else {
        console.log("Не удалось изменить аватар");
      }
    },
  },
});

export const popupProps = {
  Button: ButtonSubmit,
};
