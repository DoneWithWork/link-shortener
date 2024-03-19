import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";
import { MdCancel, MdEmail, MdSupervisorAccount } from "react-icons/md";
interface SettingsProps {
  toggle: () => void;
}
const Settings: React.FC<SettingsProps> = ({ toggle }) => {
  const { user } = useKindeBrowserClient();
  return (
    <div className="z-10 absolute w-full h-full bg-black/50 flex flex-col items-center justify-center  ">
      <div className="mx-auto w-[400px] h-[500px] bg-gray-600 my-auto opacity-100 flex flex-col items-center  p-3 absolute">
        <MdCancel
          size={30}
          className="absolute right-2 cursor-pointer"
          onClick={toggle}
        />
        <h1 className="text-4xl font-semibold">Profile</h1>

        <div className="border-2 black rounded-full mt-3">
          <Image
            alt="user profile picture"
            src={user?.picture || "/bg.png"}
            width={70}
            height={70}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-row items-center gap-5">
          <MdSupervisorAccount size={40} />
          <p className="text-2xl font-semibold mt-5 mb-5">{user?.given_name}</p>
        </div>
        <div className="flex flex-row items-center   gap-5">
          <MdEmail size={30} />
          <p className="text-xl font-semibold mt-5 mb-5">{user?.email}</p>
        </div>
        <LogoutLink className="border-2 border-black px-5 py-2 rounded-full hover:bg-gray-400 font-semibold">
          Logout
        </LogoutLink>
      </div>
    </div>
  );
};

export default Settings;
