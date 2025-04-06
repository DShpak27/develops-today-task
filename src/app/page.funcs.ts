import * as z from "zod";

export type FormValues = z.infer<typeof formSchema>;

export const formSchema = z
    .object({
        query: z.string().optional(),
        cuisine: z.string().optional(),
        maxReadyTime: z.string().optional(),
    })
    .refine(data => data.query || data.cuisine || data.maxReadyTime, {
        message: "At least one field must be filled",
        path: ["_errors"],
    });

export const initialFormValues = {
    query: "",
    cuisine: "",
    maxReadyTime: "",
};
