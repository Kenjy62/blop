// Icons
import { RxCross2 } from "react-icons/rx";

// Required
import { useContext } from "react";

// Context
import { PopupContext } from "../../context/popup";

export default function CloseButton() {
  const { togglePopup } = useContext(PopupContext);

  return (
    <RxCross2
      onClick={() => togglePopup()}
      className="text-dark text-xl cursor-pointer dark:text-white"
    />
  );
}
