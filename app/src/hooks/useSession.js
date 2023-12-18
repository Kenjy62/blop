"use client";

import { useDispatch } from "react-redux";
import { AuthLogin } from "../redux/Features/User";

export const useIsLogged = () => {
  const dispatch = useDispatch();

  var user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);

    dispatch(
      AuthLogin({
        id: user.id,
        name: user.name,
        picture: user.picture,
        token: "mysecrettoken",
      })
    );
  }

  return user;
};
