'use server'
import {createSafeActionClient} from "next-safe-action"
import { NewIDRedirect } from "@/lib/IdRedirect";
import connectDB from "@/lib/connectDb";
import LinkModel from "../../Models/LinkModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from 'zod'
const NoProps = z.object({});

 const action = createSafeActionClient();


export const GetAllLink = action(NoProps, async () => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return {error: "Not authenticated! Please login!"}
      }
    try {
        const user = await getUser();
   
        await connectDB();
        const links = await LinkModel.find({user_id:user?.id});
        if(!links){
            return {error: "No links found"}
        }else{
            return {success: "Found Links",links:JSON.parse(JSON.stringify(links))}
        }    
     
    } catch (error) {
        return {error:error}
    }
})