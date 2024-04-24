"use client";

import { UserSchema } from "./UserSchema";
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

import { useState,useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";


const RegisterForm = ({ emailValue, setEmailValue, setIsValidEmail } : {
    emailValue: string,
    setEmailValue: React.Dispatch<React.SetStateAction<string>>,
    setIsValidEmail: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    
    const form = useForm<UserSchema>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onSubmit",
    });
    const {
        clearErrors,
        control,
        formState,
        getFieldState,
        handleSubmit,
        setError,
        setValue,
        trigger,
    } = form;

    const [usernameValue, setUsernameValue] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const errorFlagRef = useRef(errorFlag);

    const supabase = createBrowserClient();

    const usernameState = getFieldState("username", formState);
    const emailState = getFieldState("email", formState);

    const usernameStateRef = useRef(usernameState);
    const emailStateRef = useRef(emailState);


    const onSubmit = async (values: UserSchema) => {

        // emailState and usernameState are always valid by the time this function is run
        // email and username errors are cleared so we need to check again
        await validateEmail();
        await validateUsername();

        // email or username are taken so do not signup
        if (errorFlagRef.current) {
            errorFlagRef.current = false;
            return;
        }

        console.log("submitted:", values);
        const {
            error
        } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    username: values.username,
                },
            },
        });
        if (error) {
            console.log(error);
            alert(`will handle this error later: ${error}`);
        } else {
            setIsValidEmail(true);
        }
    };

    const debounceUsername = useDebounceCallback(setUsernameValue, 500);
    const debounceEmail = useDebounceCallback(setEmailValue, 500);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof UserSchema,
    ) => {

        const { value } = event.target;

        if (fieldName == "username") {
            setValue(fieldName, value, { shouldDirty: true, shouldValidate: false });
            debounceUsername(value);
        }
        if (fieldName == "email") {
            setValue(fieldName, value, { shouldDirty: true, shouldValidate: false });
            debounceEmail(value);
        }
        if (fieldName == "password") {
            setValue(fieldName, value, { shouldDirty: true, shouldValidate: true });
        }

    };


    const validateUsername = async () => {
        await trigger("username");
        if (usernameStateRef.current.invalid) {
            setErrorFlag(errorFlagRef.current = true);
            return;
        }
        const {
            data, error
        } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", usernameValue)
            .limit(1);
        if (error) {
            setError("username", error);
            setErrorFlag(errorFlagRef.current = true);
        } else if (data.length) {
            setError("username", { message: "Username is taken." });
            setErrorFlag(errorFlagRef.current = true);
        }
    };

    const validateEmail = async () => {
        await trigger("email");
        if (emailStateRef.current.invalid) {
            setErrorFlag(errorFlagRef.current = true);
            return;
        }
        const {
            data, error
        } = await supabase
            .from("profiles")
            .select("email")
            .eq("email", emailValue)
            .limit(1);
        if (error) {
            setError("email", error);
            setErrorFlag(errorFlagRef.current = true);
        } else if (data.length) {
            setError("email", { message: "This email is already in use." });
            setErrorFlag(() => errorFlagRef.current = true);
        }
    };

    useEffect(() => {
        if (emailValue)
            validateEmail();
        else
            clearErrors("email");
    }, [emailValue]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (usernameValue)
            validateUsername();
        else
            clearErrors("username");
    }, [usernameValue]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                <FormField
                    control={control}
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
                    control={control}
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
                    control={control}
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
    );
};

export default RegisterForm;