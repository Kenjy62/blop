"use client";

// Required
import { useContext } from "react";

// Context
import { PopupContext } from "../../context/popup";

// Components
import Reply from "./Type/Reply";
import Overlay from "./Overlay";
import Share from "./Type/Share";
import Bookmark from "./Type/Bookmark";
import Media from "./Type/Media";

export default function Popup() {
  const { isOpen, type, data } = useContext(PopupContext);

  if (isOpen) {
    return (
      <Overlay>
        {type === "comment" && <Reply postId={data} />}
        {type === "share" && <Share postId={data} />}
        {type === "bookmark" && <Bookmark postId={data} />}
        {type === "media" && <Media media={data} />}
      </Overlay>
    );
  }
}
