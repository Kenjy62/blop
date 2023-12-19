"use client";

// Required
import { useTransition, useRef, useState } from "react";
import Image from "next/image";

// Features
import { CreatePost } from "../../features/post";

// Hooks
import { CheckColorScheme } from "../../hooks/colorScheme";

// Icons
import {
  RxImage,
  RxPaperPlane,
  RxFace,
  RxCalendar,
  RxCross1,
} from "react-icons/rx";

// Toast
import toast from "react-hot-toast";

// Components
import Button from "../UI/Button/Button";
import { ToastError } from "../UI/Toast/Toasts";

export default function Textarea() {
  const colorScheme = CheckColorScheme();

  const buttonRef = useRef();

  // States
  const [files, setFiles] = useState([]);
  const [textarea, setTextarea] = useState();
  const [isFocus, setIsFocus] = useState(false);

  var color;
  var style;

  if (colorScheme === "Watermelon") {
    color = `absolute top-2 right-2 text-white p-1 bg-watermelon-400 rounded-full cursor-pointer`;
    style = `flex flex-col gap-4 w-full border rounded-lg p-4 dark:border-night-200 ${
      isFocus && "dark:border-watermelon-400 border-watermelon-400"
    }`;
  } else if (colorScheme === "royal-blue") {
    color = `absolute top-2 right-2 text-white p-1 bg-royal-blue-400 rounded-full cursor-pointer`;
    style = `flex flex-col gap-4 w-full border rounded-lg p-4 dark:border-night-200 ${
      isFocus && "dark:border-royal-blue-400 border-royal-blue-400"
    }`;
  } else if (colorScheme === "cinnabar") {
    color = `absolute top-2 right-2 text-white p-1 bg-cinnabar-400 rounded-full cursor-pointer`;
    style = `flex flex-col gap-4 w-full border rounded-lg p-4 dark:border-night-200 ${
      isFocus && "dark:border-cinnabar-400 border-cinnabar-400"
    }`;
  } else if (colorScheme === "purple-heart") {
    color = `absolute top-2 right-2 text-white p-1 bg-purple-heart-400 rounded-full cursor-pointer`;
    style = `flex flex-col gap-4 w-full border rounded-lg p-4 dark:border-night-200 ${
      isFocus && "dark:border-purple-heart-400 border-purple-heart-400"
    }`;
  } else if (colorScheme === "fire-bush") {
    color = `absolute top-2 right-2 text-white p-1 bg-fire-bush-400 rounded-full cursor-pointer`;
    style = `flex flex-col gap-4 w-full border rounded-lg p-4 dark:border-night-200 ${
      isFocus && "dark:border-fire-bush-400 border-fire-bush-400"
    }`;
  } else if (colorScheme === "harlequin") {
    color = `absolute top-2 right-2 text-white p-1 bg-harlequin-400 rounded-full cursor-pointer`;
    style = `flex flex-col gap-4 w-full border rounded-lg p-4 dark:border-night-200 ${
      isFocus && "dark:border-harlequin-400 border-harlequin-400"
    }`;
  }

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

  // Post Function
  async function post(formData) {
    startTransition(async () => {
      const { message, status } = await CreatePost(formData, "post");

      if (status === 400 || status === 500) {
        toast(<ToastError message={message} />, {
          position: "bottom-left",
          style: {
            background: "transparent",
            boxShadow: "none",
            border: "none",
          },
        });
        return;
      }

      if (status === 200) {
        resetForm();
      }
    });
  }

  // Reset Form
  const resetForm = () => {
    setTextarea("");
    setFiles([]);
  };

  // Liste if key enter is pressed
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <>
      <form>
        <div className={style}>
          <textarea
            name="text"
            onKeyDown={handleKeyPress}
            onFocus={() => setIsFocus(!isFocus)}
            onBlur={() => setIsFocus(!isFocus)}
            onChange={(e) => setTextarea(e.target.value)}
            className="w-full rounded-lg resize-none outline-none dark:bg-night-400"
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
                      alt="Post Image"
                    />
                    <RxCross1
                      onClick={() => deleteImages(index)}
                      className={color}
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
                name="pictures"
                multiple
                onChange={selectImages}
                ref={inputFile}
                type="file"
                className="hidden"
              />
            </div>
            <div>
              <button ref={buttonRef} formAction={post}>
                <Button>
                  {isPending ? "Loading..." : <RxPaperPlane size={18} />}
                </Button>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
