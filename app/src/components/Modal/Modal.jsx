"use client";

// Required
import { useRouter, useSearchParams } from "next/navigation";
import ReactModal from "react-modal";

// Components
import Reply from "../Popup/Type/Reply";
import Share from "../Popup/Type/Share";
import Bookmark from "../Popup/Type/Bookmark";

// Set Modal
ReactModal.setAppElement("html");

export default function Modal({ defaultTheme }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <ReactModal
      isOpen={
        searchParams.get("comment") ||
          searchParams.get("share") ||
          searchParams.get("bookmark")
          ? true
          : false
      }
      onRequestClose={() => router.back()}
      overlayClassName={!defaultTheme ? "" : "dark"}
      className={"dark:bg-night-300 bg-white"}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#00000085",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          inset: 0,
          overflow: "hidden",
        },
        content: {
          position: "relative",
          minWidth: 500,
          height: "auto",
          padding: 16,
          borderRadius: 12,
          margin: 0,
          overflow: "hidden",
          inset: 0,
        },
      }}
    >
      {searchParams.get("comment") && (
        <Reply postId={searchParams.get("comment")} />
      )}
      {searchParams.get("share") && (
        <Share postId={searchParams.get("share")} />
      )}
      {searchParams.get("bookmark") && (
        <Bookmark postId={searchParams.get("bookmark")} />
      )}
    </ReactModal>
  );
}
