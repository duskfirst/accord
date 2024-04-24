"use client";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { OTPSchema } from "./OTPSchema";
import { validateOTP } from "./validateOTP";

import { Loader } from "lucide-react";


const OTPForm = ({ email, setIsValidEmail } : {
    email: string,
    setIsValidEmail: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

    const OTPform = useForm<OTPSchema>({
        resolver: zodResolver(OTPSchema),
        defaultValues: {
            pin: "",
        },
    });

    const {
        control,
        formState: { isSubmitting },
        handleSubmit,
        setError,
    } = OTPform;

    const validate = async (values: OTPSchema) => {
        const error = await validateOTP(values, email);
        if (error) {
            setError("pin", error, { shouldFocus: true });
        }
    };
    return (
        <Form {...OTPform}>
            <form onSubmit={handleSubmit(validate)} className="w-2/3 space-y-6">
                <FormField
                    control={control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="min-w-24" disabled={isSubmitting} type="submit">
                    {
                        isSubmitting
                            ? <Loader size={18} className='animate-spin'/>
                            : "Submit"
                    }
                </Button>
            </form>
        </Form>
    );
};

export default OTPForm;