"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewLinkFormSchema } from "@/lib/NewLinkFormSchema";
import { createSafeNewLink } from "../../actions/insertdata/actions";
import { ToastContainer, toast } from "react-toastify";
import SuccessToast from "./toasts/SuccessToast";
import { useRef } from "react";

export function NewLinkForm() {
  const notify = (message: string) =>
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyError = (message: string) =>
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // 1. Define your form.
  const form = useForm<z.infer<typeof NewLinkFormSchema>>({
    resolver: zodResolver(NewLinkFormSchema),
    defaultValues: {
      name: "",
      originalLink: "",
    },
  });
  const { execute, result, status } = useAction(createSafeNewLink, {
    onSuccess(data) {
      if (data.error) {
        console.log(data.error);
      }
      if (data.success) {
        notify("Create Link Successfully");
        console.log(data.success);
      }
    },
    onExecute(data) {
      console.log("creating new link");
    },
    onError(error) {
      notifyError(`${error}`);
      if (error.serverError) {
        console.log("serverError");
      }
      if (error.validationErrors) {
        console.log("validationErrors");
      }
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof NewLinkFormSchema>) {
    execute(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="originalLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orignal Link</FormLabel>
                <FormControl>
                  <Input placeholder="Original Link" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
         
          <Button disabled={status === "executing"} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
