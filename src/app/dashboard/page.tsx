"use client";
import { NewLinkForm } from "@/components/NewLinkForm";

import { useAction } from "next-safe-action/hooks";
import { redirect, useRouter } from "next/navigation";
import { GetAllLink } from "../../../actions/getlinks/actions";
import { useEffect, useState } from "react";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { DeleteLink } from "../../../actions/deleteEntry/action";
import { notify, notifyError } from "../../components/ToastsComponents";
import { revalidatePath } from "next/cache";
interface Link {
  name: string;
  isCustom: boolean;
  customLink: string;
  originalLink: string;
  _id: string;
  shortenedLink: string;
  clicks: number;
}
export default function Dashboard() {
  const [allLinks, SetLinks] = useState<Link[]>();
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState(false);
  const { execute: execute2 } = useAction(DeleteLink, {
    onSuccess(data) {
      if (data.success) {
        notify("Link deleted successfully! Please refresh page");

        router.push("/dashboard");
        console.log("success deleted link");
      } else {
        console.log("error deleting the link");
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
  const { execute, result, status } = useAction(GetAllLink, {
    onSuccess(data) {
      if (data.error) {
        console.log(data.error);
      }
      if (data.success) {
        const links = data.links;
        setLoading(false);

        SetLinks(links);
      }
    },
    onExecute(data) {
      setLoading(true);
      console.log("fetching links");
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
  const deleteLink = (id: string) => {
    console.log(id);
    execute2({ id: id });
  };
  return (
    <div className="container">
      {loading == true && <p>Loading...</p>}
      {loading == false && (
        <div>
          <h1 className="text-4xl font-sans font-semibold">
            Welcome {user?.given_name}
          </h1>
          <p className="mt-3 text-xl font-medium mb-4">All Links</p>
        </div>
      )}

      {allLinks && (
        <div className=" flex flex-col gap-5  overflow-hidden  overflow-y-scroll h-[510px]  ">
          {allLinks.map((link, index) => (
            <div
              className="bg-gray-300 px-3 py-5 flex flex-row  items-center gap-5 relative shadow-md"
              key={index}
            >
              <p className="font-semibold">{index + 1}</p>
              <div className="">
                <p className="text-xl font-semibold">{link.name}</p>
                {link.isCustom == true && (
                  <Link
                    href={`/${link.customLink}`}
                    className="text-blue-500 cursor-pointer font-medium font-sans"
                  >
                    https://shortify-nu.vercel.app/{link.customLink}
                  </Link>
                )}
                {link.shortenedLink && !link.isCustom && (
                  <Link
                    href={`/${link.shortenedLink}`}
                    className="text-blue-500 cursor-pointer font-medium font-sans"
                  >
                    https://shortify-nu.vercel.app/{link.shortenedLink}
                  </Link>
                )}
              </div>

              <div className="absolute right-5 top-2">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex flex-row items-center gap-2">
                    <p className="font-semibold text-lg">Views: </p>
                    <p>{link.clicks}</p>
                  </div>
                  <div>
                    <MdDelete
                      size={25}
                      onClick={() => deleteLink(link._id)}
                      className="cursor-pointer hover:text-gray-600"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute right-5 bottom-2">
                <p>{link.originalLink}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
