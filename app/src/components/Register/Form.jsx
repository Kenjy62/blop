"use client";

// Required
import { useRef, useState } from "react";
import Image from "next/image";

// Features
import { Register } from "../../features/user";

// Icons
import { RxImage } from "react-icons/rx";

export default function Form() {
  const avatar = useRef();
  const cover = useRef();
  const divRef = useRef();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [avatarSelected, setAvatarSelected] = useState();
  const [coverSelected, setCoverSelected] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const setAvatar = () => {
    avatar.current.click();
  };

  const setCover = () => {
    cover.current.click();
  };

  const UpdateAvatar = async (e) => {
    const File = e.target.files[0];
    if (File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSelected(e.target.result);
      };
      reader.readAsDataURL(File);
    } else {
      setAvatarSelected(null);
    }
  };

  const UpdateCover = async (e) => {
    const File = e.target.files[0];
    if (File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverSelected(e.target.result);
      };
      reader.readAsDataURL(File);
    } else {
      setCoverSelected(null);
    }
  };

  async function register(formData) {
    const { message, status } = await Register(formData);

    if (status === 400) {
      setErrorMsg(message);
    }

    if (status === 200) {
      setErrorMsg(message);
    }
  }

  return (
    <>
      {errorMsg}
      <form
        ref={divRef}
        className="flex flex-col gap-4 p-4 border rounded-lg min-w-[400px]"
      >
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <div className="w-[300px] h-32 bg-watermelon-300 rounded-lg flex justify-center relative">
              {coverSelected?.length > 0 && (
                <Image
                  src={coverSelected}
                  height={128}
                  width={300}
                  className="object-cover object-center h-32 rounded-lg"
                />
              )}
              <input
                name="cover"
                ref={cover}
                className="hidden"
                onChange={(e) => UpdateCover(e)}
                type="file"
              />
              <div className="h-full w-full absolute flex justify-center items-center">
                <RxImage
                  onClick={() => setCover()}
                  className="absolute z-50 text-black p-2 text-3xl bg-watermelon-400 rounded-full"
                />
              </div>
            </div>
            <div className="w-[100px] h-32 bg-watermelon-300 rounded-lg flex justify-center relative">
              {avatarSelected?.length > 0 && (
                <Image
                  src={avatarSelected}
                  height={100}
                  width={100}
                  className="object-cover h-32 object-center rounded-lg"
                />
              )}
              <input
                name="avatar"
                onChange={(e) => UpdateAvatar(e)}
                type="file"
                className="hidden"
                ref={avatar}
              />
              <div className="h-full w-full absolute flex justify-center items-center">
                <RxImage
                  onClick={() => setAvatar()}
                  className="absolute z-50 text-black p-2 text-3xl bg-watermelon-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            className="border p-1"
            name="name"
            type="text"
            placeholder="Your pseudo"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-1"
            name="email"
            type="text"
            placeholder="email@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 border"
            name="password"
            type="text"
            placeholder="****"
          />
        </div>
        <div className="flex justify-center">
          <button
            formAction={register}
            className="py-1 px-3 h-fit bg-watermelon-400 text-white rounded-lg w-fit hover:bg-watermelon-500 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
