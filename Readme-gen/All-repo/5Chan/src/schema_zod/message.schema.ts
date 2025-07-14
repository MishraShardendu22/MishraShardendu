import { z } from "zod";

export const messageSchema = z.object(
    {
        content: z.string()
            .min(1, "Message Must be at least 1 characters")
            .max(255, "Message Must be at most 255 characters")
    }
)