"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { RxPencil1 } from "react-icons/rx";

export default function Cover({ picture }) {
  const CoverFile = useRef();
  const [file, setFile] = useState();

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
          alert("update");
        } else {
          alert("error");
        }
      });
    } else {
      setImage(null);
    }
  };

  return (
    <div className="relative flex-1 h-[200px]">
      <Image
        src={file?.length > 0 ? file : picture}
        height={600}
        width={600}
        className="rounded-lg relative object-cover h-[200px]"
      />
      <div className="absolute h-full w-full top-0 left-0 flex justify-center items-center">
        <RxPencil1
          onClick={() => Edit()}
          className="text-white text-2xl p-1 bg-watermelon-400 rounded-full"
        />
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
