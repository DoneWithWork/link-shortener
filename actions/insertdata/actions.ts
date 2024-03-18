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

 const action = createSafeActionClient();

export  const  createSafeNewLink = action(NewLinkFormSchema,async({name,originalLink})=>{
  const { getUser, isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return {error: "Not authenticated! Please login!"}
  }
 
  if(!name || !originalLink){
    return {error: "Something went wrong!! No name or originalLink present"}
  }
  await connectDB();
  const duplicate = await LinkModel.findOne({name:name});
  if(duplicate){
    return {error: "Shortned Link with that name already exists"}
  }
  const user = await getUser();
 
  const NewLink = new LinkModel({
    name,
    originalLink,
    user_id: user?.id,
  })
  await NewLink.save()
  revalidatePath("/","layout")
  if(!NewLink){
  return {error: "Could not create new link"}
  }else{
  return {success: "New Link created"}
  }
})