import { z } from "zod";


export const LoginSchema = z.object({
    email:  z
        .string()
        .trim()
        .email("Email entered is invalid."),
    password: z
        .string()
        .trim()
        .min(6, "Password must have at least 6 characters.")
        .max(30, "Password is too long.")
        .refine(password => /^[\w!@#$%^&*\(\)=+{}\|\\\[\] '";:<>,.\?/~`-]+$/.test(password), "Password contains invalid characters.")
});

export type LoginSchema = z.infer<typeof LoginSchema>;
