"use client";

// Required
import { useRouter, useSearchParams } from "next/navigation";

// Components
import ReactModal from "react-modal";
import ImageLoader from "./Type/Image";

// Set Modal
ReactModal.setAppElement("html");

export default function Overlay() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <ReactModal
      isOpen={searchParams.get("picture") ? true : false}
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
          zIndex: 99,
        },
        content: {
          position: "relative",
          minWidth: "95%",
          height: "95%",
          padding: 16,
          zIndex: 99,
          borderRadius: 12,
          margin: 0,
          overflow: "hidden",
          inset: 0,
        },
      }}
    >
      <ImageLoader url={searchParams.get("picture")} />
    </ReactModal>
  );
}
