"use client";

import { LoginSchema } from "./LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    LoaderCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { login } from "./login";


const LoginForm = () => {

    const form = useForm<LoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onSubmit",
    });
    const {
        formState,
        getFieldState,
        handleSubmit,
        setError,
    } = form;

    const emailState = getFieldState("email");
    const passwordState = getFieldState("password");

    const { isSubmitting } = formState;

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(show => !show);
    };

    const onSubmit = async (values: LoginSchema) => {

        const error = await login(values);
        if (error) {
            setError("root", { message: error });
        }    

    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    <Mail size={18} className={
                                        cn("absolute left-2", emailState.isDirty && emailState.invalid && "text-destructive")
                                    } />
                                    <Input placeholder="email address" {...field} type="email" className="px-8" />
                                </div>
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
                                <div className="relative flex items-center">
                                    <Lock size={18} className={
                                        cn("absolute left-2", passwordState.isDirty && passwordState.invalid && "text-destructive")
                                    } />
                                    <Input placeholder="password" {...field} type={showPassword ? "text" : "password"} className="px-8 min-w-72" />
                                    {/* changing this to button instead of span will trigger form submission on click */}
                                    <span className="absolute right-2 cursor-pointer select-none" onClick={toggleShowPassword}>
                                        {
                                            showPassword
                                                ? <EyeOff size={18} />
                                                : <Eye size={18} />
                                        }
                                    </span>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Enter a secure password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormRootError/>
                <Button className="min-w-24" disabled={isSubmitting} type="submit">
                    {
                        isSubmitting
                            ? <LoaderCircle size={18} className='animate-spin' />
                            : "Submit"
                    }
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;