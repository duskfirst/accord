"use client";

import { RegisterSchema } from "./RegisterSchema";
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
import { checkIfValueTaken } from "./check-if-taken";


const RegisterForm = ({
    setEmail
} : {
    setEmail: React.Dispatch<React.SetStateAction<string>>
}) => {
    
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

    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const errorFlag = useRef(false);

    const usernameState = getFieldState("username", formState);
    const emailState = getFieldState("email", formState);
    const passwordState = getFieldState("password", formState);

    const onSubmit = async (values: RegisterSchema) => {

        // emailState and usernameState are always valid by the time this function is run
        // email and username errors are cleared so we need to check again
        await validateField("email", values.email);
        await validateField("username", values.username);

        // email or username are taken so do not signup
        if (errorFlag.current) {
            errorFlag.current = false;
            return;
        }

        const error = await register(values);
        
        if (error) {
            setError("root", { message: error });
        } else {
            setEmail(values.email);
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

    const validateField = async (field: "username" | "email", value: string) => {
        await trigger(field);
        if (field == "email" && emailState.invalid || field == "username" && usernameState.invalid) {
            errorFlag.current = true;
            return;
        }
        const {
            exists, error
        } = await checkIfValueTaken(field, value);
        if (error) {
            setError(field, error);
            errorFlag.current = true;
        } else if (exists) {
            if (field === "username")
                setError(field, { message: "Username is already taken." });
            else
                setError(field, { message: "This email is already is in use." });
            errorFlag.current = true;
        }
    };

    useEffect(() => {
        if (emailValue)
            validateField("email", emailValue);
        else
            clearErrors("email");
    }, [emailValue]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (usernameValue)
            validateField("username", usernameValue);
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
                        Login
                    </Link>
                </div>
            </form>
        </Form>
    );
};

export default RegisterForm;