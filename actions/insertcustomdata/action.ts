'use server'

import connectDB from "@/lib/connectDb";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import LinkModel from "../../Models/LinkModel";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewLinkFormSchema } from "@/lib/NewLinkFormSchema";
import * as z from 'zod'
import { revalidatePath } from "next/cache";
import {createSafeActionClient} from "next-safe-action"
import { NewCustomLinkFormSchema } from "@/lib/NewCustomFormLinkSchema";

 const action = createSafeActionClient();

export  const  createSafeNewCustomLink = action(NewCustomLinkFormSchema,async({name,originalLink,customLink})=>{
  const { getUser, isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return {error: "Not authenticated! Please login!"}
  }
 
await connectDB();
  if(!name || !originalLink || !customLink){
    return {error: "Something went wrong!! No name or originalLink present"}
  }
  const duplicate = await LinkModel.findOne({customLink:customLink,isCustom:true});
  if(duplicate){
    return {error: "Custom Link with that already exists"}
  }
  await connectDB();  const user = await getUser();
 
  const NewLink = new LinkModel({
    name,
    originalLink,
    customLink, 
    user_id: user?.id,
    isCustom: true,
  })
  await NewLink.save()
 
  if(!NewLink){
  return {error: "Could not create new custom link"}
  }else{
  return {success: "New custom Link created"}
  }
})