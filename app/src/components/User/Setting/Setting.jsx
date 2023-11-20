"use client";

// Required
import { useEffect, useState, useContext } from "react";

// Components
import { Switch } from "@headlessui/react";
import { updateNotificationSetting } from "@/app/src/features/user";

// Context
import { ThemeContext } from "@/app/src/context/theme";

export default function Setting({ display, name, authorized }) {
  const [isAuthorized, setIsAuthorized] = useState(authorized);
  const { toggleTheme, theme } = useContext(ThemeContext);

  const update = async (type) => {
    await updateNotificationSetting(type);
    setIsAuthorized(!isAuthorized);

    if (type === "Dark Mode") {
      toggleTheme();
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <div>{display}</div>
      <Switch
        checked={isAuthorized}
        onChange={() => update(name)}
        className={`${
          isAuthorized ? "bg-watermelon-400 dark:bg-night-300" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            isAuthorized ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
}
