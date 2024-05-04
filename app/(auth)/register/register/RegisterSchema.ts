import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().trim().email("Email entered is invalid."),
    username: z
        .string()
        .trim()
        .min(3, "Username must have at least 3 characters.")
        .max(30, "Username is too long.")
<<<<<<< HEAD
        .refine(
            (username) => /[\w-]{3,30}/.test(username),
            "Username can only have a-z, A-Z, - or _"
        )
        .refine(
            (username) =>
                !["profile", "register", "settings", "login"].includes(username),
            "Sorry you cannot use this as your username."
        ),
=======
        .refine(username => /^[\w-]{3,30}$/.test(username), "Username can only have a-z, A-Z, - or _")
        .refine(username => !["profile", "register", "settings", "login"].includes(username), "Sorry you cannot use this as your username."),
>>>>>>> 0c5b8efc05cb74bb83c2659c2565ceae5bab2a27
    password: z
        .string()
        .trim()
        .min(6, "Password must have at least 6 characters")
        .max(30, "Password is too long")
        .refine(
            (password) =>
                /^[\w!@#$%^&*\(\)=+{}\|\\\[\] '";:<>,.\?/~`-]+$/.test(password),
            "Password contains invalid characters."
        ),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
