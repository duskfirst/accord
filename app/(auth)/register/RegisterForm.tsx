"use client";

import { userSchema, UserSchema } from "./user-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from '@/utils/supabase/client';

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
import { Input } from "@/components/ui/input";

import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";


function onSubmit(values: UserSchema) {
    console.log(values);
}

const RegisterForm = () => {

    const registerForm = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

    const debounceUsername = useDebounceCallback(setUsernameValue, 500);
    const debounceEmail = useDebounceCallback(setEmailValue, 500);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof UserSchema,
    ) => {

        const { value } = event.target;

        if (fieldName == "username") {
            registerForm.setValue(fieldName, value, { shouldDirty: true, shouldValidate: false });
            debounceUsername(value);
        }
        if (fieldName == "email") {
            registerForm.setValue(fieldName, value, { shouldDirty: true, shouldValidate: false });
            debounceEmail(value);
        }
        if (fieldName == "password") {
            registerForm.setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
        }

    };

    const usernameState = registerForm.getFieldState("username", registerForm.formState);
    const emailState = registerForm.getFieldState("email", registerForm.formState);

    const supabase = createBrowserClient();

    const validateUsername = async () => {
        await registerForm.trigger("username");
        if (usernameState.invalid)
            return;
        const {
            data, error
        } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", usernameValue)
            .limit(1);
        if (error) {
            registerForm.setError("username", error, { shouldFocus: true });
        } else if (data.values.length) {
            registerForm.setError("username", { message: "Username is taken." }, { shouldFocus: true });
        }
    }

    const validateEmail = async () => {
        await registerForm.trigger("email");
        if (emailState.invalid)
            return;
        const {
            data, error
        } = await supabase
            .from("profiles")
            .select("email")
            .eq("email", emailValue)
            .limit(1);
        if (error) {
            registerForm.setError("email", error, { shouldFocus: true });
        } else if (data.values.length) {
            registerForm.setError("email", { message: "This email is already in use." }, { shouldFocus: true });
        }
    };

    useEffect(() => {
        if (emailValue)
            validateEmail();
        else
            registerForm.clearErrors("email");
    }, [emailValue]);
    useEffect(() => {
        if (usernameValue)
            validateUsername();
        else
            registerForm.clearErrors("username");
    }, [usernameValue]);

    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    {/* placeholder for icon */}
                                    <Input placeholder="email address" {...field} type="email" className="pl-8" onChange={event => handleChange(event, field.name)} />
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
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    {/* placeholder for icon */}
                                    <Input placeholder="username" {...field} className="pl-8" onChange={event => handleChange(event, field.name)} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Pick a unique username
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center">
                                    {/* placeholder for icon */}
                                    <Input placeholder="password" {...field} type="password" className="pl-8" onChange={event => handleChange(event, field.name)} />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Enter a secure password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
};

export default RegisterForm;