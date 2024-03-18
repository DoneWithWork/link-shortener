"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import constants from "@/lib/constants";
import { usePathname } from "next/navigation";
import {
  MdLink,
  MdQrCode,
  MdSettings,
  MdPerson,
  MdCancel,
} from "react-icons/md";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

import Image from "next/image";
import Settings from "./Settings";

const SideNavBar = ({ children }: React.PropsWithChildren) => {
  const [open, IsOpen] = useState(false);
  const [username, SetUsername] = useState("");

  const pathname = usePathname();
  const { user } = useKindeBrowserClient();

  const toggle = () => {
    IsOpen(!open); // Inverting the current value of 'open'
  };
  return (
    <div className="flex relative ">
      {open && <Settings toggle={toggle} />}
      <div
        className={`flex flex-col border-r-2 border-gray-200  w-[250px] pt-2 px-4 h-[100vh] bg-blue-300 items-center relative ${
          open ? "opacity-30 transition-opacity duration-500" : "opacity-100"
        }`}
      >
        <div className="w-full m-5">
          <Link
            className="no-underline text-black font-serif font-semibold text-3xl"
            href="/"
          >
            Shortify
          </Link>
        </div>
        <div>
          <Link
            href="/dashboard/newlink"
            className="text-2xl font-semibold font-sans"
          >
            Create New
          </Link>
        </div>
        <hr className="w-full h-2 m-5"></hr>
        <div>
          {constants.map((item, index) => (
            <div className={`w-full flex items-center gap-5 m-5 `} key={index}>
              {item.icon && <item.icon size={30} />}{" "}
              {/* Render the icon if it exists */}
              <Link
                href={item.link}
                className={`${
                  pathname === item.link
                    ? "text-black font-semibold text-lg"
                    : "text-black/60 "
                }`}
              >
                {item.name}
              </Link>{" "}
              {/* Rendering the name as a Link */}
            </div>
          ))}
        </div>
        <div className="w-full  flex  items-center gap-4  absolute bottom-0 mx-auto p-5">
          <button onClick={toggle} className="flex items-center gap-5">
            <MdSettings size={30} />
            <p>Settings</p>
          </button>
        </div>
      </div>
      <div className="p-5 w-full">{children}</div>
    </div>
  );
};

export default SideNavBar;
