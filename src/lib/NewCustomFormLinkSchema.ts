import * as z from 'zod'

export const NewCustomLinkFormSchema = z.object({
    name: z.string().min(2,{
        message: "Name must be 2 characters"
    }),
    originalLink: z.string().url(),
    customLink: z.string()
})