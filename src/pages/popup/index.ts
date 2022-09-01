import Button from "../../component/button";
import userController from "../../controllers/user-controller";
import Router from "../../utils/router";

const router = new Router();
let ButtonSubmit = new Button({
  title: "Поменять",
  events: {
    click: function (e: Event) {
      e.preventDefault();
      const formData = new FormData(
        document.querySelector("form") as HTMLFormElement
      );

      userController.changeUserAvatar(formData).then((res) => {
        if (res.status === 200) {
          router.go("/settings");
        } else {
          console.log("Не удалось изменить аватар");
        }
      });
    },
  },
});

export const popupProps = {
  Button: ButtonSubmit,
};
