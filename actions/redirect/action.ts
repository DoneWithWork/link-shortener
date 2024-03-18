'use server'
import {createSafeActionClient} from "next-safe-action"
import { NewIDRedirect } from "@/lib/IdRedirect";
import connectDB from "@/lib/connectDb";
import LinkModel from "../../Models/LinkModel";


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
                link.clicks = link.clicks + 1;
                await link.save();
                return {success: "Found Link",originalLink:link.originalLink}
            }
        }else{
            customLink.clicks = customLink.clicks + 1;
            await customLink.save();
            return {success: "Found Link",originalLink:customLink.originalLink}
        }
     
    } catch (error) {
        return {error:error}
    }
})