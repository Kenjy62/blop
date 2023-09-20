"use client";

// Required
import { useTransition, useRef, useState } from "react";

// Actions
import { NewPost } from "../../features/newpost";

// Components
import Button from "@/app/src/components/UI/Button/Button";

// Icons
import {
  RxImage,
  RxPaperPlane,
  RxFace,
  RxCalendar,
  RxCross1,
} from "react-icons/rx";
import Image from "next/image";

export default function Textarea() {
  // States
  const [files, setFiles] = useState([]);
  const [textarea, setTextarea] = useState();

  // Transition with SA
  let [isPending, startTransition] = useTransition();

  // Reference
  const inputFile = useRef();

  // Open the input files
  const userAddImages = () => {
    inputFile.current.click();
  };

  // Verify and display preview of files
  const selectImages = (e) => {
    const inputFiles = Array.from(e.target.files);
    if (inputFiles.length > 0 && inputFiles.length <= 4) {
      inputFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setFiles((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    } else {
      alert("Maximum 4 Images");
    }
  };

  // Remove Images
  const deleteImages = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Send Post
  const sendPost = () => {
    if (textarea?.length >= 5) {
      startTransition(async () => {
        const result = await NewPost(
          textarea,
          files.length > 0 ? true : false,
          "post"
        );
        if (result) {
          resetForm();
        }
      });
    } else {
      alert("Minimum 5 characters");
    }
  };

  // Reset Form
  const resetForm = () => {
    setTextarea("");
    setFiles([]);
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-full border rounded-lg p-4">
        <textarea
          onChange={(e) => setTextarea(e.target.value)}
          className="w-full rounded-lg resize-none outline-none"
          placeholder="Write a new post.."
          value={textarea}
        />
        <div className="flex flex-row gap-4">
          {files.length > 0 &&
            files.map((file, index) => {
              return (
                <div key={index} className="relative">
                  <Image
                    src={file}
                    height={150}
                    width={150}
                    className="w-[150px] h-[150px] object-cover object-center rounded-lg"
                  />
                  <RxCross1
                    onClick={() => deleteImages(index)}
                    className="absolute top-2 right-2 text-white p-1 bg-watermelon-400 rounded-full"
                  />
                </div>
              );
            })}
        </div>
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="flex flex-row gap-4">
            <RxImage onClick={userAddImages} className="cursor-pointer" />
            <RxFace className="cursor-pointer" />
            <RxCalendar className="cursor-pointer" />
            <input
              multiple
              onChange={selectImages}
              ref={inputFile}
              type="file"
              className="hidden"
            />
          </div>
          <div onClick={sendPost}>
            <Button>
              {isPending ? "Loading..." : <RxPaperPlane size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
