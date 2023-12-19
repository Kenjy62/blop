"use client";

// Required
import { useContext } from "react";

// Context
import { PopupContext } from "../../context/popup";

// Components
import Reply from "../Modal/Type/Reply";
import Overlay from "./Overlay";
import Share from "../Modal/Type/Share";
import Bookmark from "../Modal/Type/Bookmark";

export default function Popup() {
  const { isOpen, type, data } = useContext(PopupContext);

  if (isOpen) {
    return (
      <Overlay>
        {type === "comment" && <Reply postId={data} />}
        {type === "share" && <Share postId={data} />}
        {type === "bookmark" && <Bookmark postId={data} />}
      </Overlay>
    );
  }
}
