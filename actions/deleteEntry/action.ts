'use server'
import {createSafeActionClient} from "next-safe-action"
import { NewIDRedirect } from "@/lib/IdRedirect";
import connectDB from "@/lib/connectDb";
import LinkModel from "../../Models/LinkModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from 'zod'
const NoProps = z.object({
    id: z.string(),
    isCustom: z.boolean()
});

 const action = createSafeActionClient();


export const DeleteLink = action(NoProps, async ({id,isCustom}) => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return {error: "Not authenticated! Please login!"}
      }
    try {
        const user = await getUser();
        await connectDB();
        if(isCustom){
            //customLink
            const customLink = await LinkModel.findByIdAndDelete({user_id:user?.id,customLink:id,isCustom})
            if(!customLink){
                return {error: "No custom link found"}
            }else{
               return {success: "Custom Link deleted"}
            }
        }else{
            const links = await LinkModel.findByIdAndDelete({user_id:user?.id,shortenedLink:id});
            if(!links){
                return {error: "No  link found"}
            }else{
               return {success: "Link deleted"}
            }

        }
      
      
     
    } catch (error) {
        return {error:error}
    }
})