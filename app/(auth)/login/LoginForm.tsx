"use client";

import { LoginSchema } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormRootError,
    FormSubmitButton,
} from "@/components/ui/form";
import { IconInput, PasswordInput } from "@/components/ui/input";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { login } from "./login";

import Link from "next/link";


const LoginForm = () => {

    const form = useForm<LoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const {
        formState,
        getFieldState,
        handleSubmit,
        setError,
        clearErrors,
    } = form;

    const emailState = getFieldState("email");
    const passwordState = getFieldState("password");

    const onSubmit = async (values: LoginSchema) => {
        let error = await login(values);
        if (error) {
            if (error === "Email not confirmed") {
                setError("root", { message: "Email not confirmed. Register again." });
            } else {
                setError("root", { message: error });
            }
        }
    };
    
    const { isValidating } = formState;
    // remove the root error when the user starts typing
    useEffect(() => {
        clearErrors("root");
    }, [isValidating]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <IconInput {...field}
                                    pfx={<Mail size={18} className={cn(emailState.invalid && "text-destructive")} />}
                                    type="email" placeholder="email address" {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter your email address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} pfxClassname={cn(passwordState.invalid && "text-destructive" )} />
                            </FormControl>
                            <FormDescription>
                                Enter your password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormRootError />
                <div className="flex justify-between items-center">
                    <FormSubmitButton>
                        Login
                    </FormSubmitButton>
                    <Link href="/register" className="px-4 hover:text-slate-200 hover:underline">
                        Register
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;