'use server'
import {createSafeActionClient} from "next-safe-action"
import { NewIDRedirect } from "@/lib/IdRedirect";
import connectDB from "@/lib/connectDb";
import LinkModel from "../../Models/LinkModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from 'zod'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const NoProps = z.object({
    id: z.string(),

});

 const action = createSafeActionClient();


export const DeleteLink = action(NoProps, async ({id}) => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return {error: "Not authenticated! Please login!"}
      }
    try {
        const user = await getUser();
        await connectDB();
   
            const customLink = await LinkModel.findByIdAndDelete({_id:id,user_id:user?.id})
            revalidatePath("/","layout")
            if(!customLink){
                return {error: "No  link found"}
            }else{
              
               return {success: "Link deleted"}
            }
      
      
      
     
    } catch (error) {
        return {error:error}
    }
})