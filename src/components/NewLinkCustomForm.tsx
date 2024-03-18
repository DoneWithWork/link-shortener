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
import { createSafeNewCustomLink } from "../../actions/insertcustomdata/action";
import { NewCustomLinkFormSchema } from "@/lib/NewCustomFormLinkSchema";
import { useRouter } from "next/navigation";
export function NewCustomLinkForm() {
  const router = useRouter();
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
  const form = useForm<z.infer<typeof NewCustomLinkFormSchema>>({
    resolver: zodResolver(NewCustomLinkFormSchema),
    defaultValues: {
      name: "",
      originalLink: "",
      customLink: "",
    },
  });
  const { execute, result, status } = useAction(createSafeNewCustomLink, {
    onSuccess(data) {
      if (data.error) {
        notifyError(`${data.error}`);
        console.log(data.error);
      }
      if (data.success) {
        notify("Create custom Link Successfully");
        router.push("/dashboard");
        console.log(data.success);
      }
    },
    onExecute(data) {
      console.log("creating new custom link");
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
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof NewCustomLinkFormSchema>) {
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
          <FormField
            control={form.control}
            name="customLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custom Link</FormLabel>
                <FormControl>
                  <Input placeholder="Custom Link" {...field} />
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
