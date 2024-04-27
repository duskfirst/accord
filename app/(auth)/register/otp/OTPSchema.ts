import { z } from "zod";

export const OTPSchema = z.object({
    pin: z
        .string()
        .min(6, {
            message: "OTP must be 6 characters.",
        }),
});

export type OTPSchema = z.infer<typeof OTPSchema>;