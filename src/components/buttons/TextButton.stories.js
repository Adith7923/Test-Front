import TextButton from "./TextButton";
import { GoTrash } from "react-icons/go";

export default {
  title: "Components/Buttons/Text Button",
  component: TextButton,
};

export const Textbutton = {
  args: {
    icon: <GoTrash />,
    text: "Delete",
    onClick: (e) => {
      console.log("clicked");
    },
  },
};
