'use server'
import { revalidatePath } from "next/cache";
import {createSafeActionClient} from "next-safe-action"
import { NewIDRedirect } from "@/lib/IdRedirect";
import connectDB from "@/lib/connectDb";
import LinkModel from "../../Models/LinkModel";
import { redirect } from "next/dist/server/api-utils";

 const action = createSafeActionClient();


export const RedirectToLink = action(NewIDRedirect, async ({ id }) => {
    try {
        if(!id){
            return {error: "Something went wrong!! No id present"}
        }
        await connectDB();
        const customLink = await LinkModel.findOne({customLink:id})
        if(!customLink){
            const link = await LinkModel.findOne({shortenedLink:id})
            if(!link){
                return {error: "No such link found"}
            }else{
                return {success: "Found Link",originalLink:link.originalLink}
            }
        }else{
            return {success: "Found Link",originalLink:customLink.originalLink}
        }
     
    } catch (error) {
        return {error:error}
    }
})