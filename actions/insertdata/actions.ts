'use server'

import connectDB from "@/lib/connectDb";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import LinkModel from "../../Models/LinkModel";
import Link from "next/link";
export async function InsertData(formdata: FormData){
  await connectDB();
    const { getUser, isAuthenticated } = getKindeServerSession();
    const name= formdata.get('name')
    const email= formdata.get('email')
  console.log(formdata)
    if (!(await isAuthenticated())) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectDB()
    
 
    const link = new LinkModel({
        name:name,
      
    })
    await link.save()
    const user = await getUser();
    const data = { message: "Hello User", id: user?.given_name };
    console.log(link)
}