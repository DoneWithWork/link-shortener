"use client";
import React, { useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { RedirectToLink } from "../../../actions/redirect/action";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { execute, result, status } = useAction(RedirectToLink, {
    onSuccess(data) {
      if (data.error) {
        console.log(data.error);
      }
      if (data.success) {
        console.log(data.success);
        if (data.originalLink) {
          router.push(data.originalLink);
        }
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
    execute({ id: params.id });
  }, [params.id]); // Empty dependency array means this effect runs once on mount
}
