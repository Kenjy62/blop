// Icons
import { RxCross2 } from "react-icons/rx";

// Required
import { useContext } from "react";

// Context
import { PopupContext } from "../../context/popup";

export default function CloseButton() {
  const { togglePopup } = useContext(PopupContext);

  return (
    <div
      className="flex justify-center items-center p-2 bg-white dark:bg-night-400 rounded-full cursor-pointer"
      onClick={() => togglePopup()}
    >
      <RxCross2 className="text-dark text-xl cursor-pointer dark:text-white" />
    </div>
  );
}
