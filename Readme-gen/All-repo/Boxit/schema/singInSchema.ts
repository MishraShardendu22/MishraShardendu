import { z } from "zod";

const signInSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email format"),
    password: z.string().min(1,"Password is required").min(8,"Password must be at least 8 characters long"),
})

export {
    signInSchema
}