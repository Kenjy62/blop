"use client";

// Required
import Link from "next/link";

// Icons
import { RxClipboard } from "react-icons/rx";

// Context
import { CheckColorScheme } from "@/app/src/hooks/colorScheme";

export default function Form({ data }) {
  const colorScheme = CheckColorScheme();

  const settings = [
    { name: "Username", placeholder: data.name },
    { name: "Password", placeholder: "******" },
    { name: "Email", placeholder: data.email },
  ];

  var style;
  var button;

  if (colorScheme === "royal-blue") {
    style = `p-1 rounded-lg dark:bg-night-300 border outline-none dark:border-night-200 dark:focus:border-royal-blue-400`;
    button = `py-1 px-3 h-fit bg-royal-blue-400 text-white rounded-lg w-fit hover:bg-royal-blue-500 cursor-pointer`;
  } else if (colorScheme === "Watermelon") {
    style = `p-1 rounded-lg dark:bg-night-300 border outline-none dark:border-night-200 dark:focus:border-watermelon-400`;
    button = `py-1 px-3 h-fit bg-watermelon-400 text-white rounded-lg w-fit hover:bg-watermelon-500 cursor-pointer`;
  } else if (colorScheme === "cinnabar") {
    style = `p-1 rounded-lg dark:bg-night-300 border outline-none dark:border-night-200 dark:focus:border-cinnabar-400`;
    button = `py-1 px-3 h-fit bg-cinnabar-400 text-white rounded-lg w-fit hover:bg-cinnabar-500 cursor-pointer`;
  } else if (colorScheme === "harlequin") {
    style = `p-1 rounded-lg dark:bg-night-300 border outline-none dark:border-night-200 dark:focus:border-harlequin-400`;
    button = `py-1 px-3 h-fit bg-harlequin-400 text-white rounded-lg w-fit hover:bg-harlequin-500 cursor-pointer`;
  } else if (colorScheme === "fire-bush") {
    style = `p-1 rounded-lg dark:bg-night-300 border outline-none dark:border-night-200 dark:focus:border-fire-bush-400`;
    button = `py-1 px-3 h-fit bg-fire-bush-400 text-white rounded-lg w-fit hover:bg-fire-bush-500 cursor-pointer`;
  } else if (colorScheme === "purple-heart") {
    style = `p-1 rounded-lg dark:bg-night-300 border outline-none dark:border-night-200 dark:focus:border-purple-heart-400`;
    button = `py-1 px-3 h-fit bg-purple-heart-400 text-white rounded-lg w-fit hover:bg-purple-heart-500 cursor-pointer`;
  }

  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-6">
        {settings.map((item, id) => {
          return (
            <div key={id} className={"flex flex-row gap-2 items-center"}>
              <p className="w-28">{item.name} : </p>
              <input placeholder={item.placeholder} className={style} />
            </div>
          );
        })}

        <div className={"flex flex-row gap-2 items-center"}>
          <p className="w-28">Secret Key : </p>
          <input disabled placeholder={"test"} className={style} />
          <div className="flex justify-center items-center bg-light-100 dark:bg-night-300 border dark:border-night-200 cursor-pointer p-1 rounded-lg">
            <RxClipboard />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Link href="#" className="text-watermelon-400">
            Télécharger toutes mes données
          </Link>
          <Link href="#" className="text-red-400">
            Supprimer mon compte
          </Link>
        </div>
        <div className="flex justify-end">
          <button className={button}>Save</button>
        </div>
      </form>
    </div>
  );
}
