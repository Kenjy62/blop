"use client";

// Required
import { useEffect, useState } from "react";

// Components
import { Switch } from "@headlessui/react";
import { updateNotificationSetting } from "@/app/src/features/user";

export default function Setting({ name, authorized }) {
  const [isAuthorized, setIsAuthorized] = useState(authorized);

  const update = async (type) => {
    await updateNotificationSetting(type);
    setIsAuthorized(!isAuthorized);
  };

  return (
    <div className="flex flex-row justify-between">
      <div>{name} Notification</div>
      <Switch
        checked={isAuthorized}
        onChange={() => update(name)}
        className={`${
          isAuthorized ? "bg-watermelon-400" : "bg-gray-200"
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
