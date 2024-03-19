import React from "react";
import NavBarAuth from "./NavbarAuth";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import "../app/globals.css";
const Navbar = () => {
  return (
    <>
      <nav className="flex flex-row items-center justify-between px-4 py-3">
        <h1 className="text-3xl font-semibold font-sans">Shortify</h1>
        <div>
          <NavBarAuth />
        </div>
      </nav>
      <div className="p-20 mx-auto w-full mt-5">
        <div className="flex flex-row gap-5">
          <div className="text-left  relative">
            <h1 className="text-6xl text-black font-bold font-mono">
              Free Short <br></br>Links for All
            </h1>
            <p className="text-xl text-gray-500 mt-4">
              Link shortening service for unlimited use
            </p>
            <LoginLink className="absolute" postLoginRedirectURL="/dashboard">
              Get Started
            </LoginLink>
          </div>
          <div>
            <Image src={"/bg.png"} alt="bg" width={500} height={300}></Image>
          </div>
        </div>
        <p>
          Made by <Link href="github.com/DoneWithWork">DoneWithWork</Link>
        </p>
      </div>
    </>
  );
};

export default Navbar;
