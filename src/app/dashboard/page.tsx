"use client";
import { NewLinkForm } from "@/components/NewLinkForm";

import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";
import { GetAllLink } from "../../../actions/getlinks/actions";
import { useEffect, useState } from "react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
interface Link {
  originalLink: string;
  shortenedLink: string;
  // other properties...
}
export default function Dashboard() {
  const [allLinks, SetLinks] = useState([]);
  const { user } = useKindeBrowserClient();
  const { execute, result, status } = useAction(GetAllLink, {
    onSuccess(data) {
      if (data.error) {
        console.log(data.error);
      }
      if (data.success) {
        const links = data.links;
        console.log(links);
        SetLinks(links);
      }
    },
    onExecute(data) {
      console.log("creating new link");
    },
    onError(error) {
      if (error.serverError) {
        console.log("serverError");
      }
      if (error.validationErrors) {
        console.log("validationErrors");
      }
    },
  });
  useEffect(() => {
    execute({});
  }, []);

  return (
    <div className="container">
      <h1 className="text-4xl font-sans font-semibold">
        Welcome {user?.given_name}
      </h1>
      <p>All Links</p>
      {allLinks && (
        <div className=" flex flex-col gap-5 overflow-y-scroll max-w-full bg-white">
          {allLinks.map((link, index) => (
            <div
              className="bg-gray-400 px-3 py-5 flex flex-row items-center"
              key={index}
            >
              <p>{index + 1}</p>
              <div className="">
                <p>{link.name}</p>
                <p>{link.originalLink}</p>
                <p>{link.customLink}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
