"use client";

import { RegisterSchema } from "./RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserClient } from "@/utils/supabase/client";

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

import { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";

import {
    Mail,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { register } from "./register";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";


const RegisterForm = () => {
    
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
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

    const [userEmail, setUserEmail] = useContext(AuthContext)!;

    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);
    const errorFlagRef = useRef(errorFlag);

    const supabase = createBrowserClient();

    const usernameState = getFieldState("username", formState);
    const emailState = getFieldState("email", formState);
    const passwordState = getFieldState("password", formState);

    const usernameStateRef = useRef(usernameState);
    const emailStateRef = useRef(emailState);

    const onSubmit = async (values: RegisterSchema) => {

        // emailState and usernameState are always valid by the time this function is run
        // email and username errors are cleared so we need to check again
        await validateEmail();
        await validateUsername();

        // email or username are taken so do not signup
        if (errorFlagRef.current) {
            errorFlagRef.current = false;
            return;
        }

        const error = await register(values);
        
        if (error) {
            setError("root", { message: error });
        } else {
            setUserEmail(emailValue);
        }
    };

    const debounceUsername = useDebounceCallback(setUsernameValue, 500);
    const debounceEmail = useDebounceCallback(setEmailValue, 500);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        fieldName: keyof RegisterSchema,
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
                                <IconInput {...field}
                                    pfx={<Mail size={18} className={cn(emailState.isDirty && (emailState.invalid ? "text-destructive" : "text-success"))} />}
                                    placeholder="email address" type="email" onChange={event => handleChange(event, field.name)}
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
                    control={control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <IconInput {...field}
                                    pfx={<User size={18} className={cn(usernameState.isDirty && (usernameState.invalid ? "text-destructive" : "text-success"))} />}
                                    placeholder="username" onChange={event => handleChange(event, field.name)}
                                />
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
                                <PasswordInput {...field} pfxClassname={cn(passwordState.isDirty && (passwordState.invalid ? "text-destructive" : "text-success"))} />
                            </FormControl>
                            <FormDescription>
                                Enter a secure password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormRootError />
                <div className="flex justify-between items-center">
                    <FormSubmitButton>
                        Register
                    </FormSubmitButton>
                    <Link href="/login" className="px-4 hover:text-slate-200 hover:underline">
                        login
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;