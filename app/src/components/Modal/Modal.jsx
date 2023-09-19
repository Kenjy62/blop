"use client";

// Required
import { useRouter, useSearchParams } from "next/navigation";
import ReactModal from "react-modal";

// Components
import Reply from "./Type/Reply";

// Set Modal
ReactModal.setAppElement("html");

export default function Modal() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <ReactModal
      isOpen={searchParams.get("comment") ? true : false}
      onRequestClose={() => router.back()}
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
      <Reply postId={searchParams.get("comment")} />
    </ReactModal>
  );
}
