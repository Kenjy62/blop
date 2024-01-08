"use client";

// Required
import { useRef, useState, useContext } from "react";
import Image from "next/image";

// Toast
import toast from "react-hot-toast";

// Context
import { ThemeContext } from "@/app/src/context/theme";

// Components
import { RxPencil1 } from "react-icons/rx";
import { ToastError, ToastSuccess } from "../../UI/Toast/Toasts";
import { CoverUpdate } from "@/app/src/features/user";

export default function Cover({ picture }) {
  const CoverFile = useRef();
  const buttonRef = useRef();
  const [file, setFile] = useState();

  const { colorScheme } = useContext(ThemeContext);

  var color;

  if (colorScheme === "Watermelon") {
    color = `text-white text-2xl p-1 bg-watermelon-400 rounded-full cursor-pointer`;
  } else if (colorScheme === "royal-blue") {
    color = `text-white text-2xl p-1 bg-royal-blue-400 rounded-full cursor-pointer`;
  } else if (colorScheme === "harlequin") {
    color = `text-white text-2xl p-1 bg-harlequin-400 rounded-full cursor-pointer`;
  } else if (colorScheme === "fire-bush") {
    color = `text-white text-2xl p-1 bg-fire-bush-400 rounded-full cursor-pointer`;
  } else if (colorScheme === "cinnabar") {
    color = `text-white text-2xl p-1 bg-cinnabar-400 rounded-full cursor-pointer`;
  } else if (colorScheme === "purple-heart") {
    color = `text-white text-2xl p-1 bg-purple-heart-400 rounded-full cursor-pointer`;
  }

  // Open the input files
  const Edit = () => {
    CoverFile.current.click();
  };

  const Update = async (e) => {
    const File = e.target.files[0];
    if (File && File.size < 2097152) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(File);

      buttonRef.current.click();
    } else {
      alert('File is too big (max 2mo)')
      setFile(null);
      CoverFile.current.value = ''
    }
  };

  const sendUpdate = async (formData) => {
    const { message, status } = await CoverUpdate(formData);

    if (status === 200) {
      toast(<ToastSuccess message={message} />, {
        position: "bottom-left",
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
      });
    }

    if (status === 400) {
      toast(<ToastError message={message} />, {
        position: "bottom-left",
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
        },
      });
    }
  };

  return (
    <div className="relative flex-1 h-[200px]">
      <Image
        alt="User Cover"
        src={file?.length > 0 ? file : picture}
        height={600}
        width={600}
        className="rounded-lg relative object-cover h-[200px]"
      />
      <div className="absolute h-full w-full top-0 left-0 flex justify-center items-center">
        <RxPencil1 onClick={() => Edit()} className={color} />
      </div>
      <form>
        <input
          onChange={(e) => Update(e)}
          ref={CoverFile}
          type="file"
          className="hidden"
          name="cover"
        />
        <button className="hidden" ref={buttonRef} formAction={sendUpdate} />
      </form>
    </div>
  );
}
