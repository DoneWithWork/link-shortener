import { NewCustomLinkForm } from "@/components/NewLinkCustomForm";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Create a New Custom Link</h1>
      <NewCustomLinkForm />
    </>
  );
};

export default page;
