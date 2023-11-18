"use client";
import ReactModal from "react-modal";
import CreateConversation from "../Modal/Type/CreateConversation";
import { usePathname, useRouter } from "next/navigation";

export default function Modal({ userFollowed }) {
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);

  // Set Modal
  ReactModal.setAppElement("html");

  return (
    <ReactModal
      isOpen={pathname.includes("/Message/Create") ? true : false}
      onRequestClose={() => router.push("/Message")}
      overlayClassName={""}
      className={"dark:bg-night-300"}
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
      <CreateConversation userFollowed={userFollowed} />
    </ReactModal>
  );
}