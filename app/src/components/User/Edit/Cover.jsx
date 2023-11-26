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

export default function Cover({ picture }) {
  const CoverFile = useRef();
  const [file, setFile] = useState();

  const { colorScheme } = useContext(ThemeContext);

  var color;

  if (colorScheme === "Watermelon") {
    color = `text-white text-2xl p-1 bg-watermelon-400 rounded-full`;
  } else if (colorScheme === "royal-blue") {
    color = `text-white text-2xl p-1 bg-royal-blue-400 rounded-full`;
  } else if (colorScheme === "harlequin") {
    color = `text-white text-2xl p-1 bg-harlequin-400 rounded-full`;
  } else if (colorScheme === "fire-bush") {
    color = `text-white text-2xl p-1 bg-fire-bush-400 rounded-full`;
  } else if (colorScheme === "cinnabar") {
    color = `text-white text-2xl p-1 bg-cinnabar-400 rounded-full`;
  } else if (colorScheme === "purple-heart") {
    color = `text-white text-2xl p-1 bg-purple-heart-400 rounded-full`;
  }

  // Open the input files
  const Edit = () => {
    CoverFile.current.click();
  };

  const Update = async (e) => {
    const File = e.target.files[0];
    if (File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(File);

      const data = new FormData();
      data.append("type", "cover");
      data.append("file", File);

      await fetch(`http://localhost:3000/api/Edit`, {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.status === 200) {
          toast(<ToastSuccess message={"Cover Update Successfully!"} />, {
            position: "bottom-left",
            style: { background: "transparent" },
          });
        } else {
          toast(<ToastError message={"An error occurred, try again"} />, {
            position: "bottom-left",
            style: { background: "transparent" },
          });
        }
      });
    } else {
      setImage(null);
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
      <input
        onChange={(e) => Update(e)}
        ref={CoverFile}
        type="file"
        className="hidden"
      ></input>
    </div>
  );
}
